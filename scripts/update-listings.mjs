#!/usr/bin/env node
// 매물 자동 확인 (GitHub Actions에서 6시간마다 실행)
// 1. js/data/places.js의 매물 URL을 열어 게시 여부(live/gone)와 현재 월세를 확인한다.
// 2. Jendela360 단지 페이지에서 목록에 없던 매물 코드를 찾아 가격·방 구성·면적·사진을 읽는다.
// 3. 결과를 data/listings.json으로 쓴다. 이전 결과(PREV_URL 또는 기존 파일)와 합쳐
//    사이트 차단·시간 초과 때는 이전 상태를 유지하고, 새 매물의 첫 발견 시각을 보존한다.
// 사용: node scripts/update-listings.mjs   (환경 변수 PREV_URL, MAX_NEW, DELAY_MS, TIMEOUT_MS)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data/listings.json');
const MAX_NEW = +(process.env.MAX_NEW || 12);
const DELAY = +(process.env.DELAY_MS || 700);
const TIMEOUT = +(process.env.TIMEOUT_MS || 20000);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const NOW = new Date().toISOString();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- 데이터 읽기 ----------
function loadComplexes() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data/places.js'), 'utf8') + '\n;this.R=R;', ctx);
  return ctx.R;
}
async function loadPrev() {
  const url = process.env.PREV_URL;
  if (url) {
    try {
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (res.ok) { const j = await res.json(); if (j && j.v === 1) { console.log('이전 결과:', url); return j; } }
    } catch (e) { console.log('이전 결과 못 읽음:', String(e.message || e)); }
  }
  try { const j = JSON.parse(fs.readFileSync(OUT, 'utf8')); if (j && j.v === 1) return j; } catch (e) {}
  return { v: 1, checks: {}, found: {} };
}

// ---------- 사이트 판별 ----------
const SITE = [['jendela360.com', 'Jendela360'], ['travelio.com', 'Travelio'], ['rumah123.com', 'Rumah123'], ['99.co', '99.co'], ['mamikos.com', 'Mamikos']];
const siteOf = u => { try { const h = new URL(u).hostname; const s = SITE.find(x => h.endsWith(x[0])); return s ? s[1] : h; } catch (e) { return '?'; } };
const lastSeg = u => { try { return new URL(u).pathname.split('/').filter(Boolean).pop() || ''; } catch (e) { return ''; } };
// 개별 매물 페이지인가: 경로 끝이 매물 코드이거나 Travelio 개별 property 페이지
const isUnit = (code, u) => lastSeg(u).toUpperCase() === String(code).toUpperCase() || /travelio\.com\/(en\/)?property\//.test(u);
const CODE_RE = /^[A-Z]{4}\d{3}$/;

// ---------- 내려받기 ----------
async function get(url) {
  for (let t = 0; t < 2; t++) {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), TIMEOUT);
    try {
      const res = await fetch(url, { redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml', 'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8' } });
      const html = res.ok ? (await res.text()).slice(0, 4e6) : '';
      clearTimeout(to);
      if (!t && [502, 503, 504].includes(res.status)) { await sleep(3000); continue; }
      return { status: res.status, url: res.url || url, html };
    } catch (e) {
      clearTimeout(to);
      if (t) return { status: 0, url, html: '', err: e.name === 'AbortError' ? 'timeout' : String(e.message || e) };
      await sleep(1500);
    }
  }
}

// ---------- 추출 규칙 (사이트 구조가 바뀌면 여기를 고친다) ----------
const text = html => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const meta = (html, p) => { const m = new RegExp('<meta[^>]+(?:property|name)=["\']' + p + '["\'][^>]+content=["\']([^"\']*)', 'i').exec(html) || new RegExp('<meta[^>]+content=["\']([^"\']*)["\'][^>]+(?:property|name)=["\']' + p + '["\']', 'i').exec(html); return m ? m[1].trim() : ''; };
const titleOf = html => meta(html, 'og:title') || ((/<title[^>]*>([^<]*)/i.exec(html) || [])[1] || '').trim();
// 월세(백만 루피아 단위). "Rp 14.120.000 / bulan", "IDR 14,120,000/month", "Rp 14,12 Juta /bln"
function extractPrice(html) {
  const t = text(html);
  const re = /(?:Rp\.?|IDR)\s*([\d][\d.,]*)\s*(juta|jt|million)?\s*(?:\/|per|\s)\s*(bulan|bln|month|mo)\b/gi;
  let m;
  while ((m = re.exec(t))) {
    let v;
    if (m[2]) v = parseFloat(m[1].replace(/\.(?=\d{3}\b)/g, '').replace(',', '.'));
    else v = parseInt(m[1].replace(/[.,]/g, ''), 10) / 1e6;
    if (v >= 1 && v <= 300) return Math.round(v * 100) / 100;
  }
  for (const s of html.match(/<script[^>]+ld\+json[^>]*>[\s\S]*?<\/script>/gi) || []) {
    const p = /"price"\s*:\s*"?(\d{6,})/.exec(s);
    if (p && /month|bulan|P1M/i.test(s)) { const v = +p[1] / 1e6; if (v >= 1 && v <= 300) return Math.round(v * 100) / 100; }
  }
  return null;
}
function extractBeds(s) { if (/studio/i.test(s)) return 'S'; const m = /(\d)\s*(?:\+\s*\d\s*)?(?:BR\b|bed ?rooms?|kamar)/i.exec(s); return m ? (+m[1] >= 3 ? '3' : m[1]) : null; }
function extractArea(s) { const m = /(\d{2,3}(?:[.,]\d{1,2})?)\s*(?:m²|m\s?2\b|sqm|㎡)/i.exec(s); return m ? +m[1].replace(',', '.') : null; }
const GONE_RE = /(unit|apartemen|properti|property)[^.<]{0,40}(sudah (?:ter)?sewa|tidak tersedia|no longer available|not available)|halaman tidak ditemukan|page not found/i;
const BLOCK_RE = /cf-chl|just a moment\.\.\.|attention required|captcha/i;

