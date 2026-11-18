// 통학버스 정류장 주변 매물
// data/nearby.json: scripts/update-nearby.mjs가 6시간마다 Jendela360 단지 좌표로 정류장 반경 안 단지·매물을 모으고,
// 자동 수집이 막힌 사이트(Rumah123·99.co 등)에서 손으로 찾은 매물(scripts/nearby-manual.json)을 합친다.
// 화면: "찾기" 탭의 "정류장 주변 매물" + 지도 표시. 예산·방 구성 조건을 같이 적용한다.
const NB_URL='data/nearby.json';
let NB=null,NBERR='',nbLayer=null;
const nbRoute=id=>(typeof BUSR!=='undefined'&&BUSR.find(b=>b.id===id))||{n:id,c:'#666'};
const nbTy={S:'스튜디오','1':'1BR','2':'2BR','3':'3BR+'};
const nbQ=s=>encodeURIComponent(s);
// 자동 수집이 막힌 사이트는 단지 이름으로 실시간 검색 링크를 준다
function nbLinks(n){const q=n.replace(/\b(apartment|apartemen|residence|residences)\b/gi,'').trim()||n;
return [['Rumah123','https://www.google.com/search?q='+nbQ('site:rumah123.com sewa apartemen "'+q+'"')],['99.co','https://www.google.com/search?q='+nbQ('site:99.co sewa apartemen "'+q+'"')],['Travelio','https://www.google.com/search?q='+nbQ('site:travelio.com sewa apartemen '+q)],['Mamikos','https://www.google.com/search?q='+nbQ('site:mamikos.com apartemen '+q)],['Pinhome','https://www.google.com/search?q='+nbQ('site:pinhome.id disewa apartemen '+q)],['OLX','https://www.google.com/search?q='+nbQ('site:olx.co.id disewakan apartemen '+q)]]
.map(x=>'<a class="sm lnk" target="_blank" rel="noopener" href="'+x[1]+'">'+x[0]+'</a>').join(' ')}
async function nbLoad(){try{const r=await fetch(NB_URL+'?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const j=await r.json();if(!NB||j.updated!==NB.updated){NB=j;nbInit()}NBERR=''}catch(e){NBERR=String(e.message||e)}nbRender()}
function nbInit(){const sel=$('nbrt');if(sel&&sel.options.length<2){(typeof BUSR!=='undefined'?BUSR:[]).forEach(b=>{const o=document.createElement('option');o.value=b.id;o.textContent=b.n;sel.appendChild(o)})}}
function nbOpts(){return{rad:+($('nbr')?$('nbr').value:1.2),rt:$('nbrt')?$('nbrt').value:'',bud:$('nbb')?$('nbb').checked:true,map:$('nbm')?$('nbm').checked:false,sort:$('nbs')?$('nbs').value:'km'}}
function nbItems(){if(!NB)return[];const o=nbOpts(),f=F(),ty=f.ty;
const okU=u=>(!o.bud||u.price==null||u.price<=f.b)&&(!ty.length||ty.includes(u.beds));
const a=(NB.near||[]).filter(c=>c.stop&&c.stop.km<=o.rad&&(!o.rt||c.stop.rt===o.rt)).map(c=>{const us=c.units.filter(okU);return Object.assign({},c,{us,min:us.filter(u=>u.price!=null).reduce((m,u)=>Math.min(m,u.price),1e9)})});
const man=(NB.manual||[]).filter(m=>m.stop&&m.stop.km<=o.rad&&(!o.rt||m.stop.rt===o.rt)&&okU(m));
man.forEach(m=>{const c=a.find(x=>x.slug===m.slug||x.n.toLowerCase()===String(m.complex||'').toLowerCase());if(c){(c.man=c.man||[]).push(m)}else{let g=a.find(x=>x.manualOnly&&x.n===m.complex);if(!g){g={n:m.complex,lat:m.lat,lng:m.lng,stop:m.stop,manualOnly:true,us:[],units:[],man:[],min:1e9,src:m.src};a.push(g)}g.man.push(m)}});
a.forEach(c=>{(c.man||[]).forEach(m=>{if(m.price!=null&&m.price<c.min)c.min=m.price})});
const shown=a.filter(c=>c.us.length||(c.man&&c.man.length));
shown.sort(o.sort==='price'?(x,y)=>x.min-y.min:(x,y)=>x.stop.km-y.stop.km);return{shown,all:a}}
// 정류장 주변 매물 즐겨찾기 키: nb:URL 해시. 즐겨찾기한 매물은 목록에서 빠져도 "내 후보"에 남도록 요약을 함께 저장
const NBM={};
function nbKey(c,x){const k='nb:'+hs(x.url);NBM[k]={t:x.src&&x.src!=='Jendela360'?(x.title||x.src).replace(/^Disewakan Apartemen\s*/i,'').slice(0,48):(x.code||x.title||''),d:(x.beds?nbTy[x.beds]:'')+(x.area?' '+x.area+'㎡':'')+(x.tower?' · '+x.tower:''),src:x.src||'Jendela360',u:x.url,p:x.price==null?null:x.price,img:x.img||'',c:c.n,a:x.area||null};return k}
function nbFav(k){const on=FL.has(k);return '<button class="st'+(on?' on':'')+'" data-fl="'+k+'" aria-label="매물 즐겨찾기">'+(on?'★':'☆')+'</button> '}
function nbUnit(u,c){const other=u.src&&u.src!=='Jendela360',k=nbKey(c,u);return '<div class="lr">'+nbFav(k)+(u.img?'<img class="lt" loading="lazy" src="'+u.img.replace(/"/g,'')+'" alt="">':'')+(other?'<span class="bd">'+esc(u.src)+'</span> ':'')+'<a href="'+u.url+'" target="_blank" rel="noopener"'+(other?' title="'+esc(u.title||'')+'"':'')+'>'+esc(other?(u.title||u.src).replace(/^Disewakan Apartemen\s*/i,'').slice(0,48):u.code)+'</a> '+(u.beds?nbTy[u.beds]:'')+(u.area?' '+u.area+'㎡':'')+(u.tower?' · '+esc(u.tower):'')+' <span class="bd ok">'+(u.price!=null?fm(u.price):u.usd?'USD '+u.usd:'가격 문의')+'</span>'+(u.price!=null?' <span class="bd">≈'+fw(u.price)+'</span>':'')+(u.yearly?' <span class="un">연 단위</span>':'')+(u.soon?' <span class="bd">곧 입주</span>':'')+lmeta(k)+memoH(k,false)+'</div>'}
function nbMan(m,c){const k=nbKey(c,m);return '<div class="lr">'+nbFav(k)+'<span class="bd">'+esc(m.src)+'</span> <a href="'+m.url+'" target="_blank" rel="noopener">'+esc(m.title)+'</a> <span class="bd ok">'+(m.price!=null?fm(m.price):'가격 문의')+'</span>'+(m.note?' <span class="un">'+esc(m.note)+'</span>':'')+(m.yearly?' <span class="un">연 단위</span>':'')+(m.seen?' <span class="un">'+esc(m.seen.slice(5).replace('-','/'))+' 확인</span>':'')+lmeta(k)+memoH(k,false)+'</div>'}
function nbCard(c,i){const rt=nbRoute(c.stop.rt),app=c.app&&R.find(r=>r.id===c.app);
return '<div class="cd nbc" data-nb="'+i+'"><div class="hd"><div class="t"><b style="font-weight:500">'+esc(c.n)+'</b>'+(app?' <span class="bd ok">조사 단지 '+app.i+'</span>':'')+'<div class="un"><span style="color:'+rt.c+'">●</span> '+esc(c.stop.n)+' 정류장 '+Math.round(c.stop.km*1000)+'m · '+esc(c.stop.t)+' 탑승 · '+esc(rt.n)+'</div></div><button class="sm" data-nbgo="'+i+'">지도</button></div>'
+(c.us.length?c.us.slice(0,8).map(u=>nbUnit(u,c)).join('')+(c.us.length>8?'<div class="un">외 '+(c.us.length-8)+'건</div>':''):'')+((c.man||[]).map(m=>nbMan(m,c)).join(''))
+'<div class="sub">'+(c.url?'<a href="'+c.url+'" target="_blank" rel="noopener">Jendela360 단지</a> · ':'')+(c.ph?'<a href="'+c.ph+'" target="_blank" rel="noopener">Pinhome 단지</a> · ':'')+'다른 사이트 실시간 검색</div><div class="fx">'+nbLinks(c.n)+'</div></div>'}
function nbRender(){const el=$('nbl');if(!el)return;
if(!NB){el.innerHTML='<div class="un">'+(NBERR?'정류장 주변 매물을 불러오지 못했습니다('+esc(NBERR)+').':'불러오는 중…')+'</div>';nbMap([]);return}
const {shown}=nbItems(),o=nbOpts(),f=F(),n=shown.reduce((a,c)=>a+c.us.length+(c.man?c.man.length:0),0);
if($('nbsum'))$('nbsum').textContent=shown.length+'단지 · '+n+'건';
el.innerHTML='<div class="cs">정류장 반경 '+(o.rad*1000)+'m 안 '+shown.length+'개 단지, 매물 '+n+'건'+(o.bud?' (월세 '+fm(f.b)+' 이하'+(f.ty.length?', '+f.ty.map(t=>nbTy[t]).join('·'):'')+')':'')+'. Jendela360·Pinhome은 6시간마다 자동 갱신('+ago(NB.updated)+'). Rumah123·99.co·Travelio는 자동 수집이 막혀 직접 찾은 매물(확인 날짜 표시)과 실시간 검색 링크를 붙였습니다.</div>'
+(shown.length?shown.map(nbCard).join(''):'<div class="un">조건에 맞는 매물이 없습니다. 반경이나 예산을 넓혀 보세요.</div>');
el._items=shown;nbMap(o.map?shown:[])}
function nbMap(items){if(typeof map==='undefined'||!map)return;if(!nbLayer)nbLayer=L.layerGroup().addTo(map);nbLayer.clearLayers();
items.forEach((c,i)=>{if(c.lat==null)return;const rt=nbRoute(c.stop.rt);const m=L.marker([c.lat,c.lng],{icon:L.divIcon({className:'',html:'<div class="nbm" style="border-color:'+rt.c+'">'+(c.min<1e9?Math.round(c.min*100)/100:'?')+'</div>',iconSize:[0,0]}),zIndexOffset:400});
m.bindPopup(()=>nbCard(c,i),{maxWidth:360,maxHeight:430});nbLayer.addLayer(m)})}
document.addEventListener('change',e=>{if(e.target.closest&&e.target.closest('#nbd')){nbRender();if(e.target.id==='nbm'&&e.target.checked&&nbLayer){const b=nbLayer.getLayers().map(m=>m.getLatLng());if(b.length)map.fitBounds(L.latLngBounds(b),{padding:[30,30],maxZoom:15})}}});
document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('[data-nbgo]');if(!g)return;const el=$('nbl'),c=el&&el._items&&el._items[+g.dataset.nbgo];if(!c||c.lat==null)return;
if(!$('nbm').checked){$('nbm').checked=true;nbRender()}setView('map');map.setView([c.lat,c.lng],16);const mk=nbLayer.getLayers().find(m=>{const p=m.getLatLng();return p.lat===c.lat&&p.lng===c.lng});if(mk)setTimeout(()=>mk.openPopup(),300)});
