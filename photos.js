// 매물 사진 (각 부동산 사이트 이미지 주소, 2026-11-16 수집)
// PHB: 단지 사진 [단지 id] → [주소...]. PHU: 개별 매물 사진 [매물 코드] → 주소.
// 사이트에서 매물이 내려가면 사진이 안 뜰 수 있으며, 그때는 자동으로 숨긴다.
const CF='https://d2jgpj59n9tcev.cloudfront.net/';
const TV='https://cdn.travelio.id/building/';
const PHB={
kv:[CF+'apartment/1/kemang-village-thumb-JD2UpOzW54NUQsm9aDl8WvZhXDmiIZgrtJKtvD2a.png'],
kj:[CF+'apartment/gallery/apartment/lobby5a9936f2a971f.jpg'],
es:[TV+'524e5-595f50516f619522774e9259/essence-dharmawangsa-kebayoran_l.jpg',TV+'a725c-595f50516f619522774e9259/essence-dharmawangsa-kebayoran_l.jpg'],
hp:[CF+'apartment/1/hamptons-park-thumb-J62qLw1kOzqlWsGwo83IXgLRNsgZf6lT4vwtOVqG.png'],
pa:[CF+'apartment/gallery/apartment/apartemen-parama5d2d80a839c7a.jpg',TV+'e77a6-5d15b2469e002a3651b62b18/apartemen-parama_l.jpg'],
gv:[TV+'8a367-5d48e7b20f67d9795b1f754f/nuansa-hijau-apartment-green-view_l.jpeg',TV+'05ec5-5d48e7b20f67d9795b1f754f/nuansa-hijau-apartment-green-view_l.JPG'],
pi:[TV+'fb4c4-5c402b345327db0f96612baf/pondok-indah-residence-apartment_l.jpg',TV+'57556-5c402b345327db0f96612baf/pondok-indah-residence-apartment_l.jpg'],
gf:[TV+'68db8-63364f249b8c8706057fc854/apartemen-golfhill-terraces-pondok-indah_l.jpeg',TV+'21e6e-63364f249b8c8706057fc854/apartemen-golfhill-terraces-pondok-indah_l.jpg'],
pg2:[CF+'apartment/gallery/apartment/swimming-pool58d1f39b9381c.jpg'],
op:[CF+'apartment/1/building-thumb-6acf3de624f71.jpg'],
pv:[CF+'apartment/1/building-thumb-6acf3ea413f9f.jpg'],
pg:[CF+'apartment/gallery/apartment/pakubuwono-signature5ddb7432caf27.jpg'],
pr:[CF+'apartment/0/building-thumb-6acf3e7f01645.jpg'],
bt:[CF+'unit/71612/bedroom-1-thumb-small-6acf3e1d152fc.jpg'],
sp:[CF+'apartment/1/building-thumb-6acf3d0b53ecc.jpg']
};
const PHU={
KMVA071:CF+'unit/30953/bedroom-thumb-hmGK8XTm0NuuIAXLMIYOXNvtzAVbgJ93GcRJaydy.png',
KMVA076:CF+'unit/40344/bedroom-thumb-QRCIVbdQkgz0PI6qdCvu52bLQgFHH9gYLOSm2jdu.png',
HTPC099:CF+'unit/28900/bedroom-1-thumb-6ae9978a59533.jpg',
HTPC134:CF+'unit/67963/bedroom-1-thumb-6a9504e76d72f.jpg',
HTPC132:CF+'unit/66096/bedroom-1-thumb-small-6a7ade856f90b.jpg',
HTPC087:CF+'unit/21021/bedroom-1-thumb-q6GMUdqzMrcfolHclq7rVIXfeBMmwK4eBpQgnlpV.jpg',
HTPD056:CF+'unit/69200/bedroom-1-thumb-6ab34f04dc1bd.jpg',
HTPD057:CF+'unit/71247/bedroom-1-thumb-small-6af197c61bf33.jpg',
HTPC119:CF+'unit/41711/bedroom-1-thumb-small-oRgVbOPieZoEKWwrFSQwWXK78cSvsq6U9a7sZJzO.png',
HTPC086:CF+'unit/20436/living-room-thumb-QngwwDAWm69aRD4XlEZFcaPGCTueutc1YzCvGotm.jpg',
HTPD008:CF+'unit/1637/bedroom-2-thumb-6af42b89b802b.jpg',
HTPC110:CF+'unit/37303/bedroom-1-thumb-6adb153fcde89.jpg',
HTPC045:CF+'unit/6789/bedroom-1-thumb-6a7edfb3dfeb2.jpg',
PMCD008:CF+'unit/33678/bedroom-1-thumb-RzsxgtrbX7yRUWqfI8hnQs5apK6RhJIOplYrntzP.png',
PMCD003:CF+'unit-move/bedroom-15d3826e6364fa_thumb.jpg',
POND004:CF+'unit-move/bedroom-15da69575c87eb_thumb.jpg',
GHTB025:CF+'unit/50094/bedroom-thumb-Pz1leMpscKYLMkyCEbKOmZKXf8pOK3EsEud2NvbZ.jpg',
GHTB029:CF+'unit/67081/bedroom-thumb-6a6c3def10c50.jpg',
GHTB024:CF+'unit/45187/bedroom-thumb-Dl6Y0h8k5XZ6lNxSOb2OFgisfbp1NCD4j6gKKKZT.png',
ASIB007:CF+'unit/38517/bedroom-thumb-wA3yYWqvekwJuSRp4ZyVfbh6aRnUDsEh7XNOBc5x.png',
ASID009:CF+'unit/500/bedroom-thumb-aEQMBWE3Xy6Y661MKJzZZjlziEHHJN3t54BYps9x.png',
ASID010:CF+'unit/55062/bedroom-1-thumb-hsL9NTmYUvz1hdEItwGZAto41tJkpOJDmjYP7n57.jpg'
};
// 사진 표시 도우미 (사진이 안 뜨면 링크째 숨김)
const phImg=(u,c)=>'<img class="'+c+'" src="'+u+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="(this.closest(\'a.ph\')||this).remove()">';
const phLink=(u,c,href)=>'<a class="ph" href="'+(href||u)+'" target="_blank" rel="noopener">'+phImg(u,c)+'</a>';
const phU=l=>PHU[l[0]]||l.ph||null;
const phOf=(r,l)=>phU(l)||(PHB[r.id]||[])[0]||null;
const phCover=r=>(PHB[r.id]||[])[0]||r.ls.map(phU).find(Boolean)||null;
function phGal(r){const a=[];(PHB[r.id]||[]).forEach(u=>a.push([u,u]));r.ls.forEach(l=>{if(!l.dead&&phU(l))a.push([phU(l),l[3]])});
const s=new Set();const b=a.filter(x=>!s.has(x[0])&&s.add(x[0]));
return b.length?'<div class="gal">'+b.map(x=>phLink(x[0],'gi',x[1])).join('')+'</div>':'<div class="sub">사진 못 찾음</div>'}
