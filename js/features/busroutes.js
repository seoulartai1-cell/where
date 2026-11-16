// 통학버스 노선도
/* 통학버스 노선은 한 색(청록)으로 통일하고, 마우스를 올린 노선만 굵게 강조한다. */
const BUS_C='#0F766E';BUSR.forEach(r=>{r.c=BUS_C});
const RTO={};BUSR.forEach(r=>RTO[r.id]=true);
function drawRt(){if(!rtg)return;rtg.clearLayers();const lb=$('rtlab').checked&&map.getZoom()>=14;
BUSR.forEach(r=>{if(!RTO[r.id])return;
rtg.addLayer(L.polyline(r.g,{color:'#fff',weight:7,opacity:.85,interactive:false,lineJoin:'round'}));
const bp=L.polyline(r.g,{color:r.c,weight:3.5,opacity:.85,lineJoin:'round'}).bindTooltip(esc(r.n)+' · '+r.km+'km · 약 '+r.min+'분 (도로 기준)',{sticky:true});bp.on('mouseover',()=>{bp.setStyle({weight:7,opacity:1});bp.bringToFront()}).on('mouseout',()=>bp.setStyle({weight:3.5,opacity:.85}));rtg.addLayer(bp);
r.st.forEach((p,i)=>{if(p.id)return;const m=L.circleMarker([p.lat,p.lng],{radius:7,color:'#fff',weight:2,fillColor:r.c,fillOpacity:p.ap?.55:1,dashArray:p.ap?'3 2':null});
m.bindPopup('<b style="font-size:15px">'+esc(p.n)+'</b><div>'+esc(r.n)+' · '+(i+1)+'번째 정류장</div><div>탑승 '+p.t+' · '+esc(p.p)+'</div>'+(p.ap?'<div style="color:var(--mute)">대략 위치 (단지 좌표 미확인)</div>':'')+'<div class="lk"><a href="'+gm(p.lat,p.lng)+'" target="_blank" rel="noopener">구글 지도</a><a href="'+gd(p.lat,p.lng)+'" target="_blank" rel="noopener">JIKS 경로</a></div>',{maxWidth:340,maxHeight:430});
if(lb)m.bindTooltip(esc(p.n)+' '+p.t,{permanent:true,direction:'right',offset:[8,0],className:'rn'});
rtg.addLayer(m)})})}
function buildRt(){$('rtlist').innerHTML=BUSR.map(r=>'<div class="rtl"><label><input type="checkbox" data-br="'+r.id+'"'+(RTO[r.id]?' checked':'')+'><span class="sw2" style="background:'+r.c+'"></span>'+esc(r.n)+'</label><small>'+r.st[0].t+'~'+r.st[r.st.length-1].t+' · '+r.km+'km</small></div>').join('')}
buildRt();
$('rtlist').addEventListener('change',e=>{const t=e.target;if(t.dataset.br){RTO[t.dataset.br]=t.checked;drawRt()}});
$('rtlab').addEventListener('change',drawRt);
$('rtall').onclick=()=>{BUSR.forEach(r=>RTO[r.id]=true);buildRt();drawRt()};$('rtnone').onclick=()=>{BUSR.forEach(r=>RTO[r.id]=false);buildRt();drawRt()};
