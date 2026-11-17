#!/usr/bin/env node
// 통학버스 정류장 주변 매물 찾기 (GitHub Actions에서 update-listings.mjs 다음에 실행)
// 1. js/data/routes.js의 모든 정류장(BUSR) 좌표를 읽는다.
// 2. Jendela360 지역 페이지·단지 페이지에서 단지 목록을 모으고, 단지 페이지에 들어 있는 좌표로 정류장까지 거리를 잰다.
// 3. RADIUS_KM 안 단지의 임대 매물(가격·방·면적·사진)을 data/nearby.json으로 쓴다.
//    단지 좌표는 저장해 두고 다음 실행 때 다시 받지 않는다(COORD_DAYS마다 갱신).
// 4. 자동 수집이 막힌 사이트(Rumah123·99.co 등)는 scripts/nearby-manual.json에 손으로 넣은 매물을 합친다.
// 사용: node scripts/update-nearby.mjs   (환경 변수 PREV_URL, RADIUS_KM, MAX_PAGES, DELAY_MS, FETCH=curl)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data/nearby.json');
const MANUAL = path.join(ROOT, 'scripts/nearby-manual.json');
const RADIUS = +(process.env.RADIUS_KM || 1.2);
const MAX_PAGES = +(process.env.MAX_PAGES || 450);
const DELAY = +(process.env.DELAY_MS || 600);
const COORD_DAYS = 30;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const NOW = new Date().toISOString();
const J = 'https://jendela360.com';
const AREAS = ['jakarta-selatan', 'jakarta-pusat', 'jakarta-barat', 'jakarta-timur', 'jakarta-utara', 'tangerang', 'tangerang-selatan', 'bekasi'];
const NOT_COMPLEX = new Set([...AREAS, 'jakarta', 'bulanan', 'tahunan', 'murah', 'harian', 'mingguan']);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const hav = (a, b, c, d) => { const R = 6371, x = (c - a) * Math.PI / 180, y = (d - b) * Math.PI / 180, s = Math.sin(x / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(y / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(s)); };

function loadData() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data/routes.js'), 'utf8') + '\n;this.BUSR=BUSR;', ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data/places.js'), 'utf8') + '\n;this.R=R;', ctx);
  const stops = [];
  ctx.BUSR.forEach(b => b.st.forEach(s => { if (s.lat != null) stops.push({ n: s.n, t: s.t, p: s.p, lat: s.lat, lng: s.lng, rt: b.id, rn: b.n, rid: s.id || null }); }));
  return { stops, R: ctx.R };
}
async function loadPrev() {
  // 배포본(PREV_URL)과 저장소 파일을 합친다. 한쪽이 수집 실패로 비어 있어도 좌표·매물을 잃지 않게 한다.
  const list = [];
  const u = process.env.PREV_URL;
  if (u) { try { const r = await fetch(u + '?t=' + Date.now()); if (r.ok) { const j = await r.json(); if (j && j.v === 1) list.push(j); } } catch (e) {} }
  try { const j = JSON.parse(fs.readFileSync(OUT, 'utf8')); if (j && j.v === 1) list.push(j); } catch (e) {}
  const out = { v: 1, complexes: {}, pinhome: {}, near: [] };
  list.forEach(j => {
    Object.entries(j.complexes || {}).forEach(([k, c]) => { const o = out.complexes[k]; if (!o || (!o.lat && c.lat) || (c.lat && Date.parse(c.at || 0) > Date.parse(o.at || 0))) out.complexes[k] = c; });
    Object.entries(j.pinhome || {}).forEach(([k, c]) => { if (!out.pinhome[k] || (c.slug && !out.pinhome[k].slug)) out.pinhome[k] = c; });
    if ((j.near || []).length > out.near.length) out.near = j.near;
  });
  return out;
}

