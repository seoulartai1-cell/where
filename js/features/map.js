// 지도·마커·팝업
function initMap(){
map=L.map('map',{zoomControl:true});
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:20,attribution:'© OpenStreetMap contributors © CARTO'}).addTo(map);
zg=L.layerGroup().addTo(map);lg=L.layerGroup().addTo(map);trg=L.layerGroup().addTo(map);rtg=L.layerGroup().addTo(map);bsg=L.layerGroup().addTo(map);ig=L.layerGroup().addTo(map);mk=L.layerGroup().addTo(map);ln=L.layerGroup().addTo(map);
map.on('popupclose',()=>{ln.clearLayers();sel=null});
map.on('zoomend',()=>{zc();labelsUpd()});map.on('moveend',()=>{drawInfra();drawBus()});}
function zc(){$('map').classList.toggle('zlow',map.getZoom()<15);$('map').classList.toggle('ztl',map.getZoom()<13);$('map').classList.toggle('zfar',map.getZoom()<12)}
function lines(r){ln.clearLayers();
ln.addLayer(L.circle([r.lat,r.lng],{radius:+$('ir').value,color:'#2E8B57',weight:1,dashArray:'3 4',fillColor:'#2E8B57',fillOpacity:.05,interactive:false}));
const tg=[[r.mrt[0].s,r.mrt[0].d,'#7F77DD']];['pd','bl','en'].forEach(k=>{const n=r.nb[k][0];tg.push([n.p,n.d,KN[k].c])});
tg.forEach(t=>ln.addLayer(L.polyline([[r.lat,r.lng],[t[0].lat,t[0].lng]],{color:t[2],weight:2,dashArray:'5 4'}).bindTooltip(fd(t[1]),{permanent:true,className:'dt'})));
ln.addLayer(L.polyline([[r.lat,r.lng],[JK.lat,JK.lng]],{color:'#C0392B',weight:1.5,dashArray:'2 5'}))}
function render(){
mk.clearLayers();ln.clearLayers();zg.clearLayers();rm={};
kpoly={};
if(lay('kc'))KCG.forEach(g=>zg.addLayer(L.polygon(g.g,{color:'#8a8a8a',weight:1.8,opacity:.75,fill:false,interactive:false})));
KEL.forEach(k=>{const kl=lay('kl'),zd=lay('zd');const tp=lay('tp');const pl=L.polygon(k.g,{color:kl?'#777':'transparent',weight:kl?.7:0,opacity:.5,fillColor:tp?CAT[k.cat][1]:'#000',fillOpacity:tp&&catOn(k.cat)?.4:0.01,interactive:zd});if(zd)pl.bindPopup(()=>kelHtml(k),{maxWidth:340,maxHeight:430});kpoly[kkey(k)]=pl;zg.addLayer(pl)});
if(lay('nm'))TG.forEach(t=>{if(!catOn(t.cat))return;t.ks.forEach(k=>zg.addLayer(L.polygon(k.g,{color:'#555',weight:2,dashArray:'2 5',opacity:.8,fill:false,interactive:false})))});
$('clg').innerHTML=lay('tp')?'<div style="margin-top:4px">지역 특징 · '+Object.keys(lay('jd')?ACAT:CAT).map(c=>'<span class="sw" style="background:'+ACAT[c][1]+'"></span>'+ACAT[c][0]).join(' ')+'</div>':'';
labelsUpd();study();
ZN.forEach(z=>{if(lay('zn')){const c=L.circle([z.lat,z.lng],{radius:z.r,color:z.c,weight:1.5,dashArray:'6 4',fillColor:z.c,fillOpacity:.1,interactive:lay('zd')});if(lay('zd'))c.bindPopup(()=>znHtml(z),{maxWidth:340,maxHeight:430});zg.addLayer(c)}
if(lay('zl')&&!lay('nm'))zg.addLayer(L.marker([z.lat,z.lng],{icon:L.divIcon({html:'<div class="zt" style="color:'+z.c+'">'+z.n.split(' ')[0]+'<small>'+(z.n.split(' ').slice(1).join(' '))+'</small>'+(lay('zk')&&z.kr?'<small>≈ '+z.kr+'</small>':'')+'</div>',className:'',iconSize:[0,0]}),interactive:false,keyboard:false,zIndexOffset:-1000}))});
if(lay('jd'))JD.forEach(d=>{if(!catOn(d.cat)||(lay('nm')&&dupJ(d)))return;const f=ACAT[d.cat][1],ik=ACAT[d.cat][2];
const o=L.circle([d.lat,d.lng],{radius:d.r,color:ik,weight:1.2,opacity:.55,fillColor:f,fillOpacity:.4,interactive:lay('zd')});if(lay('zd'))o.bindPopup(()=>jdHtml(d),{maxWidth:340,maxHeight:430});zg.addLayer(o);
if(lay('zl')){const m=L.marker([d.lat,d.lng],{icon:L.divIcon({html:jdLab(d),className:'',iconSize:[0,0]}),interactive:lay('zd'),keyboard:false,zIndexOffset:-800});if(lay('zd'))m.bindPopup(()=>jdHtml(d),{maxWidth:340,maxHeight:430});zg.addLayer(m)}});
zinfo();
PO.forEach((p,i)=>{if(!lay(p.k))return;const c=KN[p.k].c,s=p.k==='pd'?'◆':p.k==='bl'?'▲':'■';
const m=L.marker([p.lat,p.lng],{icon:mkIcon('<span style="color:'+c+'">'+s+'</span>','pin',22),title:p.n});
m.bindPopup(()=>strip(popP(p)),{maxWidth:340,maxHeight:430});m.on('popupopen',()=>{sel={k:'p',id:i}});mk.addLayer(m)});
R.forEach(r=>{const on=pass[r.id];if(fonly()&&!FV[r.id])return;
const m=L.marker([r.lat,r.lng],{icon:rIcon(r),zIndexOffset:FV[r.id]?700:on?600:300,title:r.i+'. '+r.nm});
m.bindPopup(()=>strip(popR(r)),{maxWidth:340,maxHeight:430});
m.on('popupopen',()=>{sel={k:'r',id:r.id};lines(r)});
if(lay('bus'))m.bindTooltip(r.b[0],{permanent:true,direction:'bottom',offset:[0,10],className:'bt'});
rm[r.id]=m;mk.addLayer(m)});
const j=L.marker([JK.lat,JK.lng],{icon:mkIcon('★','jk',30),zIndexOffset:900,title:JK.n}).bindTooltip('JIKS 학교',{permanent:true,direction:'bottom',offset:[0,12],className:'bt'});
j.bindPopup(()=>strip(popJ()),{maxWidth:340,maxHeight:430});mk.addLayer(j);zc()}
const chip=(v,l,z)=>'<span class="bd '+(v===1?'ok':v===0?'no':'un')+'">'+l+' '+(v===1?'있음':v===0?z:'미확인')+'</span>';
const SITES=[['Rumah123','rumah123.com'],['99.co','99.co'],['Jendela360','jendela360.com'],['Travelio','travelio.com'],['Mamikos','mamikos.com'],['OLX','olx.co.id']];
const gs=(q,s)=>'https://www.google.com/search?q='+encodeURIComponent(q+' sewa apartemen site:'+s);
const gmn=n=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(n+' Jakarta');
const links=r=>'<div class="lk">'+SITES.map(s=>'<a href="'+gs(r.nm,s[1])+'" target="_blank" rel="noopener">'+s[0]+'</a>').join('')+'</div>';

