// 단지 파생값·포맷·단지 즐겨찾기 상태
R.forEach((r,i)=>{r.i=i+1;r.jd=hav(r.lat,r.lng,JK.lat,JK.lng);r.mrt=ST.map(s=>({s,d:hav(r.lat,r.lng,s.lat,s.lng)})).sort((a,b)=>a.d-b.d);r.nb={};['pd','bl','en'].forEach(k=>{r.nb[k]=PO.filter(p=>p.k===k).map(p=>({p,d:hav(r.lat,r.lng,p.lat,p.lng)})).sort((a,b)=>a.d-b.d)});r.nbc=r.nb.pd.filter(x=>x.p.coach)});
const fm=p=>p==null?'미확인':Math.round(p*100).toLocaleString('en-US')+'만';
const fd=d=>d.toFixed(2)+'km';
const fd1=d=>d.toFixed(1)+'km';
const tm=t=>{const a=t.split(':');return +a[0]*60+ +a[1]};
const GRL={golf:'골프장 뷰',garden:'정원·녹지',city:'도시 뷰'};
const SMIN=12,SMAX=500;
let sel=null,HT=620,map,mk,ln,zg,ig,lg,trg,bsg,rtg,rm={},pass={};
const FK='jiks-fav-v1',STS=['관심','방문 예정','연락함','계약 가능','탈락'];
let FV={};
try{const o=JSON.parse(localStorage.getItem(FK)||'{}');if(o&&typeof o==='object')FV=o}catch(e){}
const fsv=()=>{try{localStorage.setItem(FK,JSON.stringify(FV))}catch(e){}};
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fonly=()=>$('fo')&&$('fo').checked;
const fsc=s=>s==='계약 가능'?' ok':s==='탈락'?' no':'';
const fbtn=id=>'<button class="fb'+(FV[id]?' on':'')+'" data-fv="'+id+'" title="즐겨찾기">'+(FV[id]?'★ 즐겨찾기됨':'☆ 즐겨찾기')+'</button>';
const fform=id=>{const v=FV[id];if(!v)return '';return '<div class="fx"><select data-fs="'+id+'" class="sm" style="height:30px">'+STS.map(x=>'<option'+(x===v.s?' selected':'')+'>'+x+'</option>').join('')+'</select></div><textarea class="fn" data-fn="'+id+'" placeholder="메모 (방문 후기, 연락처, 가격 등)" style="margin-top:6px">'+esc(v.n)+'</textarea>'};
const rIcon=r=>mkIcon('<div class="rm'+(pass[r.id]?' on':'')+(FV[r.id]?' fv':'')+'">'+r.i+'</div>','',26);
