// 화면 전환: 주소의 # 경로가 화면 상태를 정한다 (사이트 구조는 index.html 맨 위 주석)
//   #/find  #/mine  #/area   사이드바 패널 (PC는 지도와 함께, 모바일은 패널만)
//   #/map                    모바일 지도
//   #/guide  #/guide/check   계약 가이드
//   #/c/<단지 id>             단지로 이동
const mob=()=>matchMedia('(max-width:860px)').matches;
const PANELS=['find','mine','area'];
function tabUi(){const B=document.body,m=B.dataset.m,v=B.dataset.v,p=B.dataset.p,cur=m==='guide'?'guide':mob()&&v==='map'?'map':p;
document.querySelectorAll('#ptabs a').forEach(a=>a.classList.toggle('on',a.dataset.r===cur))}
function setView(v){document.body.dataset.v=v;tabUi();if(typeof map!=='undefined'&&map)setTimeout(()=>map.invalidateSize(),60)}
function route(){
const h=(location.hash||'').replace(/^#\/?/,'').split('/'),r=h[0]||'find',B=document.body;
if(r==='guide'){B.dataset.m='guide';guideShow(h[1]);document.title='계약 가이드 · JIKS 통학버스 주거지 찾기';tabUi();return}
B.dataset.m='app';document.title='JIKS 통학버스 주거지 찾기';
if(r==='c'&&R.some(x=>x.id===h[1])){if(!PANELS.includes(B.dataset.p))B.dataset.p='find';go(h[1]);return}
if(r==='map'){setView('map');return}
B.dataset.p=PANELS.includes(r)?r:'find';$('side').scrollTop=0;setView('list')}
// 같은 탭을 다시 눌러도(주소 그대로) 화면이 바뀌도록
$('ptabs').addEventListener('click',e=>{const a=e.target.closest('a');if(a&&a.getAttribute('href')===location.hash){e.preventDefault();route()}});
// 단지로 이동하면 주소를 #/c/<id>로 바꿔 공유할 수 있게 한다
{const go0=go;go=function(id){go0(id);try{history.replaceState(null,'','#/c/'+id)}catch(e){}}}
