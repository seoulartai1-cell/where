// 단지 즐겨찾기·환율·매물 즐겨찾기·공과금
function ftog(id){
if(FV[id])delete FV[id];else FV[id]={s:'관심',n:''};
fsv();fupd(id)}
function fupd(id){
const mm=rm[id],open=mm&&mm.isPopupOpen&&mm.isPopupOpen();
if(fonly())render();else if(mm)mm.setIcon(rIcon(R.find(q=>q.id===id)));
lst();fpan();
if(open&&!fonly()){mm.closePopup();mm.openPopup()}}
function fpan(){
const ids=R.filter(r=>FV[r.id]),n=ids.length,f=F();
let h='<div class="cd fc"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div style="font-size:15px;font-weight:500"><span style="color:#E0A800">★</span> 즐겨찾기 '+n+'곳</div><div class="fx" style="margin:0"><label class="ch" style="margin:0"><input type="checkbox" id="fo"'+(fonly()?' checked':'')+'> 즐겨찾기만 보기</label><button class="sm" id="fexp" title="단지·매물 즐겨찾기, 메모, 생활 조건, 설비 기록, 공과금 단가">전체 백업</button><button class="sm" id="fimb">백업 가져오기</button><button class="sm" id="fclr">전체 해제</button></div></div>';
if(!n)h+='<div style="font-size:13px;color:var(--text-secondary);margin-top:8px">지도 마커 팝업이나 "찾기" 목록의 ☆ 버튼을 누르면 여기서 상태와 메모를 관리합니다. 저장은 이 브라우저에만 되며, 다른 기기로 옮길 때는 전체 백업·백업 가져오기를 쓰세요.</div>';
else{ids.sort((a,b)=>STS.indexOf(FV[a.id].s)-STS.indexOf(FV[b.id].s)||a.i-b.i);
h+=ids.map(r=>{const v=FV[r.id],l=lo(r,f);return '<div style="border-top:0.5px solid var(--border);margin-top:10px;padding-top:10px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"><div style="display:flex;align-items:center;gap:8px"><span class="nb">'+r.i+'</span><b style="font-weight:500">'+esc(r.nm)+'</b><span class="bd'+fsc(v.s)+'">'+esc(v.s)+'</span>'+(pass[r.id]?'':'<span class="bd un">현재 조건 제외</span>')+'</div><div class="fx" style="margin:0"><button class="sm" data-go="'+r.id+'">지도에서 보기</button>'+fbtn(r.id)+'</div></div><div style="font-size:13px;color:var(--text-secondary);margin:4px 0">'+esc(r.z)+' · '+esc(r.pt)+' · 버스 '+r.b[0]+' · 최저 '+fm(l)+' · JIKS '+fd1(r.jd)+'</div>'+links(r)+fform(r.id)+'</div>'}).join('')}
h+='</div>';$('fvp').innerHTML=h;mcnt()}
function mcnt(){const e=$('mcnt');if(e)e.textContent=(Object.keys(FV).length+FL.size)||''}
// 전체 백업: 이 앱이 저장하는 사용자 데이터 키를 한 파일로 내보내고 가져온다
const BK=['jiks-fav-v1','jiks_fl','jiks_cost','where.ns','where.ck'];
function fexp(){
const data={};BK.forEach(k=>{const v=localStorage.getItem(k);if(v!==null)data[k]=v});
const b=new Blob([JSON.stringify({v:2,app:'where',saved:new Date().toISOString(),data},null,1)],{type:'application/json'});
const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='jiks-backup-'+todayL()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function fimp(file){
const rd=new FileReader();rd.onload=()=>{try{const o=JSON.parse(rd.result);
if(o&&o.v===2&&o.data){let c=0;BK.forEach(k=>{if(typeof o.data[k]==='string'){JSON.parse(o.data[k]);localStorage.setItem(k,o.data[k]);c++}});alert('백업 '+c+'개 항목을 가져왔습니다. 화면을 다시 엽니다.');location.reload();return}
const src=o.fav||o;let c=0;
Object.keys(src).forEach(k=>{if(R.some(r=>String(r.id)===k)){const v=src[k]||{};FV[k]={s:STS.includes(v.s)?v.s:'관심',n:typeof v.n==='string'?v.n:''};c++}});
fsv();all();alert('즐겨찾기 '+c+'곳을 가져왔습니다.')}catch(e){alert('가져오지 못했습니다. 이 앱에서 내보낸 JSON 파일인지 확인하세요.')}};rd.readAsText(file)}
// 환율·매물 즐겨찾기·공과금 추정
const FXF={v:0.073332,d:'2026-11-16'};
let FX={v:FXF.v,d:FXF.d,live:false};
let CP={ipl:25000,kwh:1700};try{Object.assign(CP,JSON.parse(localStorage.getItem('jiks_cost')||'{}'))}catch(e){}
const FSEED=['KMVA071','KMVA076','AREUM','HTPC119','HTPC045'];
// 매물 키: 단지id:코드:설명·URL 해시. 순서가 바뀌거나 새 매물이 붙어도 유지된다
const hs=t=>{let h=0;for(const c of String(t))h=(h*31+c.charCodeAt(0))|0;return (h>>>0).toString(36)};
const lk=(r,l)=>l.k||(l.k=r.id+':'+l[0]+':'+hs(l[1]+'|'+l[3]));
const fkey=(r,i)=>lk(r,r.ls[i]);
let FL=new Set();let flInit=false;
try{const v=localStorage.getItem('jiks_fl');if(v!==null){FL=new Set(JSON.parse(v));flInit=true}}catch(e){}
// 이전 키(단지id:코드:순번) 변환
{let mv=false;[...FL].forEach(k=>{const m=/^([^:]+):(.+):(\d+)$/.exec(k),r=m&&R.find(x=>x.id===m[1]),l=r&&r.ls[+m[3]];if(l&&l[0]===m[2]){FL.delete(k);FL.add(lk(r,l));mv=true}});if(mv)try{localStorage.setItem('jiks_fl',JSON.stringify([...FL]))}catch(e){}}
if(!flInit)R.forEach(r=>r.ls.forEach((l,i)=>{if(FSEED.includes(l[0]))FL.add(fkey(r,i))}));
const flsv=()=>{try{localStorage.setItem('jiks_fl',JSON.stringify([...FL]))}catch(e){}};
const fw=p=>p==null?'미확인':(Math.round(p*1e6*FX.v/1000)/10).toLocaleString('ko-KR')+'만원';
const area=l=>{const m=/(\d+(?:\.\d+)?)㎡/.exec(l[1]);return m?+m[1]:null};
function est(l){const a=area(l);if(a==null)return null;const ipl=l[0]==='AREUM'?0:CP.ipl*a/1e6;const kwh=Math.round(a*5.2);const el=kwh*CP.kwh/1e6;const w=(100000+a*1500)/1e6;const u=ipl+el+w;return{a,ipl,kwh,el,w,u,t:l[2]==null?null:l[2]+u}}
const todayL=()=>new Date().toLocaleDateString('sv');
function fxUi(){$('fxl').textContent='1,000,000 Rp = '+Math.round(FX.v*1e6).toLocaleString('ko-KR')+'원';
$('fxs').textContent=FX.live?'기준일 '+FX.d+' · 접속 시 하루 1회 자동 갱신':'자동 조회 실패 · 저장된 '+FX.d+' 환율 사용 중';
favPanel();lst()}
async function fxLoad(force){let c=null;try{c=JSON.parse(localStorage.getItem('jiks_fx')||'null')}catch(e){}
if(c&&!force&&c.on===todayL()){FX={v:c.v,d:c.d,live:true};fxUi();return}
try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),6000);const res=await fetch('https://open.er-api.com/v6/latest/IDR',{signal:ctl.signal});clearTimeout(t);const j=await res.json();const v=j&&j.rates&&j.rates.KRW;if(!(v>0))throw new Error('rate');
const d=new Date(j.time_last_update_unix*1000).toISOString().slice(0,10);FX={v,d,live:true};try{localStorage.setItem('jiks_fx',JSON.stringify({v,d,on:todayL()}))}catch(e){}}
catch(e){FX=c?{v:c.v,d:c.d,live:false}:{v:FXF.v,d:FXF.d,live:false}}
fxUi()}
function favPanel(){const a=[];R.forEach(r=>r.ls.forEach((l,i)=>{const k=fkey(r,i);if(FL.has(k))a.push({r,l,k,e:est(l)})}));
a.sort((x,y)=>(x.e&&x.e.t!=null?x.e.t:999)-(y.e&&y.e.t!=null?y.e.t:999));
$('fpl').innerHTML=a.length?a.map(x=>{const e=x.e,l=x.l;
return '<div class="cd fv"><div class="hd"><div class="t"><b>'+x.r.sn+' · '+l[0]+'</b></div><div style="display:flex;gap:4px;flex:none"><button class="sm" data-go="'+x.r.id+'">지도</button><button class="st on" data-fl="'+x.k+'" aria-label="즐겨찾기 해제">★</button></div></div><div class="sub">'+esc(l[1])+lvBadge(l)+'</div>'+(phOf(x.r,l)?phLink(phOf(x.r,l),'fi',l[3]):'')
+'<div class="cg"><div><small>월세</small><b>'+(l[2]==null?'미표시':fw(l[2]))+'</b><small>'+fm(l[2])+'</small></div><div><small>공과금 추정</small><b>'+(e?fw(e.u):'면적 미확인')+'</b></div><div><small>월 총액</small><b>'+(e&&e.t!=null?fw(e.t):'월세 확인 필요')+'</b></div></div>'
+(e?'<div class="sub" style="margin:0 0 4px">관리비 '+(l[0]==='AREUM'?'무료 안내':fw(e.ipl))+' · 전기 '+e.kwh+'kWh '+fw(e.el)+' · 물 '+fw(e.w)+'</div>':'')
+'<div class="lk"><a href="'+l[3]+'" target="_blank" rel="noopener">매물 페이지</a></div></div>'}).join(''):'<div class="sub">지도 팝업의 매물 옆 ☆를 눌러 추가하세요.</div>'}
function toggleFl(k){FL.has(k)?FL.delete(k):FL.add(k);flsv();favPanel();mcnt();document.querySelectorAll('[data-fl="'+k+'"]').forEach(b=>{b.classList.toggle('on',FL.has(k));b.textContent=FL.has(k)?'★':'☆'})}