function judge(r, code, unit) {
  if (r.status === 0) return { state: 'error', err: r.err };
  if ([401, 403, 429, 503].includes(r.status)) return { state: 'blocked', status: r.status };
  if ([404, 410].includes(r.status)) return { state: 'gone', status: r.status };
  if (r.status >= 400) return { state: 'error', status: r.status };
  if (BLOCK_RE.test(r.html.slice(0, 20000)) && r.html.length < 60000) return { state: 'blocked', status: r.status };
  if (unit && code && CODE_RE.test(code) && !r.url.toUpperCase().includes(code)) return { state: 'gone', status: r.status, note: 'redirect' };
  if (unit && GONE_RE.test(text(r.html).slice(0, 40000))) return { state: 'gone', status: r.status, note: 'text' };
  const o = { state: 'live', status: r.status };
  if (unit) { const p = extractPrice(r.html); if (p != null) o.price = p; }
  return o;
}

// Jendela360 단지 페이지에서 같은 단지 매물 코드 찾기
function jendelaCodes(html, slug) {
  const out = new Map();
  const re = /href=["']([^"']*\/(sewa-apartemen-[a-z0-9-]+)\/([A-Z]{4}\d{3}))(?=["'?#\/])/g;
  let m;
  while ((m = re.exec(html))) if (m[2] === slug && !out.has(m[3])) out.set(m[3], m[1].startsWith('http') ? m[1] : 'https://jendela360.com' + (m[1].startsWith('/') ? '' : '/') + m[1]);
  return out;
}
const jSlug = u => { try { const s = new URL(u).pathname.split('/').filter(Boolean).filter(x => x !== 'en'); return s.find(x => x.startsWith('sewa-apartemen-')) || null; } catch (e) { return null; } };

// ---------- 실행 ----------
async function main() {
  const R = loadComplexes();
  const prev = await loadPrev();
  const checks = {}, found = {}, sites = {};
  const cnt = (s, k) => { (sites[s] || (sites[s] = { live: 0, gone: 0, blocked: 0, error: 0, found: 0 }))[k]++; };
  const keepPrev = (url, o) => { const p = prev.checks && prev.checks[url]; return (o.state === 'blocked' || o.state === 'error') && p && (p.state === 'live' || p.state === 'gone') ? Object.assign({}, p, { stale: true, lastTry: NOW, lastErr: o.err || o.status }) : o; };
  const visited = new Map();
  async function check(url, code, unit) {
    if (visited.has(url)) return visited.get(url);
    const r = await get(url); await sleep(DELAY);
    const o = Object.assign(judge(r, code, unit), { unit: !!unit, site: siteOf(url), at: NOW });
    const v = { o: keepPrev(url, o), r };
    visited.set(url, v);
    return v;
  }

  // 1. 등록된 매물 확인
  for (const c of R) {
    for (const l of c.ls) {
      const [code, , , url] = l;
      if (!url || checks[url]) continue;
      const { o } = await check(url, code, isUnit(code, url));
      checks[url] = o; cnt(o.site, o.state);
      console.log(c.id, code, o.state, o.price || '', url);
    }
  }

  // 2. Jendela360 새 매물 찾기
  for (const c of R) {
    const known = new Set(c.ls.map(l => l[0]));
    const urls = [...c.ls.map(l => l[3]), ...c.src.map(s => s[1])].filter(u => siteOf(u) === 'Jendela360');
    const slug = urls.map(jSlug).find(Boolean);
    if (!slug) continue;
    const page = 'https://jendela360.com/' + slug;
    const { o, r } = await check(page, null, false);
    const codes = o.state === 'live' && r.html ? jendelaCodes(r.html, slug) : new Map();
    const prevF = (prev.found && prev.found[c.id]) || [];
    prevF.forEach(x => { if (x.code && !codes.has(x.code)) codes.set(x.code, x.url); });
    const list = [];
    let n = 0;
    for (const [code, url] of codes) {
      if (known.has(code)) continue;
      if (n++ >= MAX_NEW) break;
      const { o: uo, r: ur } = await check(url, code, true);
      checks[url] = uo; cnt('Jendela360', uo.state);
      const old = prevF.find(x => x.code === code);
      if (uo.state === 'gone') continue;
      if (uo.state !== 'live') { if (old) list.push(old); continue; }
      const t = titleOf(ur.html), all = text(ur.html), di = all.indexOf('Detail Unit'), body = di >= 0 ? all.slice(di, di + 600) : all.slice(0, 20000);
      list.push({ code, url, price: uo.price ?? (old && old.price) ?? null, beds: extractBeds(t) || extractBeds(body) || (old && old.beds) || null, area: extractArea(t) || extractArea(body) || (old && old.area) || null, img: meta(ur.html, 'og:image') || (old && old.img) || null, title: t.slice(0, 90), src: 'Jendela360', first: (old && old.first) || NOW, last: NOW });
      sites.Jendela360.found++;
      console.log('  새 매물', c.id, code, uo.price || '');
    }
    if (list.length) found[c.id] = list;
  }

  const out = { v: 1, updated: NOW, sites, checks, found };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  const s = Object.values(sites).reduce((a, x) => { Object.keys(x).forEach(k => a[k] = (a[k] || 0) + x[k]); return a; }, {});
  console.log('완료', JSON.stringify(s));
}
main().catch(e => { console.error(e); process.exit(1); });
