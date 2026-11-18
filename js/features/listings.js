// 매물 실시간 연동
// GitHub Actions(scripts/update-listings.mjs)가 6시간마다 매물 페이지를 확인해 data/listings.json을 만든다.
// 앱은 이 파일을 캐시 없이 읽어 내려간 매물, 바뀐 가격, 새로 올라온 매물을 반영한다.
const LV_URL='data/listings.json',LV_ACT='https://github.com/seoulartai1-cell/where/actions/workflows/pages.yml';
let LIVE=null,LVERR='',LVAT=0;
const lty=t=>{t=String(t||'');if(/스튜디오|studio/i.test(t))return 'S';const m=/(\d)\s*(?:BR|bed|kamar)/i.exec(t);return m?(+m[1]>=3?'3':m[1]):null};
const tyL={S:'스튜디오','1':'1BR','2':'2BR','3':'3BR'};
R.forEach(r=>r.ls.forEach(l=>{l.ty=lty(l[1]);lk(r,l)}));
// 방 구성별 현재 최저 월세: 살아 있는 매물 가격 + 조사 요약가(그 유형 매물이 전부 내려갔으면 요약가 제외)
function ep(r){const o={};['S','1','2','3'].forEach(k=>{const a=r.ls.filter(l=>l.ty===k),v=a.filter(l=>!l.dead&&l[2]!=null).map(l=>l[2]);
if(r.p[k]!=null&&!(a.length&&a.every(l=>l.dead)))v.push(r.p[k]);o[k]=v.length?Math.min(...v):null});return o}
const ago=iso=>{if(!iso)return '';const m=Math.round((Date.now()-Date.parse(iso))/6e4);return m<1?'방금':m<60?m+'분 전':m<1440?Math.round(m/60)+'시간 전':Math.round(m/1440)+'일 전'};
const fdt=iso=>iso?new Date(iso).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';
function lvApply(j){
R.forEach(r=>{r.ls=r.ls.filter(l=>!l.nw);r.ls.forEach(l=>{if(l.p0!==undefined){l[2]=l.p0;delete l.p0}delete l.dead;delete l.chk;delete l.chg})});
const C=j.checks||{},Fd=j.found||{};
R.forEach(r=>{r.ls.forEach(l=>{const c=C[l[3]];if(!c)return;l.chk=c;
if(c.state==='gone')l.dead=true;
else if(c.state==='live'&&c.unit&&c.price>0&&Math.abs(c.price-(l[2]||0))>0.005){l.p0=l[2];l[2]=c.price;l.chg=true}});
(Fd[r.id]||[]).forEach(x=>{if(!x||!x.url||r.ls.some(l=>l[0]===x.code||l[3]===x.url))return;
const ty=x.beds||lty(x.title);const d=[ty?tyL[ty]:'',x.area?x.area+'㎡':'',x.src||'',x.title&&!ty?x.title.slice(0,40):''].filter(Boolean).join(' · ');
const l=[x.code||x.src||'새 매물',d,x.price>0?x.price:null,x.url];l.nw=true;l.ty=ty;l.ph=x.img||null;l.first=x.first;l.chk=C[x.url]||null;lk(r,l);r.ls.push(l)})})}
async function lvLoad(manual){
try{const res=await fetch(LV_URL+'?t='+Date.now(),{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);const j=await res.json();LVERR='';
if(!LIVE||j.updated!==LIVE.updated||manual){LIVE=j;lvApply(j);all();favPanel()}}
catch(e){LVERR=String(e.message||e)}
LVAT=Date.now();lvUi()}
function lvSum(){const s={live:0,nw:0,dead:0,chg:0,unk:0};R.forEach(r=>r.ls.forEach(l=>{if(l.nw)s.nw++;if(l.dead)s.dead++;else if(l.chk&&l.chk.state==='live')s.live++;else s.unk++;if(l.chg)s.chg++}));return s}
function lvUi(){const el=$('lvs');if(!el)return;
if(LVERR&&!LIVE){el.textContent='매물 상태 못 불러옴';el.className='sm lvs bad'}
else if(!LIVE||!LIVE.updated){el.textContent='매물 자동 확인 대기';el.className='sm lvs'}
else{const s=lvSum();el.textContent='매물 '+ago(LIVE.updated)+' 확인'+(s.nw?' · 새 '+s.nw:'')+(s.dead?' · 내려감 '+s.dead:'');el.className='sm lvs'+(Date.now()-Date.parse(LIVE.updated)>864e5?' old':' ok')}
const p=$('lvp');if(!p)return;
if($('lvsum'))$('lvsum').textContent=LIVE&&LIVE.updated?ago(LIVE.updated):'';
let h='<div class="fxb"><b>'+(LIVE&&LIVE.updated?'마지막 확인 '+fdt(LIVE.updated)+' ('+ago(LIVE.updated)+')':'아직 자동 확인 기록 없음')+'</b><div>6시간마다 GitHub에서 매물 페이지를 열어 게시 여부·가격을 확인하고 새 매물을 찾습니다. 앱은 열 때와 30분마다 결과를 다시 읽습니다'+(LVAT?' (앱이 읽은 시각 '+new Date(LVAT).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})+')':'')+'.</div>'+(LVERR?'<div style="color:var(--text-danger)">불러오기 실패: '+esc(LVERR)+'</div>':'')+'<div class="fx"><button class="sm" id="lvr">결과 다시 읽기</button><a class="sm lnk" href="'+LV_ACT+'" target="_blank" rel="noopener">지금 수집 실행(GitHub)</a></div></div>';
if(LIVE){const s=lvSum();h+='<div class="cg"><div><small>게시 확인</small><b>'+s.live+'</b></div><div><small>새 매물</small><b>'+s.nw+'</b></div><div><small>내려감</small><b>'+s.dead+'</b></div></div><div class="cs">가격 변동 '+s.chg+' · 확인 못 함 '+s.unk+' (사이트 차단·시간 초과는 이전 상태 유지)</div>';
const S=LIVE.sites||{};if(Object.keys(S).length)h+='<table class="tt"><thead><tr><th>사이트</th><th>게시</th><th>내려감</th><th>새 매물</th><th>확인 못 함</th></tr></thead><tbody>'+Object.keys(S).map(k=>{const x=S[k];return '<tr><td>'+esc(k)+'</td><td>'+(x.live|0)+'</td><td>'+(x.gone|0)+'</td><td>'+(x.found|0)+'</td><td>'+((x.blocked|0)+(x.error|0))+'</td></tr>'}).join('')+'</tbody></table>';
const row=(r,l,b)=>'<div class="lr"><button class="sm" data-go="'+r.id+'">'+r.i+'</button> '+esc(r.sn)+' · <a href="'+l[3]+'" target="_blank" rel="noopener">'+esc(l[0])+'</a> '+esc(l[1])+' <span class="bd">'+fm(l[2])+'</span>'+b+'</div>';
const grp=(t,fn,b)=>{const a=[];R.forEach(r=>r.ls.forEach(l=>{if(fn(l))a.push(row(r,l,b(l)))}));return a.length?'<h4 class="ng">'+t+' '+a.length+'</h4>'+a.join(''):''};
h+=grp('새 매물',l=>l.nw,l=>l.first?' <span class="un">'+ago(l.first)+' 발견</span>':'')+grp('가격 바뀜',l=>l.chg,l=>' <span class="un">조사 때 '+fm(l.p0)+'</span>')+grp('내려간 매물',l=>l.dead,()=>'')}
p.innerHTML=h}
function lvBadge(l){let b='';if(l.dead)b+=' <span class="bd no">내려감</span>';if(l.nw)b+=' <span class="bd ok">새 매물</span>';if(l.chg)b+=' <span class="bd">조사 때 '+fm(l.p0)+'</span>';if(!l.dead&&l.chk&&l.chk.state==='live')b+=' <span class="bd ok" title="'+esc(fdt(l.chk.at))+' 확인">게시 중</span>';return b}
function lsBlock(r,f){if(!r.ls.length)return '<div class="un">링크할 매물을 못 찾음</div>';
const a=r.ls.map((l,i)=>({l,i})).sort((x,y)=>(x.l.dead?1:0)-(y.l.dead?1:0)||(y.l.nw?1:0)-(x.l.nw?1:0));
return a.map(({l,i})=>{const k=fkey(r,i),e=est(l),on=FL.has(k),u=phU(l);
return '<div class="lr'+(l.dead?' dd':'')+'"><button class="st'+(on?' on':'')+'" data-fl="'+k+'" aria-label="매물 즐겨찾기">'+(on?'★':'☆')+'</button> '+(u?phLink(u,'lt',l[3]):'')+'<a href="'+l[3]+'" target="_blank" rel="noopener">'+esc(l[0])+'</a> '+esc(l[1])+' <span class="bd'+(l[2]!=null&&l[2]<=f.b&&!l.dead?' ok':'')+'">'+fm(l[2])+'</span>'+(l[2]!=null?' <span class="bd">≈'+fw(l[2])+'</span>':'')+lvBadge(l)
+(e&&e.t!=null&&!l.dead?'<div class="sub" style="margin:0 0 2px 30px">월 총 추정 '+fw(e.t)+' (관리비 '+(l[0]==='AREUM'?'무료 안내':fw(e.ipl))+' + 전기 '+fw(e.el)+' + 물 '+fw(e.w)+')</div>':'')+lmeta(k)+memoH(k,false)+'</div>'}).join('')
+(LIVE&&LIVE.updated?'<div class="sub">매물 상태 자동 확인 '+ago(LIVE.updated)+'</div>':'')}
function lvCard(r){if(!LIVE)return '';const n=r.ls.filter(l=>!l.dead).length,nw=r.ls.filter(l=>l.nw).length,d=r.ls.filter(l=>l.dead).length;
return '<div style="margin-top:2px"><span class="bd">매물 '+n+'</span>'+(nw?'<span class="bd ok">새 '+nw+'</span>':'')+(d?'<span class="bd no">내려감 '+d+'</span>':'')+'</div>'}
document.addEventListener('click',e=>{if(e.target.id==='lvs'){location.hash='#/find';const d=$('lvd');d.open=true;setTimeout(()=>d.scrollIntoView({block:'start'}),80);return}if(e.target.id==='lvr')lvLoad(true)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-LVAT>5*6e4)lvLoad(false)});
setInterval(()=>{if(!document.hidden)lvLoad(false)},30*6e4);
