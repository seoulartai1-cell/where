// 조건 읽기·통과 판정
function F(){return{b:+$('budget').value,ty:[...document.querySelectorAll('[data-t]:checked')].map(x=>x.dataset.t),fc:[...document.querySelectorAll('[data-f]:checked')].map(x=>x.dataset.f),mrt:+$('mrt').value,pd:+$('pd').value,bl:+$('bl').value,en:+$('en').value,bus:+$('bus').value,unk:$('unk').checked,q:$('q').value.trim().toLowerCase()}}
function lay(k){return document.querySelector('[data-l="'+k+'"]').checked}
function ok(r,f){
if(f.q&&!(r.nm+' '+r.z+' '+r.sn).toLowerCase().includes(f.q))return false;
const keys=f.ty.length?f.ty:['S','1','2','3'];
const P=ep(r),known=Object.values(P).some(v=>v!=null);
if(!known){if(!f.unk)return false}else{const m=keys.map(k=>P[k]).filter(v=>v!=null);if(!m.length||Math.min(...m)>f.b)return false}
for(const c of f.fc){
if(c==='green'){if(r.gr!=='golf'&&r.gr!=='garden')return false}
else if(c==='t6'){if(r.t6!==1)return false}
else if(c==='tod'){if(!r.tod||r.tod[2]!==1)return false}
else if(c==='coach'){const x=r.nbc[0];if(f.pd<5?x.d>f.pd:false)return false}
else if(r.f[c]!==1)return false}
if(f.mrt<5&&r.mrt[0].d>f.mrt)return false;
if(f.pd<5&&r.nb.pd[0].d>f.pd)return false;
if(f.bl<5&&r.nb.bl[0].d>f.bl)return false;
if(f.en<5&&r.nb.en[0].d>f.en)return false;
if(r.nob){if(f.bus>0)return false}else if(tm(r.b[0])<300+f.bus)return false;
if(r.nd){if(r.nd.bad)return false;if(r.nd.unk&&!$('nu').checked)return false}
return true}
function lo(r,f){const keys=f.ty.length?f.ty:['S','1','2','3'],P=ep(r);const m=keys.map(k=>P[k]).filter(v=>v!=null);return m.length?Math.min(...m):null}
function labels(){const f=F();$('bv').textContent=Math.round(f.b*100).toLocaleString('en-US')+'만 루피아 이하';$('mv').textContent=f.mrt>=5?'제한 없음':'≤ '+f.mrt.toFixed(1)+'km';$('pv').textContent=f.pd>=5?'제한 없음':'≤ '+f.pd.toFixed(1)+'km';$('blv').textContent=f.bl>=5?'제한 없음':'≤ '+f.bl.toFixed(1)+'km';$('env').textContent=f.en>=5?'제한 없음':'≤ '+f.en.toFixed(1)+'km';$('busv').textContent=f.bus===0?'제한 없음':(f.bus===60?'06:00 이후':'05:'+String(f.bus).padStart(2,'0')+' 이후');$('irv').textContent=$('ir').value+'m';const nv=Object.values(NS);$('ncnt').textContent=nv.length?'필수 '+nv.filter(v=>v===1).length+' · 선호 '+nv.filter(v=>v===2).length:''}

const mkIcon=(h,c,s)=>L.divIcon({html:h,className:c,iconSize:[s,s],iconAnchor:[s/2,s/2]});
const strip=h=>h.replace(/<button class="sm" id="px"[^>]*>닫기<\/button>/,'');
