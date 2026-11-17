// 지역 데이터: 대략 원(ZN)·동네(JD)·통칭(TG)·특징 분류. 구·동 설명은 districts.js
const ZN=[
{id:'kem',n:'끄망 Kemang',z:'끄망',lat:-6.2605,lng:106.8125,r:1250,c:'#E67E22',kr:'이태원·경리단길',d:'외국인·카페·식당 밀집 지역. Lippo Mall Kemang 중심으로 상권이 넓고 한식당도 많음.',pt:['단지 몰 직결 가능, 발레·빠델 시설 가까움','주말·퇴근 시간 정체 심하고 우기 침수 이력','MRT에서 멀어 차량 이동 중심']},
{id:'cil',n:'찔란닥 Cilandak · Terogong',z:'Cilandak · Terogong',lat:-6.2870,lng:106.7985,r:1500,c:'#16A085',kr:'방배동·사당동 주택가',d:'조용한 주거지. 빠델 코트가 모여 있고 Fatmawati·Cipete Raya·Lebak Bulus MRT가 가까움.',pt:['월세가 비교적 낮은 중저가 단지 많음','단지 내 몰은 드물고 Cilandak Town Square, PIM 이용','초록 조망 단지(골프장·정원) 있음']},
{id:'pi',n:'폰독 인다 Pondok Indah',z:'Pondok Indah',lat:-6.2700,lng:106.7830,r:1700,c:'#2980B9',kr:'분당·판교',d:'고급 주거 지역. Pondok Indah Mall 1·2·3과 골프장, 국제학교·학원이 많음.',pt:['몰 직결 단지, 영어학원 밀집','골프 뷰·녹지 풍부','월세는 2BR 이상에서 예산 초과 단지 많음']},
{id:'gan',n:'간다리아 Gandaria',z:'Gandaria',lat:-6.2450,lng:106.7870,r:950,c:'#8E44AD',kr:'영등포 타임스퀘어 일대',d:'Gandaria City 몰을 낀 도심형 고층 단지 지역. 생활 편의가 좋음.',pt:['몰 직결, 헬스·수영·테니스 갖춘 단지','도시 뷰 위주','MRT 직선 약 2km']},
{id:'pak',n:'빠꾸부워노 · 심프룩 Pakubuwono · Simprug',z:'Pakubuwono · Simprug',lat:-6.2350,lng:106.7870,r:1000,c:'#C0392B',kr:'반포·압구정 고급 단지',d:'고급 아파트와 저층 고급 단지가 모인 지역. 월세가 가장 높은 편이고 녹지가 많음.',pt:['대부분 예산 초과, Simprug Indah는 예외','실내외 수영장·정원 단지','버스 탑승 시각이 가장 이름']},
{id:'cip',n:'찌쁘떼 Cipete',z:null,lat:-6.2745,lng:106.7995,r:750,c:'#7F8C8D',kr:'서촌 골목',d:'MRT Cipete Raya역 일대 주거·상권. 대로변은 MRT, 안쪽은 조용한 주거지.',pt:['MRT 접근 좋음','Bumimas·Hampton\'s Park가 인접']},
{id:'leb',n:'르박불루스 Lebak Bulus',z:null,lat:-6.2895,lng:106.7752,r:800,c:'#27AE60',kr:'수서역 일대',d:'MRT 남쪽 종점과 차량기지가 있는 지역. 남쪽으로 이어지는 교통 거점.',pt:['MRT 시발·종착','Parama 단지 가까움']},
{id:'jik',n:'찌뿌용 Cipayung (JIKS)',z:null,lat:JK.lat,lng:JK.lng,r:1200,c:'#D35400',d:'JIKS가 있는 동자카르타 지역. 남부 거주지에서 버스로 통학하며 이른 시각에 탑승함.',pt:['학교 주변 거주 가능 단지는 조사 목록에 없음']}
];
const CITY={C:{n:'중부 자카르타',c:'#5D6D7E'},S:{n:'남부 자카르타',c:'#1F618D'},N:{n:'북부 자카르타',c:'#148F77'},W:{n:'서부 자카르타',c:'#CA6F1E'},E:{n:'동부 자카르타',c:'#239B56'},I:{n:'천 개의 섬',c:'#6C3483'}};
const JD=[
{id:'men',n:'멘텡',e:'Menteng',c:'C',lat:-6.1960,lng:106.8310,r:800,im:'네덜란드 식민지풍 저택과 가로수길이 있는 오래된 부촌',kr:'한남동·성북동',pt:['대사관과 관저 밀집','조용한 주택가','오래된 카페'],pl:'수라바야 거리 골동품 상점가, 멘텡 공원'},
{id:'gam',n:'감비르·모나스',e:'Gambir · Monas',c:'C',lat:-6.1754,lng:106.8272,r:700,im:'독립기념탑 광장과 정부 청사가 모인 국가 상징 구역',kr:'광화문',pt:['국가 행사와 집회','관공서 밀집'],pl:'모나스(독립기념탑)'},
{id:'tha',n:'탐린·수디르만',e:'Thamrin · Sudirman',c:'C',lat:-6.2050,lng:106.8200,r:900,im:'초고층 업무지구가 이어지는 도시 중심축',kr:'테헤란로',pt:['오피스·호텔·쇼핑몰 밀집'],pl:'호텔 인도네시아 로터리(Bundaran HI)'},
{id:'cik',n:'치키니',e:'Cikini',c:'C',lat:-6.1895,lng:106.8395,r:600,im:'예술센터와 오래된 카페가 있는 학생·예술가 거리',kr:'대학로',pt:['공연·전시','오래된 카페'],pl:'타만 이스마일 마르주키(TIM)'},
{id:'tan',n:'타나 아방',e:'Tanah Abang',c:'C',lat:-6.1860,lng:106.8115,r:600,im:'동남아 최대급 의류 도매시장, 늘 혼잡한 상권',kr:'동대문',pt:['의류·원단 도매','통행 혼잡'],pl:'파사르 타나 아방'},
{id:'scb',n:'SCBD·세노파티',e:'SCBD · Senopati',c:'S',lat:-6.2280,lng:106.8095,r:900,im:'고층 오피스와 바·갤러리·브런치가 모인 젊은 부유층 상권',kr:'강남역·압구정 로데오',pt:['고층 오피스','바·갤러리·브런치'],pl:'퍼시픽 플레이스'},
{id:'blm',n:'블록 엠',e:'Blok M',c:'S',lat:-6.2440,lng:106.7985,r:500,im:'청년 상권, 중고 의류와 일식 골목, 교통 허브',kr:'홍대',pt:['중고 의류','일식 골목','교통 허브'],pl:'블록 엠 스퀘어, 믈라와이 일식 거리'},
{id:'teb',n:'테벳',e:'Tebet',c:'S',lat:-6.2370,lng:106.8530,r:800,im:'주택가 속 카페와 에코 파크가 있는 로컬 동네',kr:'연남동·망원동',pt:['주택가 카페','공원'],pl:'테벳 에코 파크'},
{id:'kun',n:'쿠닝안',e:'Kuningan',c:'S',lat:-6.2260,lng:106.8300,r:800,im:'대사관과 대기업·금융 사무지구',kr:'여의도',pt:['대사관','금융·대기업 사무실'],pl:'메가 쿠닝안'},
{id:'kot',n:'코타 투아',e:'Kota Tua',c:'N',lat:-6.1352,lng:106.8133,r:600,im:'옛 바타비아 구시가, 박물관과 자전거 대여',kr:'인천 개항장·군산 근대거리',pt:['식민지 시대 건물','박물관','자전거 대여'],pl:'파타힐라 광장'},
{id:'sun',n:'순다 클라파',e:'Sunda Kelapa',c:'N',lat:-6.1230,lng:106.8080,r:500,im:'전통 범선이 정박한 옛 항구와 어시장',kr:'인천 연안부두',pt:['전통 범선','어시장']},
{id:'anc',n:'안콜',e:'Ancol',c:'N',lat:-6.1250,lng:106.8400,r:1100,im:'해변 리조트와 놀이공원이 있는 가족 나들이 장소',kr:'월미도',pt:['해변','놀이공원'],pl:'두니아 판타시'},
{id:'pik',n:'PIK',e:'Pantai Indah Kapuk',c:'N',lat:-6.1100,lng:106.7420,r:1200,im:'계획 신도시, 중국계 부유층, 카페·몰',kr:'송도',pt:['계획 신도시','카페·몰'],pl:'PIK 애비뉴'},
{id:'kel',n:'클라파 가딩',e:'Kelapa Gading',c:'N',lat:-6.1580,lng:106.9070,r:1000,im:'중상류 주거지와 몰, 먹자골목',kr:'목동',pt:['중상류 주거','몰·먹자골목'],pl:'몰 클라파 가딩'},
{id:'glo',n:'글로독',e:'Glodok',c:'W',lat:-6.1450,lng:106.8170,r:600,im:'차이나타운, 도매시장과 사원, 골목 음식',kr:'인천 차이나타운+남대문시장',pt:['도매시장','사원','골목 음식']},
{id:'gro',n:'그로골·탄중 두렌',e:'Grogol · Tanjung Duren',c:'W',lat:-6.1730,lng:106.7890,r:900,im:'대학가, 학생 상권과 저렴한 식당',kr:'신촌',pt:['대학가','저렴한 식당'],pl:'트리삭티대학교'},
{id:'pur',n:'푸리 인다',e:'Puri Indah',c:'W',lat:-6.1880,lng:106.7340,r:1000,im:'신흥 주거지와 대형 몰',kr:'일산',pt:['신흥 주거지','대형 몰'],pl:'푸리 인다 몰'},
{id:'jat',n:'자티느가라',e:'Jatinegara',c:'E',lat:-6.2150,lng:106.8700,r:700,im:'옛 시장과 서민 상권, 복잡한 역세권',kr:'청량리',pt:['옛 시장','서민 상권','역 주변 혼잡'],pl:'파사르 자티느가라'},
{id:'raw',n:'라와망운',e:'Rawamangun',c:'E',lat:-6.1950,lng:106.8800,r:800,im:'대학과 체육 시설이 있는 조용한 주거지',kr:'안암·회기',pt:['대학','체육 시설'],pl:'자카르타주립대(UNJ)'},
{id:'tmi',n:'타만 미니',e:'Taman Mini',c:'E',lat:-6.3025,lng:106.8950,r:1000,im:'각 지방 전통 가옥을 모은 테마파크',kr:'한국민속촌',pt:['지방별 전시관'],pl:'타만 미니 인도네시아 인다(TMII)'},
{id:'pul',n:'풀로 가둥',e:'Pulo Gadung',c:'E',lat:-6.1850,lng:106.9120,r:1000,im:'공단과 물류 지대',kr:'구로공단',pt:['공단','물류']},
{id:'ser',n:'끄뿔라우안 스리부',e:'Kepulauan Seribu',c:'I',lat:-5.7440,lng:106.6140,r:5000,im:'스노클링과 소형 리조트가 있는 섬 지역',kr:'통영 다도해·제주 섬',pt:['스노클링','소형 리조트']}
];
const TG=[
{id:'kem',n:'Kemang',ko:'끄망',mem:['Bangka','Pela Mampang'],c:'#E67E22',d:'외국인·카페·식당 밀집 지역. Lippo Mall Kemang을 중심으로 상권이 넓고 한식당도 많음.',pt:['행정구역 이름이 아니라 통칭. 주로 Bangka 동에 해당','발레·빠델 시설 가까움','주말·퇴근 시간 정체 심하고 우기 침수 이력','MRT에서 멀어 차량 이동 중심']},
{id:'cil',n:'Cilandak · Terogong',ko:'찔란닥 · 테로공',mem:['Cilandak Barat'],c:'#16A085',d:'조용한 주거지. 빠델 코트가 모여 있고 Fatmawati·Cipete Raya·Lebak Bulus MRT가 가까움.',pt:['Terogong은 Cilandak Barat 안의 거리·동네 이름','월세가 비교적 낮은 중저가 단지 많음','단지 내 몰은 드물고 Cilandak Town Square, PIM 이용','골프장·정원 조망 단지 있음']},
{id:'cip',n:'Cipete',ko:'찌쁘떼',mem:['Cipete Utara','Cipete Selatan'],c:'#7F8C8D',d:'MRT Cipete Raya역 일대 주거·상권. 대로변은 MRT, 안쪽은 조용한 주거지.',pt:['Cipete Selatan은 Cilandak 구, Cipete Utara는 Kebayoran Baru 구로 갈림','Essence Darmawangsa는 끄망이 아니라 Cipete Utara']},
{id:'pi',n:'Pondok Indah',ko:'폰독 인다',mem:['Pondok Pinang'],c:'#2980B9',d:'고급 주거 지역. Pondok Indah Mall 1·2·3과 골프장, 국제학교·학원이 많음.',pt:['행정구역상 이름은 Pondok Pinang. Pondok Indah는 개발 단지 이름','몰 직결 단지, 영어학원 밀집','골프 뷰·녹지 풍부','2BR 이상은 예산 초과 단지 많음']},
{id:'gan',n:'Gandaria',ko:'간다리아',mem:['Gandaria Utara','Gandaria Selatan'],c:'#8E44AD',d:'Gandaria City 몰을 낀 도심형 고층 단지 지역. 생활 편의가 좋음.',pt:['Gandaria City·Gandaria Heights는 Kebayoran Lama Utara 동에 있음','몰 직결, 헬스·수영·테니스 갖춘 단지','도시 뷰 위주']},
{id:'pak',n:'Pakubuwono',ko:'빠꾸부워노',mem:['Gunung','Selong'],c:'#C0392B',d:'고급 아파트가 모인 지역. 월세가 가장 높은 편이고 녹지가 많음.',pt:['대부분 예산 초과','실내외 수영장·정원 단지','버스 탑승 시각이 가장 이름']},
{id:'sim',n:'Simprug',ko:'심프룩',mem:['Grogol Selatan'],c:'#B03A2E',d:'빠꾸부워노 서쪽의 녹지 많은 주거지. 저층 단지와 아파트가 섞여 있음.',pt:['행정구역상 Grogol Selatan','Simprug Indah는 1BR·3BR이 예산 안']},
{id:'blm',n:'Blok M',ko:'블록 엠',mem:['Melawai','Pulo'],c:'#E74C3C',d:'한국인 식당·상점이 모인 상권. MRT Blok M역과 버스 환승 거점.',pt:['Melawai 동 중심','자카르타 한인 생활권으로 알려진 곳']},
{id:'sen',n:'Senayan · SCBD',ko:'스나얀 · 에스씨비디',mem:['Senayan'],c:'#F39C12',d:'경기장 단지와 업무·쇼핑 지구가 이어진 곳.',pt:['GBK 경기장, 포스트 블록 등']},
{id:'kun',n:'Kuningan',ko:'꾸닝안',mem:['Kuningan Barat','Kuningan Timur','Karet Kuningan'],c:'#B7950B',d:'대사관과 고층 업무지구가 모인 지역.',pt:['세 동에 걸쳐 있음','주거지 조사 대상 아님']},
{id:'leb',n:'Lebak Bulus',ko:'르박 불루스',mem:['Lebak Bulus'],c:'#27AE60',d:'MRT 남쪽 종점과 차량기지가 있는 지역. 남쪽으로 이어지는 교통 거점.',pt:['MRT 시발·종착','Parama 단지가 가까움']},
{id:'pbl',n:'Pondok Labu',ko:'폰독 라부',mem:['Pondok Labu'],c:'#2E86C1',d:'남쪽 외곽 주거지. JIKS 방향으로 가까워지는 쪽.',pt:['Cilandak 구 소속']},
{id:'bin',n:'Bintaro',ko:'빈따로',mem:['Bintaro','Petukangan Selatan','Petukangan Utara'],c:'#C0392B',d:'자카르타 서남쪽 끝 주거지. 경계 너머 Bintaro Jaya와 함께 불림.',pt:['자카르타 쪽은 Pesanggrahan 구','Bintaro Jaya는 자카르타 밖(Tangerang Selatan)']},
{id:'jik',n:'Cipayung (JIKS)',ko:'찌빠융 (JIKS)',mem:['Ceger'],c:'#D35400',d:'JIKS가 있는 동자카르타 지역. 남부 거주지에서 버스로 통학함.',pt:['JIKS는 Ceger 동, Cipayung 구','조사 목록 단지는 모두 남자카르타']}
];
const CAT={biz:['상업·업무','#F6D58E','#A67C00','오피스·몰·상점이 밀집한 곳. 낮에 붐비고 주거는 고층 아파트 위주.'],lux:['고급 주거','#CDB8E8','#7E57C2','대형 주택과 고급 단지. 조용하고 녹지가 많으며 월세가 높음.'],exp:['외국인·카페','#F5C6B0','#C0714C','외국인·카페·식당 중심 동네. 활기차지만 정체와 침수에 주의.'],res:['일반 주거','#C5E3BC','#5E9E58','일반 주거지. 생활 시설은 대로변 몰·시장을 이용.'],hub:['교통·시설','#B4D4EC','#4A88B8','지하철·철도·공원·학교 등 시설로 알려진 곳.'],out:['외곽 주거','#E6DFCF','#9A8C70','도심에서 멀고 저밀한 주거지. 이동 시간이 길어짐.']};
const JCAT={trad:['시장·옛 도심','#F4BFCB','#B34D68','전통시장·구시가·차이나타운. 서민 상권과 옛 건물이 있음.'],cul:['대학·문화','#A8DCD0','#2F8F7C','대학가와 예술 공간. 학생 상권과 저렴한 식당.'],tour:['관광·휴양','#9FD8E8','#2A8CA6','해변·테마파크·섬. 주말 나들이 중심.'],ind:['공단·물류','#D8D8D8','#666666','공단과 물류 지대. 주거 목적과는 거리가 있음.']};
const TONE={warm:['#F6D58E','#A67C00'],home:['#C5E3BC','#5E9E58'],blue:['#B4D4EC','#4A88B8'],gray:['#E4E2DC','#78716C']};
const TMAP={biz:'warm',exp:'warm',trad:'warm',lux:'home',res:'home',out:'home',hub:'blue',cul:'blue',tour:'blue',ind:'gray'};
[CAT,JCAT].forEach(o=>Object.keys(o).forEach(k=>{const t=TONE[TMAP[k]];o[k][1]=t[0];o[k][2]=t[1]}));
const ACAT=Object.assign({},CAT,JCAT);
const JT={men:'lux',gam:'biz',tha:'biz',cik:'cul',tan:'trad',scb:'biz',blm:'exp',teb:'res',kun:'biz',kot:'trad',sun:'trad',anc:'tour',pik:'lux',kel:'res',glo:'trad',gro:'cul',pur:'res',jat:'trad',raw:'cul',tmi:'tour',pul:'ind',ser:'tour'};
JD.forEach(d=>{d.cat=JT[d.id]});
