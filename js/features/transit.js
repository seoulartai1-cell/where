// 철도·BRT
/* 교통: MRT·LRT·KRL·공항철도·고속철·BRT (노선·역은 OpenStreetMap에서 불러옴) */
/* 색은 두 가지만: 도시철도(MRT·LRT) 보라, 일반철도(KRL·공항·고속철) 회색. 미개통은 보라 점선. */
const TC={mrt:{l:'MRT',c:'#5B3FD0',ch:'M',w:4},lrt:{l:'LRT',c:'#5B3FD0',ch:'L',w:3},krl:{l:'KRL·철도',c:'#78716C',ch:'K',w:2.5},apt:{l:'공항철도',c:'#78716C',ch:'A',w:2.5},hsr:{l:'고속철',c:'#78716C',ch:'H',w:2.5},brt:{l:'BRT',c:'#1565C0',ch:'B',w:2.5},mrp:{l:'MRT 2단계(미개통)',c:'#5B3FD0',ch:'M',w:3,d:'5 6',o:.55}};
const TRK=['st','lrt','krl','apt','hsr','mrp','brt','bst','stn'];
const MT=[['Lebak Bulus',-6.289254,106.774937,'M01'],['Fatmawati',-6.292429,106.792466,'M02'],['Cipete Raya',-6.2774,106.7975,'M03'],['Haji Nawi',-6.2667982,106.7973162,'M04'],['Blok A',-6.2555837,106.797134,'M05'],['Blok M BCA',-6.2445265,106.7982103,'M06'],['ASEAN',-6.239085,106.7985954,'M07'],['Senayan',-6.226683,106.802456,'M08'],['Istora',-6.222331,106.808573,'M09'],['Bendungan Hilir',-6.2154465,106.8173187,'M10'],['Setiabudi Astra',-6.2091,106.8217,'M11'],['Dukuh Atas BNI',-6.200786,106.822746,'M12'],['Bundaran HI',-6.1934095,106.8228579,'M13']];
let TRD={l:TRS.l.filter(x=>TC[x.c]),s:TRS.s.filter(x=>TC[x.c])},BSD=null,TRL=false;
const trOn=c=>lay(c==='mrt'?'st':c);
const tstat=t=>{$('tstat').textContent=t};
function trData(){const s=TRD.s.slice(),l=TRD.l.slice();
if(!s.some(x=>x.c==='mrt'))MT.forEach(m=>s.push({c:'mrt',n:m[0],lat:m[1],lng:m[2],cd:m[3],e:1}));
if(!l.some(x=>x.c==='mrt'))l.push({c:'mrt',n:'MRT 남북선',p:[MT.map(m=>[m[1],m[2]])]});
s.forEach(a=>{a.x=s.some(b=>b!==a&&b.c!==a.c&&hav(a.lat,a.lng,b.lat,b.lng)<0.3)});
return{l,s}}
const shortN=n=>String(n||'').split(':')[0].replace(/KRL Commuter ?Line\s*/i,'KRL ').replace(/\s+/g,' ').trim().slice(0,40);
const KM=111.32;
function sd2(lat,lng,a,b){const kx=Math.cos(lat*Math.PI/180)*KM,ax=(a[1]-lng)*kx,ay=(a[0]-lat)*KM,bx=(b[1]-lng)*kx,by=(b[0]-lat)*KM,dx=bx-ax,dy=by-ay,q=dx*dx+dy*dy;let t=q?-(ax*dx+ay*dy)/q:0;t=Math.max(0,Math.min(1,t));const px=ax+t*dx,py=ay+t*dy;return px*px+py*py}
function wd2(lat,lng,w,lim){let m=1e9;for(let i=1;i<w.length;i++){const a=w[i-1],c=w[i],ya=(a[0]-lat)*KM,yc=(c[0]-lat)*KM;if((ya>lim&&yc>lim)||(ya<-lim&&yc<-lim))continue;const d=sd2(lat,lng,a,c);if(d<m)m=d}return m}
function trLines(s){const set=new Set();trData().l.forEach(x=>{if(x.c!==s.c)return;const nm=shortN(x.n);if(!nm||set.has(nm))return;if(x.p.some(w=>wd2(s.lat,s.lng,w,0.15)<0.0225))set.add(nm)});return set.size?'<div style="margin-top:4px">노선: '+[...set].map(esc).join(', ')+'</div>':''}
function snapSt(S,L){const ws={};L.forEach(l=>{if(l.c==='brt')return;(ws[l.c]||(ws[l.c]=[])).push(...l.p)});
const cats=Object.keys(ws);if(!cats.length)return S;const T=0.0225;
const near=(s,c)=>{let m=1e9;(ws[c]||[]).forEach(w=>{const d=wd2(s.lat,s.lng,w,0.2);if(d<m)m=d});return m};
const out=new Map();S.forEach(s=>{let c=s.c;if(ws[c]&&near(s,c)>=T){let bc=null,bd=1e9;cats.forEach(k=>{const d=near(s,k);if(d<bd){bd=d;bc=k}});if(bd>=T)return;c=bc}
const k=c+'|'+s.n.toLowerCase();if(!out.has(k))out.set(k,Object.assign({},s,{c}))});return[...out.values()]}
function trPop(s){const c=TC[s.c],l=R.map(r=>({r,d:hav(r.lat,r.lng,s.lat,s.lng)})).sort((a,b)=>a.d-b.d).slice(0,3);
return '<div><span class="bd" style="background:'+c.c+';color:#fff">'+c.l+'</span> <b style="font-weight:500;font-size:15px">'+esc(s.n)+'</b></div>'+(s.x?'<div><span class="bd ok">환승 가능 · 300m 이내에 다른 종류 역</span></div>':'')+'<div style="margin-top:6px">JIKS까지 직선 <b style="font-weight:500">'+fd1(hav(s.lat,s.lng,JK.lat,JK.lng))+'</b></div><div><a href="'+gm(s.lat,s.lng)+'" target="_blank" rel="noopener">구글 지도에서 열기</a></div><h4>가까운 단지</h4>'+l.map(x=>'<div>'+x.r.i+'. '+x.r.nm+' · <b style="font-weight:500">'+fd(x.d)+'</b></div>').join('')+(s.cd?'<div>역 번호 '+s.cd+'</div>':'')+trLines(s)+(s.e?'<div class="un" style="margin-top:4px">좌표 출처: 위키백과 역 문서. OpenStreetMap 데이터를 불러오면 그 좌표로 바뀝니다.</div>':'')}
function trNear(r){const d=trData().s;if(!d.length)return '';let h='<h4>가까운 역 (직선거리, 종류별)</h4>';
Object.keys(TC).forEach(c=>{if(c==='brt')return;let b=null,bd=1e9;d.forEach(s=>{if(s.c!==c)return;const x=hav(r.lat,r.lng,s.lat,s.lng);if(x<bd){bd=x;b=s}});if(b)h+='<div><span style="color:'+TC[c].c+'">■</span> '+TC[c].l+' '+esc(b.n)+' · <b style="font-weight:500">'+fd(bd)+'</b></div>'});
if(BSD&&BSD.length){let b=null,bd=1e9;BSD.forEach(p=>{const x=hav(r.lat,r.lng,p[0],p[1]);if(x<bd){bd=x;b=p}});if(b)h+='<div><span style="color:'+TC.brt.c+'">●</span> BRT 정류장 '+esc(b[2]||'')+' · <b style="font-weight:500">'+fd(bd)+'</b></div>'}
return h}
function drawTr(){if(!trg)return;trg.clearLayers();const d=trData(),nm=lay('stn');
Object.keys(TC).forEach(c=>{if(!trOn(c))return;const k=TC[c];
d.l.filter(x=>x.c===c).forEach(x=>{const cs=L.polyline(x.p,{color:'#fff',weight:k.w+2,opacity:k.d?0:.7,interactive:false,lineJoin:'round'}),pl=L.polyline(x.p,{color:k.c,weight:k.w,opacity:k.o||.9,dashArray:k.d||null,lineJoin:'round',lineCap:k.d?'butt':'round'});pl.bindTooltip(k.l+(x.n?' · '+esc(x.n):''),{sticky:true});trg.addLayer(cs);trg.addLayer(pl);
const nm0=shortN(x.n);if(nm0&&c!=='brt'&&lay('stn')){const w=x.p.reduce((a,b)=>b.length>a.length?b:a,x.p[0]);const q=w[w.length>>1];trg.addLayer(L.marker(q,{icon:L.divIcon({html:'',className:'',iconSize:[0,0]}),interactive:false,keyboard:false,zIndexOffset:-50}).bindTooltip('<span style="color:'+k.c+'">'+esc(nm0)+'</span>',{permanent:true,direction:'center',className:'trn trl'}))}});
d.s.filter(s=>s.c===c).forEach(s=>{const z=s.x?18:14,m=L.marker([s.lat,s.lng],{icon:L.divIcon({html:'<div class="tri'+(s.x?' x':'')+'" style="background:'+k.c+'">'+k.ch+'</div>',className:'',iconSize:[z,z],iconAnchor:[z/2,z/2]}),zIndexOffset:s.x?200:100,title:s.n});
if(nm)m.bindTooltip(esc(s.n)+(s.x?' · 환승':''),{permanent:true,direction:'right',offset:[z/2,0],className:'trn'});
m.bindPopup(()=>trPop(s),{maxWidth:320});trg.addLayer(m)})});
updLg();trCount(d)}
function trCount(d){const n={};d.s.forEach(s=>{n[s.c]=(n[s.c]||0)+1});const t=Object.keys(TC).filter(c=>c!=='brt').map(c=>TC[c].l+' '+(n[c]||0)+'역').join(' · ');
tstat(t+(BSD?' · BRT 정류장 '+BSD.length+'곳':'')+' · © OpenStreetMap contributors. 노선이 비어 있으면 OpenStreetMap에 해당 노선이 없거나 불러오지 못한 것입니다.')}
function drawBus(){if(!bsg)return;bsg.clearLayers();const n=$('tnote');n.textContent='';if(!lay('bst')||!BSD)return;
if(map.getZoom()<15){n.textContent='BRT 정류장은 지도를 확대(줌 15 이상)하면 표시됩니다.';return}
const b=map.getBounds();let c=0;for(const p of BSD){if(!b.contains([p[0],p[1]]))continue;if(c>=700){n.textContent='정류장이 많아 일부만 표시합니다. 더 확대하세요.';break}c++;
bsg.addLayer(L.circleMarker([p[0],p[1]],{radius:5,color:'#fff',weight:1.5,fillColor:TC.brt.c,fillOpacity:1}).bindTooltip(p[2]||'BRT 정류장'))}}
function buildLg(){$('tlg').innerHTML='<div style="font-weight:500;color:var(--text-primary)">교통 (눌러서 켜기·끄기)</div>'+Object.keys(TC).map(c=>'<div class="lgr" data-lg="'+(c==='mrt'?'st':c)+'"><i style="border-color:'+TC[c].c+';border-top-width:'+Math.max(3,TC[c].w)+'px'+(TC[c].d?';border-top-style:dashed;opacity:.6':'')+'"></i>'+TC[c].l+(c==='brt'?' 노선':'')+'</div>').join('')+'<div class="lgr" data-lg="bst"><span style="color:'+TC.brt.c+';width:20px;text-align:center">●</span>BRT 정류장</div><div style="margin-top:2px">보라 = 도시철도(MRT·LRT) · 회색 = 일반철도(KRL·공항·고속철) · 점선 = 미개통 · 테두리 원 = 환승역</div>'}
function updLg(){document.querySelectorAll('[data-lg]').forEach(e=>e.classList.toggle('off',!lay(e.dataset.lg)))}
$('tlg').addEventListener('click',e=>{const r=e.target.closest('[data-lg]');if(!r)return;const c=document.querySelector('[data-l="'+r.dataset.lg+'"]');c.checked=!c.checked;drawTr();drawBus()});
const trSet=on=>{TRK.forEach(k=>{if(k!=='stn')document.querySelector('[data-l="'+k+'"]').checked=on});drawTr();drawBus()};
$('tall').onclick=()=>trSet(true);$('tnone').onclick=()=>trSet(false);$('trl').onclick=()=>loadTr(true);
const BB='-6.40,106.65,-6.08,107.05';
const QL='[out:json][timeout:100];relation["route"~"^(subway|light_rail|train|monorail)$"]('+BB+');out tags geom;';
const QS='[out:json][timeout:100];(node["railway"~"^(station|halt)$"]('+BB+');node["station"~"^(subway|light_rail)$"]('+BB+'););out tags;';
const BR='["ref"~"^([1-9]|1[0-3])$"]';
const QBL='[out:json][timeout:100];(relation["route"="bus"]["network"~"transjakarta",i]'+BR+'('+BB+');relation["route"="bus"]["operator"~"transjakarta",i]'+BR+'('+BB+'););out tags geom;';
const QBS='[out:json][timeout:100];(node["highway"="bus_stop"]["network"~"transjakarta",i]('+BB+');node["public_transport"="platform"]["network"~"transjakarta",i]('+BB+');node["amenity"="bus_station"]["network"~"transjakarta",i]('+BB+');node["highway"="bus_stop"]["operator"~"transjakarta",i]('+BB+'););out tags;';
function lcat(t){const s=[t.name,t.network,t.operator,t.ref].join(' ');
if(/whoosh|kcic|kereta cepat/i.test(s))return 'hsr';
if(/railink|bandara|airport/i.test(s))return 'apt';
if(t.route==='subway'||/\bMRT\b/i.test(s))return 'mrt';
if(t.route==='light_rail'||/\bLRT\b/i.test(s))return 'lrt';
if(t.route==='train'||t.route==='monorail'){if(t.service==='long_distance'||t.service==='tourism'||/\b(argo|ekonomi|bisnis|eksekutif|executive)\b|antar ?kota/i.test(s))return null;return 'krl'}
return null}
function scat(t){const s=[t.name,t.operator,t.network,t.brand].join(' ');
if(/whoosh|kcic|kereta cepat/i.test(s))return 'hsr';
if(/railink|bandara|airport/i.test(s))return 'apt';
if(t.station==='subway'||t.subway==='yes'||/\bMRT\b/i.test(s))return 'mrt';
if(t.station==='light_rail'||t.light_rail==='yes'||/\bLRT\b/i.test(s))return 'lrt';
return 'krl'}
function parseL(j,fix){const seen=new Set(),out=[];(j.elements||[]).forEach(e=>{if(e.type!=='relation')return;const t=e.tags||{},c=fix||lcat(t);if(!c)return;const p=[];
(e.members||[]).forEach(m=>{if(m.type!=='way'||!m.geometry||seen.has(m.ref))return;seen.add(m.ref);p.push(m.geometry.map(g=>[+g.lat.toFixed(5),+g.lon.toFixed(5)]))});
if(p.length)out.push({c,n:(t.name||t.ref||'').slice(0,70),p})});return out}
function parseS(j){const m=new Map();(j.elements||[]).forEach(e=>{const t=e.tags||{};if(e.type!=='node'||!t.name||e.lat==null||t.disused||t.abandoned||t.railway==='proposed')return;
const c=scat(t),k=c+'|'+t.name.toLowerCase();if(!m.has(k))m.set(k,{c,n:t.name.replace(/^Stasiun\s+/i,'').slice(0,40),lat:+(+e.lat).toFixed(5),lng:+(+e.lon).toFixed(5)})});return[...m.values()]}
function parseB(j){const m=new Map();(j.elements||[]).forEach(e=>{if(e.type!=='node'||e.lat==null)return;const t=e.tags||{},k=(+e.lat).toFixed(4)+','+(+e.lon).toFixed(4);if(!m.has(k))m.set(k,[+(+e.lat).toFixed(5),+(+e.lon).toFixed(5),(t.name||t['name:en']||'').slice(0,40)])});return[...m.values()]}
async function ovq(q){let err='';for(const u of OV){try{const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),110000);const res=await fetch(u,{method:'POST',body:'data='+encodeURIComponent(q),headers:{'Content-Type':'application/x-www-form-urlencoded'},signal:ctl.signal});clearTimeout(to);if(!res.ok)throw new Error('HTTP '+res.status);return await res.json()}catch(e){err=e.name==='AbortError'?'시간 초과':String(e.message||e)}}throw new Error(err)}
async function loadTr(force){if(TRL)return;TRL=true;
try{if(!force){const c=ld('where.tr4',null);if(c&&Date.now()-c.t<6048e5&&c.b&&c.b.length){TRD.l=TRD.l.filter(x=>x.c!=='brt').concat(c.bl||[]);BSD=c.b;drawTr();drawBus();return}}
tstat('BRT 노선과 정류장 불러오는 중…');
const bl=parseL(await ovq(QBL),'brt');BSD=parseB(await ovq(QBS));
TRD.l=TRD.l.filter(x=>x.c!=='brt').concat(bl);drawTr();drawBus();
sv('where.tr4',{t:Date.now(),bl,b:BSD})}
catch(e){drawTr();tstat('BRT 데이터를 불러오지 못했습니다('+String(e.message||e)+'). 철도는 내장 데이터로 표시 중입니다. "교통 다시 불러오기"를 눌러 보세요.')}
finally{TRL=false}}
