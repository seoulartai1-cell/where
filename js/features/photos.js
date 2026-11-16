// 사진 표시 도우미: 단지 대표 사진, 매물 썸네일, 팝업 갤러리
// 사진 표시 도우미 (사진이 안 뜨면 링크째 숨김)
const phImg=(u,c)=>'<img class="'+c+'" src="'+u+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="(this.closest(\'a.ph\')||this).remove()">';
const phLink=(u,c,href)=>'<a class="ph" href="'+(href||u)+'" target="_blank" rel="noopener">'+phImg(u,c)+'</a>';
const phU=l=>PHU[l[0]]||l.ph||null;
const phOf=(r,l)=>phU(l)||(PHB[r.id]||[])[0]||null;
const phCover=r=>(PHB[r.id]||[])[0]||r.ls.map(phU).find(Boolean)||null;
function phGal(r){const a=[];(PHB[r.id]||[]).forEach(u=>a.push([u,u]));r.ls.forEach(l=>{if(!l.dead&&phU(l))a.push([phU(l),l[3]])});
const s=new Set();const b=a.filter(x=>!s.has(x[0])&&s.add(x[0]));
return b.length?'<div class="gal">'+b.map(x=>phLink(x[0],'gi',x[1])).join('')+'</div>':'<div class="sub">사진 못 찾음</div>'}
