// 초기화
document.querySelectorAll('[data-cost]').forEach(i=>{i.value=CP[i.dataset.cost]});
$('app').addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.cost){CP[t.dataset.cost]=Math.max(0,+t.value||0);try{localStorage.setItem('jiks_cost',JSON.stringify(CP))}catch(x){}favPanel();e.stopPropagation();return}if(t.dataset&&t.dataset.br!==undefined||t.id==='rtlab')e.stopPropagation()},true);
document.addEventListener('click',e=>{const sl=e.target.closest('[data-fl]');if(sl){toggleFl(sl.dataset.fl);return}if(e.target.closest('#fxr'))fxLoad(true)});
initKel();buildLg();initMap();fitAll();all();ttb();drawTr();loadTr(false);map.on('zoomend',drawRt);drawRt();favPanel();fxLoad(false);lvUi();lvLoad(false);

addEventListener('resize',()=>{if(map)map.invalidateSize()});
addEventListener('load',()=>{if(map)map.invalidateSize()});

// 주소(#/...)에 맞춰 화면을 연다
addEventListener('hashchange',route);route();
