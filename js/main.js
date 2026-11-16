// 초기화
document.querySelectorAll('[data-cost]').forEach(i=>{i.value=CP[i.dataset.cost]});
$('app').addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.cost){CP[t.dataset.cost]=Math.max(0,+t.value||0);try{localStorage.setItem('jiks_cost',JSON.stringify(CP))}catch(x){}favPanel();e.stopPropagation();return}if(t.dataset&&t.dataset.br!==undefined||t.id==='rtlab')e.stopPropagation()},true);
document.addEventListener('click',e=>{const sl=e.target.closest('[data-fl]');if(sl){toggleFl(sl.dataset.fl);return}if(e.target.closest('#fxr'))fxLoad(true)});
initKel();buildLg();initMap();fitAll();all();ttb();drawTr();loadTr(false);map.on('zoomend',drawRt);drawRt();favPanel();fxLoad(false);lvUi();lvLoad(false);

// 화면 전환: PC는 사이드바 탭만, 모바일은 "지도"와 사이드바 탭을 한 줄에서 고른다
const mob=()=>matchMedia('(max-width:860px)').matches;
function tabUi(){const v=document.body.dataset.v,p=document.body.dataset.p,m=mob();document.querySelectorAll('#ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v?m&&v==='map':(!m||v!=='map')&&b.dataset.p===p))}
function setView(v){document.body.dataset.v=v;tabUi();if(map)setTimeout(()=>map.invalidateSize(),60)}
function openPanel(p){document.body.dataset.p=p;$('side').scrollTop=0;setView('list')}
$('ptabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.v)setView(b.dataset.v);else openPanel(b.dataset.p)});
tabUi();
addEventListener('resize',()=>{if(map)map.invalidateSize()});
addEventListener('load',()=>{if(map)map.invalidateSize()});