async function get(url) {
  if (process.env.FETCH === 'none') return { status: 0, html: '' };
  if (process.env.FETCH === 'curl') {
    try { return { status: 200, html: execFileSync('curl', ['-sSL', '-m', '90', '-A', UA, '-H', 'Accept-Language: id-ID,id;q=0.9', '--fail', url], { maxBuffer: 3e7 }).toString() }; }
    catch (e) { return { status: 0, html: '' }; }
  }
  for (let t = 0; t < 2; t++) {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 30000);
    try {
      const r = await fetch(url, { redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8' } });
      const html = r.ok ? await r.text() : '';
      clearTimeout(to);
      if (!t && [429, 502, 503, 504].includes(r.status)) { await sleep(4000); continue; }
      return { status: r.status, html };
    } catch (e) { clearTimeout(to); if (t) return { status: 0, html: '' }; await sleep(2000); }
  }
}
const nextData = html => { const m = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html); if (!m) return null; try { return JSON.parse(m[1]); } catch (e) { return null; } };
function slugsIn(html) {
  const s = new Set();
  for (const m of html.matchAll(/jendela360\.com\/(?:en\/)?sewa-apartemen-([a-z0-9-]+)(?=["'?#])/g)) if (!NOT_COMPLEX.has(m[1])) s.add(m[1]);
  for (const m of html.matchAll(/"apartment_slug":"([a-z0-9-]+)"/g)) s.add(m[1]);
  return s;
}
function units(pp, slug) {
  const a = pp.server_side_initial_units || pp.initial_units || [];
  return a.filter(u => u && u.code && !u.is_sell && (u.is_available || u.is_available_soon)).map(u => ({
    code: u.code, url: J + '/sewa-apartemen-' + slug + '/' + u.code,
    price: u.price > 0 && !u.is_dollar ? Math.round(u.price / 1e4) / 100 : null, usd: u.is_dollar ? u.price : null,
    beds: u.bedroom === 0 ? 'S' : u.bedroom >= 3 ? '3' : u.bedroom ? String(u.bedroom) : null, bath: u.bathroom || null, area: u.unit_area || null,
    tower: u.tower || null, soon: !u.is_available && !!u.is_available_soon,
    img: (u.photos || []).find(p => p.is_primary)?.url || (u.photos || [])[0]?.url || null, title: (u.name || '').slice(0, 90)
  })).sort((x, y) => (x.price ?? 999) - (y.price ?? 999));
}

// Pinhome: 단지 디렉터리 페이지(JSON-LD ItemList)에 임대 매물 전체가 들어 있다. 단지 이름으로 주소를 추정해 찾는다.
const PH = 'https://www.pinhome.id/sewa/apartemen/direktori/';
const sl = t => t.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// 이름으로 못 찾는 단지의 실제 Pinhome 주소
const PH_ALIAS = { 'Bumi Mas Apartment': 'apartemen-bumimas', 'Pakubuwono Residence': 'apartemen-pakubuwono-residence', 'U Residence Karawaci': 'apartemen-u-residence', 'The Mansion at Kemang': 'apartemen-the-mansion-at-kemang' };
function phSlugs(n) {
  if (PH_ALIAS[n]) return [PH_ALIAS[n]];
  const base = n.replace(/\b(apartment|apartemen|apartments|condominium|condovilla)\b/gi, ' ').replace(/\s+/g, ' ').trim();
  const v = [base, n, base.replace(/\b(residence|residences|tower)\b/gi, '').trim(), 'the ' + base, base + ' residence'].filter(Boolean).map(sl);
  return [...new Set(v.map(x => 'apartemen-' + x).concat(v.slice(0, 2)))].slice(0, 6);
}
function phParse(html) {
  const out = []; let total = null;
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { continue; }
    if (j['@type'] !== 'ItemList') continue;
    total = j.numberOfItems;
    (j.itemListElement || []).forEach(e => {
      const it = e.item || {}, of = it.offers || {}, ps = of.priceSpecification || {};
      const yr = /P1Y|Year/i.test(ps.billingDuration || ps.unitText || '');
      const p = +(ps.price || of.price || 0);
      const b = +((it.numberOfBedrooms || {}).value || 0);
      out.push({ code: 'Pinhome', src: 'Pinhome', url: (it.url || '').replace('pinhome.id//', 'pinhome.id/'), title: (it.name || '').slice(0, 100),
        price: p > 0 ? Math.round((yr ? p / 12 : p) / 1e4) / 100 : null, yearly: yr || undefined,
        beds: b ? (b >= 3 ? '3' : String(b)) : (/studio/i.test(it.name || '') ? 'S' : null), bath: +it.numberOfBathroomsTotal || null,
        area: +((it.floorSize || {}).value || 0) || null, img: it.image || null });
    });
  }
  // 월 150만 루피아 미만은 일·주 단위 가격이나 하숙방(kos)이라 뺀다
  return { items: out.filter(x => x.url && (x.price == null || x.price >= 1.5)), total };
}
async function pinhome(n, cache) {
  const hit = cache[n];
  const tries = hit && hit.slug ? [hit.slug] : hit && hit.miss && Date.now() - Date.parse(hit.at) < COORD_DAYS * 864e5 ? [] : phSlugs(n);
  for (const slug of tries) {
    const r = await get(PH + slug + '/properti'); await sleep(DELAY);
    if (r.status === 404) continue;
    if (!r.html || r.status >= 400) return { fail: true };
    if (!/ItemList/.test(r.html)) continue;
    let { items, total } = phParse(r.html);
    const all = +((/dari\s+(\d+)\s+properti/.exec(r.html) || [])[1] || 0);
    for (let pg = 2, last = items.length; last >= 40 && pg <= 5 && (!all || items.length < all); pg++) { const r2 = await get(PH + slug + '/properti?page=' + pg); await sleep(DELAY); const x = phParse(r2.html || ''); last = x.items.length; if (!last) break; items = items.concat(x.items); }
    total = all || items.length;
    cache[n] = { slug, at: NOW };
    return { slug, items, total };
  }
  cache[n] = { miss: true, at: NOW };
  return null;
}

async function main() {
  const { stops, R } = loadData();
  const prev = await loadPrev();
  const C = prev.complexes || {};
  const known = new Set();      // 앱 조사 단지(js/data/places.js)에 이미 있는 Jendela360 단지
  R.forEach(r => [...r.ls.map(l => l[3]), ...r.src.map(s => s[1])].forEach(u => { const m = /sewa-apartemen-([a-z0-9-]+)/.exec(u || ''); if (m) known.add(m[1] + '|' + r.id); }));
  const knownSlug = {}; known.forEach(k => { const [s, id] = k.split('|'); knownSlug[s] = id; });
  const queue = new Set(Object.keys(C));
  let pages = 0, fails = 0;
  const prevNear = Object.fromEntries((prev.near || []).map(c => [c.slug, c]));
  // 지역 페이지에서 단지 목록 모으기
  for (const a of AREAS) {
    const r = await get(J + '/apartemen/' + a); pages++; await sleep(DELAY);
    slugsIn(r.html || '').forEach(s => queue.add(s));
  }
  console.log('지역 페이지에서 단지', queue.size);
  const nearest = (lat, lng) => { let b = null; for (const s of stops) { const d = hav(lat, lng, s.lat, s.lng); if (!b || d < b.d) b = { d, s }; } return b; };
  const near = [];
  const fresh = c => c && c.lat && Date.now() - Date.parse(c.at || 0) < COORD_DAYS * 864e5;
  const done = new Set();
  const visit = async slug => {
    const r = await get(J + '/sewa-apartemen-' + slug); pages++; await sleep(DELAY);
    if (!r.html || r.status >= 400) { fails++; if (fails <= 5) console.log('실패', r.status, slug); return null; }          // 접속 실패: 이전 기록 유지
    const d = nextData(r.html); const pp = d && d.props && d.props.pageProps;
    if (!pp) { fails++; return null; }
    if (pp.latitude == null) { C[slug] = { miss: true, at: NOW }; return null; }
    (pp.directory_links && pp.directory_links.apartments || []).forEach(x => x.slug && queue.add(x.slug));
    C[slug] = { n: pp.name, lat: +pp.latitude, lng: +pp.longitude, d: pp.breadcrumb && pp.breadcrumb.district ? pp.breadcrumb.district.name : '', a: (pp.breadcrumb && pp.breadcrumb.area ? pp.breadcrumb.area.name : ''), at: NOW };
    return pp;
  };
  // 좌표 모르는 단지 → 방문, 아는 단지는 정류장 반경 안일 때만 다시 방문(매물 갱신)
  let progress = true;
  while (progress && pages < MAX_PAGES) {
    progress = false;
    for (const slug of [...queue]) {
      if (done.has(slug) || pages >= MAX_PAGES) continue;
      const c = C[slug];
      if (c && c.miss && Date.now() - Date.parse(c.at) < COORD_DAYS * 864e5) { done.add(slug); continue; }
      let pp = null;
      if (!fresh(c)) { pp = await visit(slug); progress = true; }
      done.add(slug);
      const cc = C[slug];
      if (!cc || !cc.lat) continue;
      const b = nearest(cc.lat, cc.lng);
      if (b.d > RADIUS) continue;
      if (!pp) { pp = await visit(slug); progress = true; }
      if (!pp) { const o = prevNear[slug]; if (o) { near.push(Object.assign({}, o, { stale: true, units: (o.units || []).filter(u => u.src !== 'Pinhome') })); console.log('이전 결과 유지', slug); } continue; }
      const us = units(pp, slug);
      near.push({ slug, n: cc.n, lat: cc.lat, lng: cc.lng, dist: cc.d, area: cc.a, url: J + '/sewa-apartemen-' + slug, src: 'Jendela360',
        stop: { n: b.s.n, t: b.s.t, rt: b.s.rt, rn: b.s.rn, km: Math.round(b.d * 100) / 100 },
        app: knownSlug[slug] || null, total: pp.total_unit || us.length, low: pp.lowestPrice ? Math.round(pp.lowestPrice / 1e4) / 100 : null, units: us });
      console.log('정류장 근처', slug, b.s.n, b.d.toFixed(2) + 'km', '매물', us.length);
    }
  }
  // Pinhome 매물 합치기 (정류장 반경 안 단지)
  const PC = prev.pinhome || {};
  let phN = 0;
  for (const c of near) {
    let r = await pinhome(c.n, PC);
    if (r && r.fail) { const o = prevNear[c.slug]; r = o ? { slug: (o.ph || '').replace(PH, '').replace('/properti', ''), items: (o.units || []).filter(u => u.src === 'Pinhome') } : null; if (r && !r.items.length) r = null; }
    if (!r) continue;
    const seen = new Set(c.units.map(u => u.url));
    r.items.forEach(u => { if (!seen.has(u.url) && !/TERSEWA/i.test(u.title)) { c.units.push(u); phN++; } });
    c.ph = PH + r.slug + '/properti';
    c.units.sort((x, y) => (x.price ?? 999) - (y.price ?? 999));
    console.log('Pinhome', c.n, r.items.length);
  }
  let manual = [];
  try { manual = JSON.parse(fs.readFileSync(MANUAL, 'utf8')).items || []; } catch (e) {}
  manual.forEach(m => { if (m.lat == null && m.slug && C[m.slug] && C[m.slug].lat) { m.lat = C[m.slug].lat; m.lng = C[m.slug].lng; }
    if (m.lat != null) { const b = nearest(m.lat, m.lng); m.stop = { n: b.s.n, t: b.s.t, rt: b.s.rt, rn: b.s.rn, km: Math.round(b.d * 100) / 100 }; } });
  near.sort((a, b) => a.stop.rt.localeCompare(b.stop.rt) || a.stop.km - b.stop.km);
  if (near.length < (prev.near || []).length * 0.5) {
    console.log('수집 결과가 이전의 절반 미만(접속 실패 ' + fails + '건) → 이전 결과를 유지');
    prev.near.forEach(o => { if (!near.some(c => c.slug === o.slug)) near.push(Object.assign({}, o, { stale: true })); });
  }
  const out = { v: 1, updated: NOW, fails, radius: RADIUS, pages, complexes: C, pinhome: PC, near, manual };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  console.log('완료: 방문', pages, '실패', fails, '좌표 아는 단지', Object.values(C).filter(c => c.lat).length, '정류장 근처 단지', near.length, '매물', near.reduce((a, x) => a + x.units.length, 0), 'Pinhome', phN, '수동', manual.length);
}
main().catch(e => { console.error(e); process.exit(1); });
