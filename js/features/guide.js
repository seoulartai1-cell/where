// 계약 가이드: 선납금·전기 계산기, 확인 체크리스트(저장 키 id-housing-check-v1)
(function(){
function $(i){return document.getElementById(i)}
function rp(n){return 'Rp '+Math.round(n).toLocaleString('en-US')}
function jt(n){return (n/1e6).toLocaleString('ko-KR',{maximumFractionDigits:2})+'백만 Rp'}

/* 선납금 계산기 */
function calcRent(){
  var out=$('r-res'),annual=parseFloat($('r-rent').value)||0;
  if(!annual){out.textContent='연 임대료를 입력하면 계산한다.';return}
  annual*=1e6;
  var yrs=+$('r-years').value,comm=+$('r-comm').value/100,dm=+$('r-dep').value;
  var total=annual*yrs,fee=total*comm,dep=annual/12*dm,sum=total+fee+dep;
  var fx=parseFloat($('r-fx').value)||0;
  function krw(n){return fx?' (약 '+Math.round(n/1e6*fx).toLocaleString('ko-KR')+'원)':''}
  out.innerHTML='임대료 총액 '+jt(total)+krw(total)+
    '<br>중개 수수료 '+jt(fee)+krw(fee)+
    '<br>보증금 '+jt(dep)+krw(dep)+
    '<br>입주 전 필요 금액 <b>'+jt(sum)+'</b>'+krw(sum)+
    '<br><span class="k">보증금은 종료 때 돌려받는 돈이다. 순비용 '+jt(total+fee)+krw(total+fee)+'</span>';
}
['r-rent','r-years','r-comm','r-dep','r-fx'].forEach(function(i){$(i).addEventListener('input',calcRent);$(i).addEventListener('change',calcRent)});

/* 전기 계산기 */
function calcElec(){
  var out=$('e-res'),t=+$('e-tar').value,p=+$('e-ppj').value;
  var kwh=parseFloat($('e-kwh').value)||0,tok=parseFloat($('e-tok').value)||0,h=[];
  if(!kwh&&!tok){out.textContent='사용량 또는 토큰 금액을 입력하면 계산한다.';return}
  if(kwh){h.push('월 '+kwh+'kWh 예상 전기료 약 <b>'+rp(kwh*t*(1+p))+'</b>')}
  if(tok){var net=Math.max(tok-2500,0);h.push('토큰 '+rp(tok)+' → 약 <b>'+(net/(1+p)/t).toFixed(1)+' kWh</b> (수수료 2,500 Rp 차감)')}
  out.innerHTML=h.join('<br>')+'<br><span class="k">추정치다. 실제 PPJ와 수수료는 지역·구매 채널에 따라 다르다.</span>';
}
['e-tar','e-ppj','e-kwh','e-tok'].forEach(function(i){$(i).addEventListener('input',calcElec);$(i).addEventListener('change',calcElec)});

/* 체크리스트 */
var DATA=[
 {t:'계약 전 · 집 보기와 서류',i:[
  ['중개인 확인','소속 회사, 연락처, 과거 거래. 임대료를 중개인이 받지 않는지 확인'],
  ['소유자 확인','소유권 증서(SHM/HGB) 사본의 이름과 임대인 신분증 대조'],
  ['건축 허가(PBG/IMB) 확인','주거 용도로 합법인지'],
  ['토지건물세(PBB) 영수증','최근 연도 납부 확인'],
  ['전기·수도 영수증','미납 없음. 전기 용량(VA) 확인'],
  ['대리인이면 위임장','임대인과 직접 통화로 확인'],
  ['외국인 서류 준비','여권, KITAS/KITAP 사본'],
  ['하자 점검 후 사진','누수, 곰팡이, 온수기, 에어컨, 수압, 배수, 창문, 방충'],
  ['침수·정전 이력 질문','이웃이나 관리사무소에 우기 상황 확인'],
  ['포함 가구·가전 목록','목록과 상태 사진'],
  ['통학·생활 동선 확인','통학버스 노선, 학교까지 시간, 마트·병원'],
  ['인터넷 망 확인','건물에 들어온 업체, 설치 가능 속도']
 ]},
 {t:'계약 당일',i:[
  ['인도네시아어 계약서 확인','이중언어본이면 불일치 시 우선 언어 확인'],
  ['임대료·환율 기준일','USD 표기면 환율 기준일을 계약서에 명시'],
  ['선납 범위와 일정','기간 전체인지, 분할인지'],
  ['보증금 조건','금액, 공제 조건, 반환 기한'],
  ['중도 해지·전대 조항','조기 귀국 시 환불 또는 전대 승인'],
  ['갱신 조건','통보 시점(30~60일), 인상률'],
  ['비용 부담 주체','IPL, 싱킹 펀드, 주차, 수리, 세금'],
  ['중개 수수료 합의','누가 내는지, 금액, 영수증'],
  ['임대료는 소유자 계좌로','중개인 개인 계좌 금지. 송금 내역 보관'],
  ['계약서 원본과 영수증','서명·날인 확인, 사본 보관']
 ]},
 {t:'입주 · 인도(Serah Terima)',i:[
  ['인수 체크리스트 서명','방별 상태, 가구·가전, 열쇠 수량'],
  ['사진·영상 기록','하자, 벽·바닥, 가전. 날짜 포함'],
  ['미터 사진','전기(토큰 잔량), 수도, 가스'],
  ['열쇠·카드키 수령','비밀번호 변경'],
  ['RT/RW 신고','동네 단위 입주 신고'],
  ['관리사무소 입주 신고','차량 등록, 출입 카드, 이용 규칙'],
  ['임대인 연락처와 수리 연락망','긴급 수리 담당자']
 ]},
 {t:'입주 후 · 전기·수도·인터넷',i:[
  ['PLN Mobile 앱 등록','미터 번호 등록, 잔량·청구 확인'],
  ['토큰 충전 방식 확인','충전 채널, 수수료, 잔량 경고'],
  ['수도 공급 방식','수도회사 또는 지하수, 요금 정산 방법'],
  ['가스 공급 방식','LPG 통 또는 배관'],
  ['인터넷 신청','업체 비교, 설치비, 약정, 모뎀 대여'],
  ['IPL·싱킹 펀드 청구 확인','첫 청구서 금액이 계약과 같은지'],
  ['쓰레기·분리수거 규칙','관리사무소 안내']
 ]},
 {t:'퇴거 · 종료',i:[
  ['종료·갱신 의사 통보','30~60일 전, 서면'],
  ['갱신이면 인상률 협상','5~15% 사례. 계약서에 명시'],
  ['퇴거 전 상태 점검','입주 사진과 비교해 수리 항목 정리'],
  ['공과금·관리비 정산','전기, 수도, IPL, 인터넷 해지·모뎀 반납'],
  ['열쇠 반납과 인도 서명',''],
  ['보증금 반환 확인','반환 기한과 공제 항목 서면 확인']
 ]}
];
var KEY='id-housing-check-v1',state={};
try{state=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){state={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
var root=$('g-groups'),total=0;
DATA.forEach(function(g,gi){
  var box=document.createElement('div');box.className='grp';
  var h=document.createElement('h2');h.innerHTML='<span></span><small></small>';h.querySelector('span').textContent=g.t;box.appendChild(h);
  g.i.forEach(function(it,ii){
    total++;var id=gi+'-'+ii;
    var l=document.createElement('label');l.className='item';
    var cb=document.createElement('input');cb.type='checkbox';cb.checked=!!state[id];
    var d=document.createElement('div');
    d.innerHTML='<div class="t"></div>'+(it[1]?'<div class="d"></div>':'');
    d.querySelector('.t').textContent=it[0];
    if(it[1])d.querySelector('.d').textContent=it[1];
    l.appendChild(cb);l.appendChild(d);box.appendChild(l);
    l.classList.toggle('done',cb.checked);
    cb.addEventListener('change',function(){
      if(cb.checked)state[id]=1;else delete state[id];
      l.classList.toggle('done',cb.checked);save();update();
    });
  });
  root.appendChild(box);
});
function update(){
  var done=0;
  document.querySelectorAll('#gv .grp').forEach(function(box){
    var all=box.querySelectorAll('input'),n=0;
    all.forEach(function(c){if(c.checked)n++});
    done+=n;box.querySelector('small').textContent=n+' / '+all.length;
  });
  var p=total?Math.round(done/total*100):0;
  $('g-pb').style.width=p+'%';$('g-pt').textContent=done+' / '+total;$('g-pp').textContent=p+'%';
}
$('g-reset').addEventListener('click',function(){
  state={};save();
  document.querySelectorAll('#gv .item').forEach(function(l){l.classList.remove('done');l.querySelector('input').checked=false});
  update();
});
update();
})();
// 가이드 안 하위 화면 전환(라우터가 호출)
function guideShow(p){p=p==='check'?'check':'guide';document.getElementById('g-guide').classList.toggle('on',p==='guide');document.getElementById('g-check').classList.toggle('on',p==='check');document.querySelectorAll('#gv .gnav a').forEach(a=>a.classList.toggle('on',a.dataset.gp===p));document.getElementById('gv').scrollTop=0}
