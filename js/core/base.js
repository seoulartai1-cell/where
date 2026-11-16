// 공통 도우미·기준점(JIKS)·MRT 거리 필터용 역
const $=i=>document.getElementById(i);
const hav=(a,b,c,d)=>{const t=Math.PI/180,x=(c-a)*t,y=(d-b)*t,q=Math.sin(x/2)**2+Math.cos(a*t)*Math.cos(c*t)*Math.sin(y/2)**2;return 12742*Math.asin(Math.sqrt(q))};
const JK={n:'Jakarta International Korean School (JIKS)',lat:-6.316718,lng:106.8925189,pid:'ChIJRSCSj0DtaS4RMkHZg6CdzYA'};
const gm=(lat,lng)=>'https://www.google.com/maps/search/?api=1&query='+lat+','+lng;
const gd=(lat,lng)=>'https://www.google.com/maps/dir/?api=1&origin='+lat+','+lng+'&destination='+JK.lat+','+JK.lng+'&destination_place_id='+JK.pid;
const ST=[{n:'Lebak Bulus',lat:-6.289254,lng:106.774937},{n:'Fatmawati',lat:-6.292429,lng:106.792466},{n:'Cipete Raya',lat:-6.2774,lng:106.7975},{n:'Haji Nawi',lat:-6.2667982,lng:106.7973162},{n:'Blok A',lat:-6.2555837,lng:106.797134},{n:'Blok M BCA',lat:-6.2445265,lng:106.7982103}];
const KN={pd:{l:'빠델장',c:'#D85A30'},bl:{l:'발레학원',c:'#D4537E'},en:{l:'영어학원',c:'#378ADD'}};