function popR(r){const f=F();
let h='<div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><div><span class="nb" style="margin-right:6px">'+r.i+'</span><b style="font-weight:500;font-size:15px">'+r.nm+'</b><div style="color:var(--text-secondary)">'+r.z+(r.kl?' · 행정구역 '+r.kl.k+' / '+r.kl.kc:'')+' · 구글 '+r.rt[0]+'점('+r.rt[1].toLocaleString('en-US')+')</div></div><button class="sm" id="px" aria-label="닫기">닫기</button></div>';
h+=phGal(r)+'<div style="margin-top:6px">'+fbtn(r.id)+'</div>'+fform(r.id)+'<div style="margin-top:6px"><a href="'+gm(r.lat,r.lng)+'" target="_blank" rel="noopener">구글 지도(좌표)</a> · <a href="'+gmn(r.nm)+'" target="_blank" rel="noopener">구글 지도(이름)</a> · <a href="'+gd(r.lat,r.lng)+'" target="_blank" rel="noopener">JIKS까지 경로</a></div><h4>매물 검색(부동산 사이트)</h4>'+links(r);
h+='<h4>버스 승차</h4><div style="font-size:18px;font-weight:500">'+r.b[0]+'</div><div>승차 지점: '+r.b[1]+'</div><div style="color:var(--text-secondary)">노선: '+r.b[2]+'</div><div>JIKS까지 직선 <b style="font-weight:500">'+fd1(r.jd)+'</b></div>';
h+='<h4>월세 (루피아, 만 단위)</h4><div>'+r.pt+'</div>';
h+=lsBlock(r,f);
h+='<h4>시설</h4>'+chip(r.f.gym,'헬스장','없음')+chip(r.f.pool,'수영장','없음')+chip(r.f.ten,'테니스','없음')+chip(r.f.mall,'몰 직결','직결 아님')+chip(r.f.mart,'마트','없음')+chip(r.f.cafe,'카페 접근','없음');
h+='<div style="margin-top:4px">뷰: <b style="font-weight:500">'+(GRL[r.gr]||'미확인')+'</b> · '+r.vw+'</div><div>6개월 계약 표기: '+(r.t6===1?'있음':r.t6===0?'없음(12개월만 표기)':'미확인')+'</div>';
h+=needPop(r);
h+='<h4>MRT (직선거리)</h4>';r.mrt.slice(0,3).forEach(m=>{h+='<div>'+m.s.n+' · <b style="font-weight:500">'+fd(m.d)+'</b></div>'});
h+=trNear(r);
['pd','bl','en'].forEach(k=>{h+='<h4>가까운 '+KN[k].l+'</h4>';r.nb[k].slice(0,2).forEach(n=>{h+='<div><span style="color:'+KN[k].c+'">●</span> '+n.p.n+' · <b style="font-weight:500">'+fd(n.d)+'</b>'+(n.p.coach?' <span class="bd ok">코칭</span>':'')+'</div>'})});
if(r.ex)h+='<div style="margin-top:4px;color:var(--text-secondary)">'+r.ex+'</div>';
h+='<h4>장점</h4>'+r.pro.map(x=>'<div>+ '+x+'</div>').join('')+'<h4>단점·주의</h4>'+r.con.map(x=>'<div>- '+x+'</div>').join('');
h+='<h4>출처</h4>'+r.src.map(x=>'<div><a href="'+x[1]+'" target="_blank" rel="noopener">'+x[0]+'</a></div>').join('');return h}
function popP(p){const l=R.map(r=>({r,d:hav(r.lat,r.lng,p.lat,p.lng)})).sort((a,b)=>a.d-b.d).slice(0,3);
return '<div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><div><span style="color:'+KN[p.k].c+'">●</span> <b style="font-weight:500;font-size:15px">'+p.n+'</b><div style="color:var(--text-secondary)">'+KN[p.k].l+'</div></div><button class="sm" id="px" aria-label="닫기">닫기</button></div><div style="margin-top:6px"><a href="'+gm(p.lat,p.lng)+'" target="_blank" rel="noopener">구글 지도에서 열기</a></div><div style="margin-top:8px">'+p.d+'</div>'+(p.k==='pd'?'<div style="margin-top:4px">코칭: '+(p.coach?'있음':'미확인')+'</div>':'')+'<h4>가까운 단지</h4>'+l.map(x=>'<div>'+x.r.i+'. '+x.r.nm+' · <b style="font-weight:500">'+fd(x.d)+'</b></div>').join('')}
function popJ(){const l=R.slice().sort((a,b)=>a.jd-b.jd);
return '<div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><div><span style="color:var(--fill-danger)">★</span> <b style="font-weight:500;font-size:15px">'+JK.n+'</b><div style="color:var(--text-secondary)">Jl. Bina Marga No.24, Ceger, Cipayung, Jakarta Timur 13820</div></div><button class="sm" id="px" aria-label="닫기">닫기</button></div><div style="margin-top:6px"><a href="https://www.google.com/maps/search/?api=1&query=Jakarta+International+Korean+School&query_place_id='+JK.pid+'" target="_blank" rel="noopener">구글 지도에서 열기</a></div><h4>운영 정보(구글)</h4><div>월~금 06:30~15:00 · 토·일 휴무</div><div>전화 +62 21 8444958</div><h4>단지별 직선거리</h4>'+l.map(r=>'<div>'+r.i+'. '+r.sn+' · <b style="font-weight:500">'+fd1(r.jd)+'</b> · 버스 '+r.b[0]+'</div>').join('')}

function go(id){const r=R.find(q=>q.id===id);map.setView([r.lat,r.lng],Math.max(map.getZoom(),16));setView('map');setTimeout(()=>rm[id]&&rm[id].openPopup(),250)}
function bounds(a){map.fitBounds(L.latLngBounds(a),{padding:[40,40]})}
function fit(){bounds(R.map(r=>[r.lat,r.lng]).concat(ST.map(s=>[s.lat,s.lng])))}
function fitAll(){bounds(R.map(r=>[r.lat,r.lng]).concat(ST.map(s=>[s.lat,s.lng]),[[JK.lat,JK.lng]]))}

