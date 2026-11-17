// 생활 조건(필수·선호)·주변 인프라(OSM)
/* 생활 조건: 필수·선호, 주변 인프라(OSM), 단지별 직접 기록 */
const INF_CATS=[
{l:'슈퍼마켓',c:'#2E8B57',g:'supermarket',h:'장보기'},
{l:'편의점',c:'#E6A100',g:'convenience store',h:'급한 생필품'},
{l:'병원·의원',c:'#D93F3F',g:'hospital clinic',h:'응급·소아과'},
{l:'약국',c:'#17A2B8',g:'pharmacy',h:'상비약'},
{l:'세탁소',c:'#6C5CE7',g:'laundry',h:'세탁·드라이클리닝'},
{l:'공원',c:'#4CAF50',g:'park',h:'산책·아이 놀이'},
{l:'한식당',c:'#C0392B',g:'Korean restaurant',h:'식사'},
{l:'은행·ATM',c:'#607D8B',g:'ATM bank',h:'현금 인출'},
{l:'발레·댄스',c:'#E84393',g:'ballet school',h:'발레·무용 학원'},
{l:'영어학원',c:'#0984E3',g:'English course adult',h:'일반·성인 영어 (아동 영어 제외)'},
{l:'스케이트파크',c:'#2D3436',g:'skatepark',h:'보드·인라인'},
{l:'음악학원',c:'#A0522D',g:'music school',h:'피아노·악기'},
{l:'태권도·무술',c:'#F39C12',g:'taekwondo',h:'태권도·무술 도장'},
{l:'인도네시아어 학원',c:'#00A884',g:'Bahasa Indonesia course for foreigners',h:'외국인 대상, 영어로 수업'},
{l:'필라테스',c:'#B983FF',g:'pilates studio',h:'필라테스 스튜디오'}];
const mi=(id,l,h)=>({id,l,h,t:'m'});
const NG=[
{g:'주변 생활 · 반경 안 자동 집계',i:INF_CATS.map((c,k)=>({id:'i'+k,l:c.l,h:c.h,t:'i',ci:k}))},
{g:'유닛·가구 · 팝업에서 직접 기록',i:[mi('furn','가구 포함(풀퍼니시드)','입주 즉시 생활, 단기 계약에 유리'),mi('ac','방마다 에어컨','상시 냉방'),mi('wash','세탁기·건조기','우기 빨래'),mi('water','온수·수압 양호','고층 수압, 온수기 확인'),mi('maid','가사도우미방','3BR 이상에 있는 경우가 많음')]},
{g:'안전·설비 · 팝업에서 직접 기록',i:[mi('sec24','24시간 보안','게이트·로비 상주'),mi('flood','침수 이력 없음','우기(11~3월) 저지대·지하주차장 확인'),mi('gen','정전 대비 발전기','정전 때 엘리베이터·급수'),mi('power','전기 용량 충분','에어컨 여러 대 동시 사용'),mi('net','광 인터넷 설치 가능','재택·온라인 수업'),mi('lift','엘리베이터 양호','고층일수록 후기 확인')]},
{g:'차량·가족 · 팝업에서 직접 기록',i:[mi('park','유닛당 주차 확보','차량 2대 이상이면 확인'),mi('vpark','방문객 주차','방문 절차·주차 가능 여부'),mi('play','어린이 놀이터','아이 있는 가정'),mi('pet','반려동물 가능','단지 규정 확인')]},
{g:'계약·비용 · 팝업에서 직접 기록',i:[mi('fee','관리비(IPL) 포함','월세 외 별도 청구 여부'),mi('pay','월·분기 납부 가능','연 선납 요구가 흔함'),mi('dep','보증금 1~2개월분','보증금 규모·반환 조건')]}
];
const ALLI=NG.flatMap(g=>g.i),MAN=ALLI.filter(i=>i.t==='m');
const NPRE={must:['sec24','flood','ac','water','i0','i2'],pref:['furn','wash','net','gen','park','play','i1','i3','i4','i5','i6']};
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let NS=ld('where.ns',{}),CK=ld('where.ck',{}),INF=null,INFL=false,ckOpen=false;
Object.keys(NS).forEach(k=>{if(!ALLI.some(i=>i.id===k)||(NS[k]!==1&&NS[k]!==2))delete NS[k]});
const stc=s=>s===1?'ok':s===0?'no':'un',stt=s=>s===1?'✓':s===0?'✗':'?';
const chipN=x=>'<span class="bd '+stc(x.s)+'">'+(x.m===1?'필수 ':'선호 ')+x.it.l+' '+stt(x.s)+'</span>';
const gq=(q,r)=>'https://www.google.com/maps/search/'+encodeURIComponent(q)+'/@'+r.lat+','+r.lng+',16z';
function st(r,it){if(it.t==='i')return INF&&r.ic?(r.ic[it.ci]>0?1:0):null;const v=(CK[r.id]||{})[it.id];return v===1||v===0?v:null}
function need(r){const rows=[];let bad=0,unk=0,pm=0,pn=0;
ALLI.forEach(it=>{const m=NS[it.id]|0;if(!m)return;const s=st(r,it);rows.push({it,m,s});
if(m===1){if(s===0)bad++;else if(s===null)unk++}else{pn++;if(s===1)pm++}});
return{rows,bad,unk,pm,pn}}
function cardNeed(r){let h='';if(r.nd.rows.length)h+='<div style="margin-top:4px">'+r.nd.rows.map(chipN).join('')+(r.nd.pn?'<span class="bd">선호 '+r.nd.pm+'/'+r.nd.pn+'</span>':'')+'</div>';
if(INF&&r.ic)h+='<div style="font-size:12px;color:var(--text-secondary);margin-top:2px">반경 '+$('ir').value+'m · '+INF_CATS.map((c,k)=>c.l+' '+r.ic[k]).join(' · ')+'</div>';return h}
function needPop(r){let h='<h4>내 생활 조건</h4>'+(r.nd.rows.length?r.nd.rows.map(chipN).join(''):'<div class="un">선택한 조건 없음</div>');
h+='<h4>주변 생활 (반경 '+$('ir').value+'m)</h4>';
if(!INF||!r.ic)h+='<div class="un">미집계 <button class="sm" data-inf="1">불러오기</button></div>';
else h+=INF_CATS.map((c,k)=>'<div><span style="color:'+c.c+'">●</span> '+c.l+' <b style="font-weight:500">'+r.ic[k]+'곳</b>'+(r.in[k]!=null?' · 최근접 '+fd(r.in[k]):'')+'</div>').join('');
h+='<div class="lk">'+INF_CATS.map(c=>'<a href="'+gq(c.g,r)+'" target="_blank" rel="noopener">'+c.l+'</a>').join('')+'</div><div class="un">위 링크는 구글 지도 근처 검색</div>';
h+='<details id="ckd" style="margin-top:6px"'+(ckOpen?' open':'')+'><summary style="cursor:pointer">설비·계약 항목 기록</summary>'+MAN.map(i=>{const v=(CK[r.id]||{})[i.id];return '<div class="ckr"><span>'+i.l+'</span><span class="ck">'+[[1,'✓'],[0,'✗']].map(b=>'<button class="sm'+(v===b[0]?' on'+b[0]:'')+'" data-ck="'+i.id+'" data-r="'+r.id+'" data-v="'+b[0]+'">'+b[1]+'</button>').join('')+'</span></div>'}).join('')+'<div class="un">같은 버튼을 다시 누르면 미확인으로 돌아갑니다. 이 브라우저에만 저장됩니다.</div></details>';
return h}
function buildNeed(){$('nlist').innerHTML=NG.map(g=>'<div class="ng">'+g.g+'</div><div class="ni">'+g.i.map(i=>{const m=NS[i.id]|0;return '<div class="nr'+(m===1?' m':m===2?' p':'')+'"><div>'+i.l+'<small>'+i.h+'</small></div><select data-n="'+i.id+'">'+['무관','필수','선호'].map((x,v)=>'<option value="'+v+'"'+(v===m?' selected':'')+'>'+x+'</option>').join('')+'</select></div>'}).join('')+'</div>').join('');
$('ilay').innerHTML=INF_CATS.map((c,k)=>'<label class="ch"><input type="checkbox" data-il="'+k+'"> <span style="color:'+c.c+'">●</span> '+c.l+'</label>').join('')}
function refresh(id){const f=F();R.forEach(r=>{r.nd=need(r);pass[r.id]=ok(r,f)});
R.forEach(r=>{const m=rm[r.id];if(m){const on=pass[r.id];m.setIcon(rIcon(r));m.setZIndexOffset(FV[r.id]?700:on?600:300)}});
lst();const m=rm[id],p=m&&m.getPopup();if(p&&p.isOpen()){const c=p.getElement().querySelector('.leaflet-popup-content'),y=c.scrollTop;p.update();c.scrollTop=y}}
const OV=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://overpass.private.coffee/api/interpreter'];
const OQ=['["shop"="supermarket"]','["shop"="convenience"]','["amenity"~"^(hospital|clinic|doctors)$"]','["amenity"="pharmacy"]','["shop"~"^(laundry|dry_cleaning)$"]','["leisure"="park"]','["amenity"="restaurant"]["cuisine"~"korean"]','["amenity"~"^(bank|atm)$"]','["amenity"="dancing_school"]','["leisure"="dance"]','["name"~"ballet|balet",i]','["amenity"="language_school"]','["name"~"english|bahasa inggris|wall street english|^EF ",i]','["leisure"="skatepark"]','["sport"~"skateboard"]','["amenity"="music_school"]','["name"~"music school|sekolah musik|kursus musik|piano",i]','["sport"~"taekwondo|martial_arts|karate|judo"]','["name"~"taekwondo",i]','["name"~"indonesian|bahasa indonesia|bipa|wisma bahasa|cinta bahasa|bahasa kita",i]','["sport"~"pilates"]','["name"~"pilates",i]'];
function bbox(){const m=0.0145,a=R.map(r=>r.lat),o=R.map(r=>r.lng);return[Math.min(...a)-m,Math.min(...o)-m,Math.max(...a)+m,Math.max(...o)+m].map(x=>+x.toFixed(4)).join(',')}
function icat(t){if(t.shop==='supermarket')return 0;if(t.shop==='convenience')return 1;if(/^(hospital|clinic|doctors)$/.test(t.amenity||''))return 2;if(t.amenity==='pharmacy')return 3;if(/^(laundry|dry_cleaning)$/.test(t.shop||''))return 4;if(t.leisure==='park')return 5;if(t.amenity==='restaurant'&&/korean/i.test(t.cuisine||''))return 6;if(/^(bank|atm)$/.test(t.amenity||''))return 7;
const nm=(t.name||'')+' '+(t['name:en']||''),sp=t.sport||'';
if(t.amenity==='dancing_school'||t.leisure==='dance'||/ballet|balet/i.test(nm))return 8;
if(/indonesian|bahasa indonesia|\bbipa\b|wisma bahasa|cinta bahasa|bahasa kita/i.test(nm)&&(t.amenity==='language_school'||/school|course|kursus|sekolah|bahasa|language|bipa/i.test(nm)))return 13;
if((t.amenity==='language_school'&&/english|inggris|^EF |wall street|\bLIA\b|\bELTI\b|\bTBI\b|\bILP\b|british|ielts|toefl/i.test(nm))||/english|bahasa inggris|^EF |wall street english/i.test(nm)){if(/kid|child|anak|junior|little|toddler|tots|early|baby|balita|preschool/i.test(nm))return -1;return 9}
if(t.leisure==='skatepark'||/skateboard/.test(sp))return 10;
if(t.amenity==='music_school'||/music school|sekolah musik|kursus musik|piano/i.test(nm))return 11;
if(/taekwondo|martial_arts|karate|judo/.test(sp)||/taekwondo/i.test(nm))return 12;
if(/pilates/.test(sp)||/pilates/i.test(nm))return 14;return -1}
function iparse(j){return(j.elements||[]).map(e=>{const t=e.tags||{},c=icat(t),la=e.lat!=null?e.lat:e.center&&e.center.lat,lo2=e.lon!=null?e.lon:e.center&&e.center.lon;if(c<0||la==null||lo2==null)return null;return[+(+la).toFixed(5),+(+lo2).toFixed(5),c,(t.name||t['name:en']||'').slice(0,40)]}).filter(Boolean)}
const istat=t=>{$('istat').textContent=t};
function calcInfra(){const rad=+$('ir').value/1000;R.forEach(r=>{r.ic=INF_CATS.map(()=>0);r.in=INF_CATS.map(()=>null);INF.forEach(p=>{const d=hav(r.lat,r.lng,p[0],p[1]);if(d<=rad)r.ic[p[2]]++;if(r.in[p[2]]==null||d<r.in[p[2]])r.in[p[2]]=d})})}
function setInf(d,src){INF=d;calcInfra();$('iload').textContent='인프라 다시 불러오기';istat('집계 완료 '+d.length+'곳 · '+src+' · © OpenStreetMap contributors. 반경 안 개수는 직선거리 기준이며 이름 없는 점포도 포함합니다.');all();drawInfra()}
async function loadInfra(force){if(INFL)return;INFL=true;const bb=bbox();
try{if(!force){const c=ld('where.inf',null);if(c&&c.v===3&&c.k===bb&&Date.now()-c.t<6048e5&&c.d&&c.d.length){setInf(c.d,'저장본');return}}
istat('주변 인프라 불러오는 중…');const q='[out:json][timeout:60];('+OQ.map(t=>'nwr'+t+'('+bb+');').join('')+');out tags center;';let err='';
for(const u of OV){try{const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),75000);const res=await fetch(u,{method:'POST',body:'data='+encodeURIComponent(q),headers:{'Content-Type':'application/x-www-form-urlencoded'},signal:ctl.signal});clearTimeout(to);if(!res.ok)throw new Error('HTTP '+res.status);const d=iparse(await res.json());if(!d.length)throw new Error('빈 결과');sv('where.inf',{v:3,k:bb,t:Date.now(),d});setInf(d,'OpenStreetMap(Overpass)');return}catch(e){err=e.name==='AbortError'?'시간 초과':String(e.message||e)}}
istat('인프라를 불러오지 못했습니다('+err+'). 버튼으로 다시 시도하거나 팝업의 구글 지도 링크를 쓰세요.')}
finally{INFL=false}}
function ensureInfra(){if(!INF&&!INFL)loadInfra(false)}
function drawInfra(){if(!ig)return;ig.clearLayers();const on=[...document.querySelectorAll('[data-il]:checked')].map(x=>+x.dataset.il),n=$('inote');n.textContent='';if(!on.length)return;if(!INF){ensureInfra();return}
if(map.getZoom()<15){n.textContent='지도를 확대(줌 15 이상)하면 표시됩니다.';return}
const b=map.getBounds();let c=0,more=false;for(const p of INF){if(!on.includes(p[2])||!b.contains([p[0],p[1]]))continue;if(c>=700){more=true;break}c++;
ig.addLayer(L.circleMarker([p[0],p[1]],{radius:5,color:'#fff',weight:1,fillColor:INF_CATS[p[2]].c,fillOpacity:.95}).bindTooltip((p[3]?p[3]+' · ':'')+INF_CATS[p[2]].l))}
if(more)n.textContent='많아서 일부만 표시합니다. 더 확대하세요.'}
function needInput(e){const t=e.target;
if(t.dataset.n!==undefined){const v=+t.value;if(v)NS[t.dataset.n]=v;else delete NS[t.dataset.n];sv('where.ns',NS);t.closest('.nr').className='nr'+(v===1?' m':v===2?' p':'');if(v&&ALLI.find(i=>i.id===t.dataset.n).t==='i')ensureInfra();all();return}
if(t.id==='ir'){if(INF)calcInfra();all();return}
if(t.dataset.il!==undefined){drawInfra();return}
if(t.id==='nu')all()}
function needReset(){NS={};sv('where.ns',NS);buildNeed();$('ir').value=800;$('nu').checked=true;if(INF)calcInfra()}
document.addEventListener('toggle',e=>{if(e.target.id==='ckd')ckOpen=e.target.open},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-ck]');
if(b){const r=b.dataset.r,i=b.dataset.ck,v=+b.dataset.v,o=CK[r]||(CK[r]={});if(o[i]===v)delete o[i];else o[i]=v;sv('where.ck',CK);refresh(r);return}
if(e.target.closest('[data-inf]')){ensureInfra();return}
if(e.target.id==='iload')loadInfra(true)});
$('npreset').onclick=()=>{NS={};NPRE.must.forEach(k=>NS[k]=1);NPRE.pref.forEach(k=>NS[k]=2);sv('where.ns',NS);buildNeed();ensureInfra();all()};
$('nclear').onclick=()=>{NS={};sv('where.ns',NS);buildNeed();all()};
buildNeed();
$('fimp').onchange=e=>{const f=e.target.files[0];if(f)fimp(f);e.target.value=''};
const setv=(id,v)=>{$(id).value=v};
$('preset').onclick=()=>{setv('budget',15);setv('mrt',1.5);setv('pd',3);setv('bl',3);setv('en',2);setv('bus',0);document.querySelectorAll('[data-t],[data-f]').forEach(c=>{c.checked=['gym','pool','green'].includes(c.dataset.f)});$('unk').checked=false;$('q').value='';all()};
$('reset').onclick=()=>{setv('budget',60);setv('mrt',5);setv('pd',5);setv('bl',5);setv('en',5);setv('bus',0);document.querySelectorAll('[data-t],[data-f]').forEach(c=>{c.checked=false});$('unk').checked=true;$('q').value='';needReset();all()};
