// 자카르타 전체 구(Kecamatan)·동(Kelurahan) 설명 데이터
// KC: 구 한글 이름·색 / KD: 구 설명(d 특징, kr 한국 비유, pl 대표 장소, live 주거 관점) / KDEF: 구 기본 특징
// KR: 동 한글 표기 / KNOTE: 동 설명 / KCAT: 동별 특징(없으면 KDEF)
// 특징·비유는 일반적인 인상에 따른 대략적 설명이다. 계약 전 현장 확인이 필요하다.
const KC={
'Cilandak':['찔란닥','#16A085'],'Jagakarsa':['자가까르사','#8E7CC3'],'Kebayoran Baru':['끄바요란 바루','#E67E22'],'Kebayoran Lama':['끄바요란 라마','#2980B9'],'Mampang Prapatan':['맘빵 쁘라빠딴','#D4537E'],'Pancoran':['빤쪼란','#7F8C8D'],'Pasar Minggu':['빠사르 밍구','#27AE60'],'Pesanggrahan':['쁘상그라한','#C0392B'],'Setia Budi':['스띠아 부디','#B7950B'],'Tebet':['뜨벳','#6C5CE7'],
'Cipayung':['찌빠융','#D35400'],'Pasar Rebo':['빠사르 레보','#1ABC9C'],'Ciracas':['찌라짜스','#5D6D7E'],'Makasar':['마까사르','#A04000'],'Kramat Jati':['끄라맛 자띠','#2E86C1'],'Cakung':['짜꿍','#7D6608'],'Duren Sawit':['두렌 사윗','#117A65'],'Jatinegara':['자띠느가라','#943126'],'Matraman':['마뜨라만','#5B2C6F'],'Pulo Gadung':['뿔로 가둥','#1F618D'],
'Cempaka Putih':['쯤빠까 뿌띠','#AF601A'],'Gambir':['감비르','#922B21'],'Johar Baru':['조하르 바루','#6E2C00'],'Kemayoran':['끄마요란','#1A5276'],'Menteng':['믄뗑','#7B241C'],'Sawah Besar':['사와 브사르','#B9770E'],'Senen':['스넨','#76448A'],'Tanah Abang':['따나 아방','#A93226'],
'Cengkareng':['쯩까렝','#B03A2E'],'Grogol Petamburan':['그로골 쁘땀부란','#CA6F1E'],'Kalideres':['깔리데레스','#7E5109'],'Kebon Jeruk':['끄본 즈룩','#D68910'],'Kembangan':['끔방안','#AA6E28'],'Palmerah':['빨메라','#BA4A00'],'Taman Sari':['따만 사리','#C0392B'],'Tambora':['땀보라','#873600'],
'Cilincing':['찔린찡','#0E6655'],'Kelapa Gading':['끌라빠 가딩','#148F77'],'Koja':['꼬자','#0B5345'],'Pademangan':['빠드망안','#16A085'],'Penjaringan':['쁜자링안','#1D8348'],'Tanjung Priok':['딴중 쁘리옥','#117864'],
'Kepulauan Seribu Selatan':['끄뿔라우안 스리부 슬라딴','#6C3483'],'Kepulauan Seribu Utara':['끄뿔라우안 스리부 우따라','#5B2C6F']};
const KD={
// 남부 자카르타
'Cilandak':{d:'남쪽 주거지. Cilandak Town Square와 Fatmawati 대로 주변에 상권이 있고 안쪽은 조용한 주택가.',kr:'방배동·사당동',pl:'Cilandak Town Square, MRT Fatmawati·Lebak Bulus역',live:'외국인 가족 거주가 많고 빠델 코트·국제학교 접근이 좋음. 출퇴근 시간 Fatmawati 대로 정체.'},
'Jagakarsa':{d:'남쪽 끝 녹지 많은 외곽 주거지. 인도네시아대학교(UI)와 데뽁(Depok) 경계에 닿음.',kr:'과천·의왕',pl:'세투 바바깐 브따위 문화마을, KRL Lenteng Agung·Tanjung Barat역',live:'단독주택·클러스터 위주로 조용함. 도심까지 이동 시간이 김.'},
'Kebayoran Baru':{d:'1950년대 계획 신도시로 만든 고급 주거·상업 지역. SCBD·블록 M·세노파티가 모두 여기에 있음.',kr:'강남구(압구정·청담·강남역)',pl:'SCBD, 블록 M, 세노파티, 다르마와사',live:'생활 편의가 가장 좋은 편이고 월세가 높음. 한인 식당·상점이 블록 M 주변에 모임.'},
'Kebayoran Lama':{d:'폰독 인다·간다리아·심프룩 고급 단지와 오래된 서민 주거지가 섞인 구.',kr:'분당 구도심+판교',pl:'Pondok Indah Mall, Gandaria City, 심프룩',live:'몰·학원 밀집 지역은 편리하지만 Kebayoran Lama 시장 주변은 혼잡.'},
'Mampang Prapatan':{d:'끄망 카페 거리와 꾸닝안 업무지구 사이. 외국인 상권과 주거지가 함께 있음.',kr:'이태원·한남동',pl:'끄망 거리, Lippo Mall Kemang',live:'식당·카페가 많고 활기참. 비 오면 끄망 일대 도로 침수·정체가 잦음.'},
'Pancoran':{d:'도심 남동쪽 관문. 깔리바따 영웅묘지와 LRT·톨게이트가 모인 교통 요충.',kr:'사당·이수',pl:'깔리바따 시티, 빤쪼란 동상(조각상)',live:'깔리바따 시티 등 중저가 아파트가 많음. 대로 소음·정체가 큼.'},
'Pasar Minggu':{d:'옛 일요시장 이름이 붙은 남쪽 주거지. 라구난 동물원과 과일 산지로 알려졌던 녹지.',kr:'노원·도봉',pl:'라구난 동물원, KRL Pasar Minggu역',live:'일반 주거지라 월세가 비교적 낮음. 시장·역 주변은 복잡.'},
'Pesanggrahan':{d:'서남쪽 경계 주거지. 빈따로와 땅그랑슬라딴 쪽으로 이어짐.',kr:'목동 서쪽·신정동',pl:'빈따로 경계, 울루자미',live:'조용한 주택가. 자카르타 밖 빈따로 자야 생활권을 함께 씀.'},
'Setia Budi':{d:'꾸닝안 업무지구와 대사관이 모인 도심 구. 수디르만 대로 동쪽.',kr:'여의도+광화문 대사관가',pl:'메가 꾸닝안, 라숨나 사이드(Rasuna Said) 대로, 쁠라자 스망기',live:'고층 아파트 위주, 직주근접. 주말에는 한산하고 평일 정체가 심함.'},
'Tebet':{d:'주택가 속 카페 골목과 에코 파크가 있는 로컬 동네. 망가라이 환승역이 있음.',kr:'연남동·망원동',pl:'테벳 에코 파크, 망가라이역',live:'젊은 층이 좋아하는 생활권. 찌리웅(Ciliwung)강 주변 일부는 침수 위험.'},
// 동부 자카르타
'Cipayung':{d:'동남쪽 외곽. JIKS와 타만 미니(TMII), 군 시설이 있는 녹지 많은 지역.',kr:'성남 외곽',pl:'JIKS, 타만 미니 인도네시아 인다(TMII), 루방 부아야 기념비',live:'JIKS와 가깝지만 조사 단지는 남자카르타에 몰려 있음. 대중교통이 약함.'},
'Pasar Rebo':{d:'남동쪽 외곽 주거지. 찌잔뚱 군 주둔지와 TB Simatupang 대로 동쪽 끝.',kr:'하남 감일·위례',pl:'TB Simatupang 대로, Kampung Rambutan 터미널 인근',live:'저밀 주거지. JIKS·남자카르타 양쪽으로 이동 가능.'},
'Ciracas':{d:'동남쪽 외곽 주거지. 깜뿡 람부딴 버스터미널과 찌부부르 캠핑장이 있음.',kr:'남양주 다산',pl:'Kampung Rambutan 터미널, 찌부부르 캠핑장(Bumi Perkemahan)',live:'월세가 낮은 편. 도심 이동은 톨도로·버스에 의존.'},
'Makasar':{d:'할림 공군기지·공항과 고속철 할림역이 있는 동쪽 교통 거점.',kr:'김포공항 일대',pl:'할림 쁘르다나꾸수마 공항, 고속철(Whoosh) 할림역',live:'공항 소음 구역이 있음. LRT·고속철 접근이 좋음.'},
'Kramat Jati':{d:'동쪽 서민 주거지. 대형 과일·채소 도매시장과 교통 요충 찌릴리딴·짜왕이 있음.',kr:'가락시장 일대',pl:'Pasar Induk Kramat Jati, PGC 몰(찌릴리딴)',live:'도매시장 주변 새벽 혼잡. 교통은 편리.'},
'Cakung':{d:'동쪽 끝 공단·물류와 신흥 주거지가 함께 있는 구. 대형 버스터미널 풀로 그방이 있음.',kr:'시화·반월 공단+신도시',pl:'Terminal Terpadu Pulo Gebang, Jakarta Garden City',live:'공장·트럭 통행이 많음. 신규 클러스터 단지는 월세가 낮음.'},
'Duren Sawit':{d:'동부 주거 밀집 구. 깔리말랑 운하를 따라 상권이 이어짐.',kr:'중랑구',pl:'깔리말랑(Kalimalang) 운하, Pondok Kelapa',live:'중산층 주택가. 도심·브카시 양쪽으로 출퇴근 차량이 많음.'},
'Jatinegara':{d:'옛 메스터 코르넬리스 시장 마을에서 시작한 동쪽 구도심. 역과 시장이 붐빔.',kr:'청량리·제기동',pl:'Pasar Jatinegara, 자띠느가라역',live:'찌리웅강 범람 상습 구역(Kampung Melayu·Bidara Cina)이 있음.'},
'Matraman':{d:'도심 동쪽 가장자리의 오래된 주거지. 대로 사이 촘촘한 골목 주택.',kr:'동대문구 신설동',pl:'Matraman Raya 대로, Utan Kayu',live:'도심 접근은 좋지만 주택이 낡고 밀집.'},
'Pulo Gadung':{d:'자카르타주립대(UNJ)가 있는 라와망운 주거지와 북쪽 공단(JIEP)이 함께 있는 구.',kr:'안암·회기+성수 공장지대',pl:'자카르타주립대(UNJ), 라와망운 경기장, 풀로가둥 공단',live:'라와망운은 조용한 중산층 주거지. 공단 쪽은 주거와 거리가 있음.'},
// 중부 자카르타
'Cempaka Putih':{d:'도심 북동쪽의 정돈된 중산층 주거지. 병원과 대학이 있음.',kr:'도봉 창동',pl:'YARSI 대학, Cempaka Putih 경마장 터',live:'조용하고 도심이 가까움. 외국인 거주는 드묾.'},
'Gambir':{d:'모나스(독립기념탑)와 대통령궁, 감비르역이 있는 국가 중심부.',kr:'광화문·세종로',pl:'모나스, 대통령궁, 감비르역, 이스띠끄랄 모스크 인근',live:'관공서·집회로 도로 통제가 잦음. 주거지는 서쪽 Petojo·Cideng.'},
'Johar Baru':{d:'자카르타에서 인구 밀도가 가장 높은 축에 드는 서민 주거지.',kr:'옛 창신동',pl:'Tanah Tinggi, Galur',live:'골목이 좁고 밀집. 외국인 임대 수요는 거의 없음.'},
'Kemayoran':{d:'옛 끄마요란 공항 터를 재개발한 지역. 자카르타 국제전시장(JIExpo)과 고층 아파트.',kr:'코엑스+옛 여의도 비행장',pl:'JIExpo(PRJ 박람회장), 끄마요란 공원',live:'신축 아파트가 많고 월세가 중간 수준. 박람회 기간 혼잡.'},
'Menteng':{d:'네덜란드 식민지 시기 정원도시로 만든 부촌. 대사관 관저와 오래된 저택.',kr:'성북동·한남동',pl:'멘뗑 공원, 수로노 거리, 찌끼니, Grand Indonesia 인근',live:'단독 저택 임대료가 매우 높음. 녹지·치안이 좋음.'},
'Sawah Besar':{d:'옛 상업 중심 빠사르 바루(Pasar Baru)와 망가 두아 도매상가가 있는 구.',kr:'명동 옛 상권+남대문',pl:'Pasar Baru, 망가 두아(Mangga Dua) 도매상가',live:'상가·도매 위주로 낮에 붐빔. 거주는 오래된 숍하우스.'},
'Senen':{d:'빠사르 스넨 시장과 스넨역, 인도네시아대학교 살렘바 캠퍼스가 있는 구도심.',kr:'종로5가·동대문',pl:'Pasar Senen, Atrium Senen, UI 살렘바 캠퍼스, 끄위땅 책거리',live:'교통이 편리하지만 혼잡. 의대·병원 관련 수요가 있음.'},
'Tanah Abang':{d:'동남아 최대급 의류 도매시장과 탐린·수디르만 업무지구, GBK 경기장이 함께 있는 구.',kr:'동대문 시장+테헤란로+잠실',pl:'Pasar Tanah Abang, Thamrin City, GBK, Plaza Senayan',live:'벤힐(Bendungan Hilir) 등 도심 주거지가 있음. 시장 주변은 늘 혼잡.'},
// 서부 자카르타
'Cengkareng':{d:'서쪽 끝 주거·물류 지역. 수카르노-하타 공항 방면 관문.',kr:'김포·강서 마곡',pl:'공항 톨도로, Kapuk',live:'월세가 낮고 공항이 가까움. 북쪽 저지대 침수 주의.'},
'Grogol Petamburan':{d:'트리삭티·따루마느가라 대학가와 대형 몰(Central Park)이 모인 서부 중심.',kr:'신촌',pl:'Central Park·Taman Anggrek 몰, 트리삭티대학교, 그로골 버스 환승',live:'학생·젊은 직장인 수요. 몰 직결 아파트가 많음.'},
'Kalideres':{d:'서쪽 외곽 주거·창고 지역. 깔리데레스 버스터미널이 있음.',kr:'김포 고촌',pl:'Terminal Kalideres, Kamal',live:'도심에서 멀고 저지대 침수 구역이 있음.'},
'Kebon Jeruk':{d:'서부 중산층 주거지. 방송국과 BINUS 대학 캠퍼스가 있음.',kr:'마포 상암·성산',pl:'방송국 단지(끄도야), Lippo Mall Puri 인근',live:'단독주택·아파트 혼합. 서쪽 외곽순환 톨도로 접근 좋음.'},
'Kembangan':{d:'신흥 주거지 뿌리 인다(Puri Indah)와 대형 몰이 있는 서부 신도시권.',kr:'일산',pl:'Puri Indah Mall, Lippo Mall Puri, 므루야',live:'계획 주거지라 정돈됨. 국제학교 몇 곳이 있음.'},
'Palmerah':{d:'빨메라역과 언론사(Kompas Gramedia) 본사, 슬리삐 업무지구가 있는 구.',kr:'공덕·마포',pl:'빨메라역, 슬리삐(Slipi), BINUS 끄망기산 캠퍼스',live:'교통이 좋고 대학가 하숙(kos)이 많음.'},
'Taman Sari':{d:'옛 바타비아 성곽 남쪽. 글로독 차이나타운과 망가 브사르 유흥가.',kr:'인천 차이나타운+을지로',pl:'글로독, 빠따힐라 광장(코타 투아) 남쪽, Mangga Besar',live:'숍하우스·밀집 주거. 밤늦게까지 소음이 있음.'},
'Tambora':{d:'자카르타에서 가장 밀집한 구 가운데 하나. 오래된 아랍·중국계 마을과 시장.',kr:'옛 청계천 판자촌·을지로 골목',pl:'Pekojan 아랍 마을, Roa Malaka(코타 투아 서쪽)',live:'골목이 좁고 화재·침수 위험이 큰 편.'},
// 북부 자카르타
'Cilincing':{d:'북동쪽 해안의 항만·공단(Marunda, KBN)과 어촌.',kr:'인천 남항·남동공단',pl:'마룬다 항, KBN 공단, 마룬다 로사 집(역사 유적)',live:'주거 목적과 거리가 있음. 해안 침수(rob)·지반 침하 지역.'},
'Kelapa Gading':{d:'북부 중상류 주거지. 대형 몰과 먹자골목, 중국계 주민이 많음.',kr:'목동',pl:'Mall Kelapa Gading, 보울바드(Boulevard) 먹자거리',live:'생활 편의가 좋음. 우기 침수가 잦은 저지대.'},
'Koja':{d:'딴중 쁘리옥 항 동쪽 서민 주거지. 병원과 항만 관련 시설.',kr:'인천 동구',pl:'Koja 병원, 항만 배후지',live:'트럭 통행이 많고 주거 환경은 평범.'},
'Pademangan':{d:'안콜 해변 리조트·놀이공원과 그 뒤편 주거지.',kr:'월미도',pl:'안콜 드림랜드, 두니아 판타시, 시월드',live:'해변 아파트가 있음. 주말 관광객으로 혼잡.'},
'Penjaringan':{d:'옛 항구 순다 끌라빠와 어시장, 플루잇 주거지, 신도시 PIK가 함께 있는 북서쪽 구.',kr:'인천 연안부두+송도',pl:'순다 끌라빠, 무아라 앙꺼 어시장, 플루잇, PIK',live:'PIK·플루잇은 고급 주거지지만 해안 침수와 지반 침하가 진행 중.'},
'Tanjung Priok':{d:'인도네시아 최대 무역항 딴중 쁘리옥과 순떠르 주거지.',kr:'부산항+해운대 배후',pl:'딴중 쁘리옥 항·역, 순떠르(Sunter) 호수',live:'순떠르는 중산층 주거지. 항만 쪽은 트럭과 매연.'},
// 천 개의 섬
'Kepulauan Seribu Selatan':{d:'자카르타만의 남쪽 섬들. 배로 1~2시간, 주민 마을과 소형 숙소.',kr:'인천 옹진군 섬',pl:'빠리섬, 띠둥섬, 운뚱 자와섬',live:'주말 여행지. 통학 생활권 밖.'},
'Kepulauan Seribu Utara':{d:'군 행정 중심 쁘라무까섬과 북쪽 리조트 섬들.',kr:'통영 다도해',pl:'쁘라무까섬(군청), 하라빤섬, 리조트 섬',live:'스노클링·다이빙 여행지. 통학 생활권 밖.'}};
const KDEF={'Cilandak':'res','Jagakarsa':'out','Kebayoran Baru':'lux','Kebayoran Lama':'res','Mampang Prapatan':'res','Pancoran':'res','Pasar Minggu':'res','Pesanggrahan':'res','Setia Budi':'biz','Tebet':'res',
'Cipayung':'out','Pasar Rebo':'out','Ciracas':'out','Makasar':'out','Kramat Jati':'out','Cakung':'res','Duren Sawit':'res','Jatinegara':'res','Matraman':'res','Pulo Gadung':'res',
'Cempaka Putih':'res','Gambir':'res','Johar Baru':'res','Kemayoran':'res','Menteng':'lux','Sawah Besar':'trad','Senen':'trad','Tanah Abang':'biz',
'Cengkareng':'res','Grogol Petamburan':'res','Kalideres':'out','Kebon Jeruk':'res','Kembangan':'res','Palmerah':'res','Taman Sari':'trad','Tambora':'trad',
'Cilincing':'ind','Kelapa Gading':'res','Koja':'res','Pademangan':'res','Penjaringan':'res','Tanjung Priok':'res','Kepulauan Seribu Selatan':'tour','Kepulauan Seribu Utara':'tour'};
// 남부·동부 일부(기존 조사분)
const KR={'Cilandak Barat':'찔란닥 바랏','Cipete Selatan':'찌쁘떼 슬라딴','Gandaria Selatan':'간다리아 슬라딴','Lebak Bulus':'르박 불루스','Pondok Labu':'폰독 라부','Ciganjur':'찌간주르','Cipedak':'찌쁘닥','Jagakarsa':'자가까르사','Lenteng Agung':'른뗑 아궁','Srengseng Sawah':'스렝승 사와','Tanjung Barat':'딴중 바랏','Cipete Utara':'찌쁘떼 우따라','Gandaria Utara':'간다리아 우따라','Gunung':'구눙','Kramat Pela':'끄라맛 쁠라','Melawai':'믈라와이','Petogogan':'쁘또고간','Pulo':'뿔로','Rawa Barat':'라와 바랏','Selong':'슬롱','Senayan':'스나얀','Cipulir':'찌뿔리르','Grogol Selatan':'그로골 슬라딴','Grogol Utara':'그로골 우따라','Kebayoran Lama Selatan':'끄바요란 라마 슬라딴','Kebayoran Lama Utara':'끄바요란 라마 우따라','Pondok Pinang':'폰독 삐낭','Bangka':'방까','Kuningan Barat':'꾸닝안 바랏','Mampang Prapatan':'맘빵 쁘라빠딴','Pela Mampang':'쁠라 맘빵','Tegal Parang':'뜨갈 빠랑','Cikoko':'찌꼬꼬','Duren Tiga':'두렌 띠가','Kalibata':'깔리바따','Pancoran':'빤쪼란','Pengadegan':'쁭아드간','Rawajati':'라와자띠','Cilandak Timur':'찔란닥 띠무르','Jati Padang':'자띠 빠당','Kebagusan':'끄바구산','Pasar Minggu':'빠사르 밍구','Pejaten Barat':'쁘자뗀 바랏','Pejaten Timur':'쁘자뗀 띠무르','Ragunan':'라구난','Bintaro':'빈따로','Pesanggrahan':'쁘상그라한','Petukangan Selatan':'쁘뚜깡안 슬라딴','Petukangan Utara':'쁘뚜깡안 우따라','Ulujami':'울루자미','Guntur':'군뚜르','Karet':'까렛','Karet Semanggi':'까렛 스망기','Pasar Manggis':'빠사르 망기스','Setia Budi':'스띠아 부디','Karet Kuningan':'까렛 꾸닝안','Kuningan Timur':'꾸닝안 띠무르','Menteng Atas':'믄뗑 아따스','Bukit Duri':'부킷 두리','Kebon Baru':'끄본 바루','Manggarai':'망가라이','Manggarai Selatan':'망가라이 슬라딴','Menteng Dalam':'믄뗑 달람','Tebet Barat':'뜨벳 바랏','Tebet Timur':'뜨벳 띠무르','Bambu Apus':'밤부 아뿌스','Ceger':'쯔게르','Cilangkap':'찔랑깝','Cipayung':'찌빠융','Lubang Buaya':'루방 부아야','Munjul':'문줄','Pondok Ranggon':'폰독 랑곤','Setu':'스뚜','Baru':'바루','Cijantung':'찌잔뚱','Gedong':'그동','Kalisari':'깔리사리','Pekayon':'쁘까욘','Cibubur':'찌부부르','Ciracas':'찌라짜스','Kelapa Dua Wetan':'끌라빠 두아 웨딴','Rambutan':'람부딴','Susukan':'수수깐','Cipinang Melayu':'찌삐낭 믈라유','Halim Perdana Kusumah':'할림 쁘르다나 꾸수마','Kebon Pala':'끄본 빨라','Makasar':'마까사르','Pinang Ranti':'삐낭 란띠','Bale Kambang':'발레 깜방','Batu Ampar':'바뚜 암빠르','Cawang':'짜왕','Cililitan':'찌릴리딴','Dukuh':'두꾸','Kampung Tengah':'깜뿡 뜽아','Kramat Jati':'끄라맛 자띠'};
const KNOTE={'Bangka':'끄망 중심부. 끄망 빌리지와 Lippo Mall Kemang이 이 동 안에 있음','Pela Mampang':'끄망 북서쪽과 이어지는 주거지','Cilandak Barat':'Cilandak Town Square 등 상권과 빠델 코트가 모인 주거지. 테로공(Terogong) 거리 포함','Cipete Selatan':'MRT Cipete Raya·Haji Nawi역이 있는 주거·상권','Cipete Utara':'다르마와사(Darmawangsa) 일대 고급 주거지와 접함','Pondok Pinang':'폰독 인다 쇼핑몰·골프 단지가 있는 고급 주거지','Lebak Bulus':'MRT 남쪽 종점·차량기지가 있는 지명. 역 좌표는 이웃 동 경계에 걸릴 수 있음','Gunung':'빠꾸부워노 단지가 모인 곳','Selong':'세노빠띠·빠꾸부워노 인근 고급 주거지','Grogol Selatan':'심프룩(Simprug) 단지 일대','Kebayoran Lama Utara':'Gandaria City 몰이 속한 동','Gandaria Utara':'간다리아 주거지(Kebayoran Baru 소속)','Melawai':'블록 M 상권과 MRT Blok M역','Senayan':'겔로라 붕 까르노(GBK) 경기장 단지','Kuningan Barat':'꾸닝안 업무지구(CBD) 일부','Kuningan Timur':'꾸닝안 업무지구(CBD) 일부','Ragunan':'라구난 동물원','Bintaro':'남쪽으로 땅그랑슬라딴의 Bintaro Jaya와 접함. 그쪽은 자카르타 밖','Kalibata':'깔리바따 영웅 묘지가 있는 동','Cawang':'톨게이트·LRT가 만나는 교통 요충','Halim Perdana Kusumah':'할림 공군기지가 있는 동','Ceger':'JIKS 학교 소재 동','Cipayung':'동네 이름이자 구(Kecamatan) 이름이기도 함','Lenteng Agung':'KRL 통근열차역이 있는 동','Pondok Labu':'남쪽 외곽 주거지','Setia Budi':'동 이름과 구 이름이 같음'};
const KCAT={'Kuningan Barat':'biz','Kuningan Timur':'biz','Karet Kuningan':'biz','Karet Semanggi':'biz','Senayan':'biz','Melawai':'biz','Kebayoran Lama Utara':'biz','Setia Budi':'biz','Pondok Pinang':'lux','Gunung':'lux','Selong':'lux','Grogol Selatan':'lux','Grogol Utara':'lux','Cipete Utara':'lux','Gandaria Utara':'lux','Petogogan':'lux','Rawa Barat':'lux','Kramat Pela':'lux','Bangka':'exp','Pela Mampang':'exp','Lebak Bulus':'hub','Cawang':'hub','Cililitan':'hub','Halim Perdana Kusumah':'hub','Ragunan':'hub','Kalibata':'hub','Ceger':'hub','Manggarai':'hub'};
// 자카르타 전체로 넓힌 부분
Object.assign(KR,{
// 동부
'Cakung Barat':'짜꿍 바랏','Cakung Timur':'짜꿍 띠무르','Jatinegara':'자띠느가라','Penggilingan':'쁭길링안','Pulo Gebang':'뿔로 그방','Rawa Terate':'라와 뜨라떼','Ujung Menteng':'우중 믄뗑',
'Duren Sawit':'두렌 사윗','Klender':'끌렌데르','Malaka Jaya':'말라까 자야','Malaka Sari':'말라까 사리','Pondok Bambu':'폰독 밤부','Pondok Kelapa':'폰독 끌라빠','Pondok Kopi':'폰독 꼬삐',
'Bali Mester':'발리 메스떠르','Bidara Cina':'비다라 찌나','Cipinang Besar Selatan':'찌삐낭 브사르 슬라딴','Cipinang Besar Utara':'찌삐낭 브사르 우따라','Cipinang Cempedak':'찌삐낭 쯤쁘닥','Cipinang Muara':'찌삐낭 무아라','Kampung Melayu':'깜뿡 믈라유','Rawa Bunga':'라와 붕아',
'Kayu Manis':'까유 마니스','Kebon Manggis':'끄본 망기스','Pal Meriem':'빨 므리엠','Pisangan Baru':'삐상안 바루','Utan Kayu Selatan':'우딴 까유 슬라딴','Utan Kayu Utara':'우딴 까유 우따라',
'Cipinang':'찌삐낭','Jati':'자띠','Jatinegara Kaum':'자띠느가라 까움','Kayu Putih':'까유 뿌띠','Pisangan Timur':'삐상안 띠무르','Pulo Gadung':'뿔로 가둥','Rawamangun':'라와망운',
// 중부
'Cempaka Putih Barat':'쯤빠까 뿌띠 바랏','Cempaka Putih Timur':'쯤빠까 뿌띠 띠무르','Rawa Sari':'라와 사리',
'Cideng':'찌등','Duri Pulo':'두리 뿔로','Gambir':'감비르','Kebon Kelapa':'끄본 끌라빠','Petojo Selatan':'쁘또조 슬라딴','Petojo Utara':'쁘또조 우따라',
'Galur':'갈루르','Johar Baru':'조하르 바루','Kampung Rawa':'깜뿡 라와','Tanah Tinggi':'따나 띵기',
'Cempaka Baru':'쯤빠까 바루','Gunung Sahari Selatan':'구눙 사하리 슬라딴','Harapan Mulya':'하라빤 물리아','Kebon Kosong':'끄본 꼬송','Kemayoran':'끄마요란','Serdang':'스르당','Sumur Batu':'수무르 바뚜','Utan Panjang':'우딴 빤장',
'Cikini':'찌끼니','Gondangdia':'곤당디아','Kebon Sirih':'끄본 시리','Menteng':'믄뗑','Pegangsaan':'쁘강사안',
'Gunung Sahari Utara':'구눙 사하리 우따라','Karang Anyar':'까랑 아냐르','Kartini':'까르띠니','Mangga Dua Selatan':'망가 두아 슬라딴','Pasar Baru':'빠사르 바루',
'Bungur':'붕우르','Kenari':'끄나리','Kramat':'끄라맛','Kwitang':'끄위땅','Paseban':'빠스반','Senen':'스넨',
'Bendungan Hilir':'븐둥안 힐리르','Gelora':'겔로라','Kampung Bali':'깜뿡 발리','Karet Tengsin':'까렛 뗑신','Kebon Kacang':'끄본 까짱','Kebon Melati':'끄본 믈라띠','Petamburan':'쁘땀부란',
// 서부
'Cengkareng Barat':'쯩까렝 바랏','Cengkareng Timur':'쯩까렝 띠무르','Duri Kosambi':'두리 꼬삼비','Kapuk':'까뿍','Kedaung Kali Angke':'끄다웅 깔리 앙꺼','Rawa Buaya':'라와 부아야',
'Grogol':'그로골','Jelambar':'즐람바르','Jelambar Baru':'즐람바르 바루','Tanjung Duren Selatan':'딴중 두렌 슬라딴','Tanjung Duren Utara':'딴중 두렌 우따라','Tomang':'또망','Wijaya Kesuma':'위자야 끄수마',
'Kalideres':'깔리데레스','Kamal':'까말','Pegadungan':'쁘가둥안','Semanan':'스마난','Tegal Alur':'뜨갈 알루르',
'Duri Kepa':'두리 끄빠','Kebon Jeruk':'끄본 즈룩','Kedoya Selatan':'끄도야 슬라딴','Kedoya Utara':'끄도야 우따라','Kelapa Dua':'끌라빠 두아','Sukabumi Selatan':'수까부미 슬라딴','Sukabumi Utara':'수까부미 우따라',
'Joglo':'조글로','Kembangan Selatan':'끔방안 슬라딴','Kembangan Utara':'끔방안 우따라','Meruya Selatan':'므루야 슬라딴','Meruya Utara':'므루야 우따라','Srengseng':'스렝승',
'Jati Pulo':'자띠 뿔로','Kemanggisan':'끄망기산','Kota Bambu Selatan':'꼬따 밤부 슬라딴','Kota Bambu Utara':'꼬따 밤부 우따라','Palmerah':'빨메라','Slipi':'슬리삐',
'Glodok':'글로독','Keagungan':'끄아궁안','Krukut':'끄루꿋','Mangga Besar':'망가 브사르','Maphar':'마파르','Pinangsia':'삐낭시아','Taman Sari':'따만 사리','Tangki':'땅끼',
'Angke':'앙꺼','Duri Selatan':'두리 슬라딴','Duri Utara':'두리 우따라','Jembatan Besi':'즘바딴 브시','Jembatan Lima':'즘바딴 리마','Kalianyar':'깔리아냐르','Krendang':'끄렌당','Pekojan':'쁘꼬잔','Roa Malaka':'로아 말라까','Tambora':'땀보라','Tanah Sereal':'따나 스레알',
// 북부
'Cilincing':'찔린찡','Kali Baru':'깔리 바루','Marunda':'마룬다','Rorotan':'로로딴','Semper Barat':'슴뻐르 바랏','Semper Timur':'슴뻐르 띠무르','Suka Pura':'수까 뿌라',
'Kelapa Gading Barat':'끌라빠 가딩 바랏','Kelapa Gading Timur':'끌라빠 가딩 띠무르','Pegangsaan Dua':'쁘강사안 두아',
'Koja':'꼬자','Lagoa':'라고아','Rawa Badak Selatan':'라와 바닥 슬라딴','Rawa Badak Utara':'라와 바닥 우따라','Tugu Selatan':'뚜구 슬라딴','Tugu Utara':'뚜구 우따라',
'Ancol':'안쫄','Pademangan Barat':'빠드망안 바랏','Pademangan Timur':'빠드망안 띠무르',
'Kamal Muara':'까말 무아라','Kapuk Muara':'까뿍 무아라','Pejagalan':'쁘자갈란','Penjaringan':'쁜자링안','Pluit':'쁠루잇',
'Kebon Bawang':'끄본 바왕','Papanggo':'빠빵고','Sungai Bambu':'숭아이 밤부','Sunter Agung':'순떠르 아궁','Sunter Jaya':'순떠르 자야','Tanjung Priok':'딴중 쁘리옥','Warakas':'와라까스',
// 천 개의 섬
'Pulau Pari':'뿔라우 빠리','Pulau Tidung':'뿔라우 띠둥','Pulau Untung Jawa':'뿔라우 운뚱 자와','Pulau Harapan':'뿔라우 하라빤','Pulau Kelapa':'뿔라우 끌라빠','Pulau Panggang':'뿔라우 빵강'});
Object.assign(KNOTE,{
'Senayan':'SCBD(수디르만 중앙업무지구)와 퍼시픽 플레이스가 있는 동. GBK 경기장 단지는 북쪽 Tanah Abang 구 Gelora 동',
// 남부 보강
'Tebet Timur':'테벳 카페 거리와 주택가','Tebet Barat':'테벳 에코 파크와 맞닿은 주거지','Manggarai':'망가라이 환승역(KRL·공항철도)과 수문이 있는 동. 찌리웅강 주변 침수 주의','Bukit Duri':'찌리웅강변 저지대, 범람 상습 지역','Menteng Atas':'Kota Kasablanka 몰 인근 주거지','Karet Kuningan':'꾸닝안 업무지구, 대사관 밀집','Karet Semanggi':'스망기 교차로와 쁠라자 스망기','Pasar Manggis':'Kota Kasablanka 몰이 있는 동','Guntur':'도심과 가까운 오래된 주거지','Petogogan':'끄바요란 바루 남동쪽 주거지, 끄망과 가까움','Rawa Barat':'세노빠띠(Senopati) 상권 일부','Kramat Pela':'끄바요란 바루 주택가','Pulo':'블록 M 남쪽, 다르마와사 인근 고급 주거지','Grogol Utara':'심프룩 북쪽 주거지','Cipulir':'Cipulir 시장과 서민 주거지','Kebayoran Lama Selatan':'Kebayoran Lama 시장·역 주변','Duren Tiga':'빤쪼란 남쪽 주거지','Pengadegan':'찌리웅강 서쪽 주거지','Rawajati':'깔리바따역 남쪽 강변 주거지','Cikoko':'MRT·LRT 환승 구간에 가까운 작은 동','Pejaten Barat':'Pejaten Village 몰 인근 주거지','Pejaten Timur':'찌리웅강 동쪽 주거지','Jati Padang':'빠사르 밍구 서쪽 주거지','Pasar Minggu':'빠사르 밍구 시장·역','Kebagusan':'남쪽 녹지 주거지','Tanjung Barat':'KRL 역과 TB Simatupang 대로','Srengseng Sawah':'세투 바바깐 브따위 문화마을, UI와 가까움','Cipedak':'데뽁 경계 녹지 주거지','Ciganjur':'남쪽 끝 녹지 주거지','Jagakarsa':'외곽 단독주택지','Ulujami':'서남쪽 주거지','Pesanggrahan':'뻐상그라한강 주변 주거지','Petukangan Utara':'빈따로 북쪽 주거지','Petukangan Selatan':'빈따로와 맞닿은 주거지','Tegal Parang':'맘빵 대로 주변 주거지','Mampang Prapatan':'맘빵 대로 상권',
// 동부
'Pulo Gebang':'자카르타 최대 버스터미널(Terminal Terpadu Pulo Gebang)','Rawa Terate':'풀로가둥 공단(JIEP) 일부','Cakung Timur':'동쪽 경계, 신흥 주거단지','Ujung Menteng':'브카시와 맞닿은 동쪽 끝','Penggilingan':'짜꿍 서부 주거지','Klender':'Klender 시장과 KRL 역','Pondok Kelapa':'깔리말랑 운하 남쪽 중산층 주거지','Pondok Bambu':'깔리말랑 주변 주거지, 상가 밀집','Pondok Kopi':'동쪽 KRL 역 주변 주거지','Bali Mester':'자띠느가라역과 Pasar Jatinegara','Kampung Melayu':'버스웨이 환승 거점, 찌리웅강 범람 상습 지역','Bidara Cina':'찌리웅강변, 침수 상습 지역','Cipinang Besar Utara':'찌삐낭 교도소가 있는 동','Rawa Bunga':'자띠느가라 북쪽 주거지','Utan Kayu Utara':'마뜨라만 북쪽 오래된 주거지','Rawamangun':'자카르타주립대(UNJ)와 경기장, 조용한 중산층 주거지','Kayu Putih':'Pulomas 호수·경마장 일대 주택가','Pulo Gadung':'공단 이름의 유래가 된 동','Jatinegara Kaum':'풀로가둥 쪽 주거지','Cililitan':'PGC 몰과 교통 요충','Kampung Tengah':'대형 도매시장(Pasar Induk Kramat Jati) 인근','Kramat Jati':'끄라맛 자띠 시장 주변','Batu Ampar':'톨도로 교차부 주거지','Pinang Ranti':'버스웨이 종점 인근','Makasar':'할림 남쪽 주거지','Bambu Apus':'타만 미니(TMII) 남쪽','Lubang Buaya':'1965년 사건 기념비(Monumen Pancasila Sakti)','Cilangkap':'국군 본부(Mabes TNI)가 있는 동','Setu':'동쪽 경계 녹지','Munjul':'찌빠융 남쪽 주거지','Pondok Ranggon':'공동묘지와 녹지가 있는 외곽','Cibubur':'찌부부르 캠핑장(Bumi Perkemahan)','Kelapa Dua Wetan':'경찰 기동대(Brimob) 본부 인근','Rambutan':'깜뿡 람부딴 버스터미널','Ciracas':'외곽 주거지','Susukan':'외곽 주거지','Cijantung':'특수부대(Kopassus) 주둔지와 상가','Gedong':'TB Simatupang 대로 동쪽 주거지','Kalisari':'외곽 녹지 주거지','Pekayon':'외곽 주거지','Baru':'빠사르 레보 시장 인근',
// 중부
'Menteng':'멘뗑 공원·수로노 거리, 대사관 관저가 있는 부촌','Gondangdia':'곤당디아역, 멘뗑 북쪽 저택가','Cikini':'예술센터 TIM과 오래된 카페, 찌끼니역','Kebon Sirih':'잘란 잭사(Jaksa) 배낭여행자 거리, 시청 인근','Pegangsaan':'독립 선언 기념지(Tugu Proklamasi)','Gambir':'모나스·대통령궁·감비르역','Kebon Kelapa':'모나스 서쪽 관청가','Petojo Selatan':'도심 서쪽 주거지','Petojo Utara':'하르모니(Harmoni) 교차로 일대','Cideng':'도심 서쪽 오래된 주거지','Duri Pulo':'도심 서북쪽 주거지','Kampung Bali':'Pasar Tanah Abang 도매시장','Kebon Melati':'탐린 거리, Thamrin City·Grand Indonesia 인근','Kebon Kacang':'탐린 서쪽, 고층 아파트','Gelora':'겔로라 붕 까르노(GBK) 경기장 단지, Plaza Senayan','Bendungan Hilir':'벤힐 시장과 도심 주거지, 수디르만 대로와 가까움','Karet Tengsin':'수디르만 대로 서쪽 고층 아파트','Petamburan':'도심 서쪽 주거지','Senen':'Pasar Senen과 스넨역','Kwitang':'헌책 시장으로 알려진 거리','Kenari':'인도네시아대학교(UI) 살렘바 캠퍼스·의대','Kramat':'살렘바·끄라맛 대로, 병원','Paseban':'오래된 주거지','Bungur':'스넨 북쪽 주거지','Pasar Baru':'옛 상업 중심 Pasar Baru 거리','Mangga Dua Selatan':'망가 두아 도매상가 남쪽','Karang Anyar':'숍하우스 밀집','Kartini':'숍하우스 밀집','Gunung Sahari Utara':'구눙 사하리 대로 북쪽','Kemayoran':'끄마요란 옛 공항 터 일부','Gunung Sahari Selatan':'구눙 사하리 대로 남쪽','Kebon Kosong':'끄마요란 북서쪽 주거지','Tanah Tinggi':'매우 밀집한 서민 주거지','Cempaka Putih Timur':'정돈된 중산층 주택가','Cempaka Putih Barat':'중산층 주택가','Rawa Sari':'쯤빠까 뿌띠 남쪽 주거지',
// 서부
'Glodok':'차이나타운, 전자상가·사원·골목 음식','Pinangsia':'코타 투아(옛 바타비아) 남쪽, 꼬따역 인근','Mangga Besar':'야간 상권·유흥가','Taman Sari':'옛 성곽 남쪽 밀집 주거지','Roa Malaka':'코타 투아 서쪽 옛 창고가','Pekojan':'아랍계 옛 마을과 오래된 모스크','Angke':'앙꺼강 주변 밀집 주거지','Tambora':'매우 밀집한 서민 주거지','Tanjung Duren Selatan':'Central Park·Neo Soho 몰','Tanjung Duren Utara':'대학가 하숙(kos)·식당 밀집','Grogol':'트리삭티대학교, 그로골 버스 환승','Tomang':'또망 톨게이트 교차로','Jelambar':'그로골 북쪽 주거지','Wijaya Kesuma':'서쪽 주거지','Slipi':'슬리삐 업무지구, 고층 빌딩','Palmerah':'빨메라역, 언론사(Kompas Gramedia)','Kemanggisan':'BINUS 대학 캠퍼스와 학생 하숙촌','Kota Bambu Utara':'빨메라 북쪽 밀집 주거지','Kedoya Utara':'방송국이 모인 곳','Kedoya Selatan':'끄도야 남쪽 주거지','Kebon Jeruk':'Kebon Jeruk 대로 주거지','Kelapa Dua':'서쪽 톨도로 인근 주거지','Duri Kepa':'Green Ville 등 주거단지','Sukabumi Selatan':'서부 중산층 주거지','Kembangan Selatan':'Puri Indah Mall과 계획 주거지(뿌리 인다)','Kembangan Utara':'뿌리 인다 북쪽 주거지','Meruya Utara':'므루야 주거지, 대학(Mercu Buana) 인근','Meruya Selatan':'므루야 남쪽 주거지','Joglo':'서남쪽 외곽 주거지','Srengseng':'서쪽 주거지','Kapuk':'저지대 밀집 주거지, 침수 주의','Cengkareng Timur':'쯩까렝 중심 주거지','Rawa Buaya':'공항 톨도로 인근','Duri Kosambi':'서쪽 주거지','Kalideres':'깔리데레스 버스터미널','Kamal':'서쪽 끝 저지대','Tegal Alur':'공항 방면 외곽 주거지','Semanan':'서쪽 외곽 주거지','Pegadungan':'서쪽 외곽 주거지',
// 북부
'Kamal Muara':'신도시 PIK(Pantai Indah Kapuk) 서쪽','Kapuk Muara':'PIK 일부, 고급 주택과 상가','Pluit':'플루잇 주거지와 저수지, Pluit Village·Emporium 몰. 지반 침하 진행','Penjaringan':'순다 끌라빠 옛 항구, 무아라 앙꺼 어시장','Pejagalan':'북서쪽 주거·상가','Ancol':'안콜 드림랜드 해변·놀이공원','Pademangan Barat':'안콜 남쪽 주거지','Pademangan Timur':'끄마요란 북쪽 주거지','Sunter Agung':'순떠르 호수 주변 중산층 주거지','Sunter Jaya':'순떠르 남쪽 주거지','Tanjung Priok':'딴중 쁘리옥 항과 옛 역','Papanggo':'순떠르 서쪽 주거지','Kelapa Gading Timur':'Mall Kelapa Gading 일대','Kelapa Gading Barat':'끌라빠 가딩 서쪽 주거지','Pegangsaan Dua':'끌라빠 가딩 동쪽 신흥 주거지','Koja':'Koja 병원','Tugu Utara':'항만 배후 주거지','Marunda':'마룬다 항·공단, 역사 유적 루마 시 삐뚱(Rumah Si Pitung)','Kali Baru':'항만 확장 구역과 어촌','Cilincing':'어촌과 공단','Rorotan':'동북쪽 신흥 주거지','Semper Barat':'서민 주거지','Semper Timur':'서민 주거지','Suka Pura':'주거지',
// 천 개의 섬
'Pulau Panggang':'군 행정 중심 쁘라무까섬(Pulau Pramuka)이 속한 동','Pulau Tidung':'다리로 이어진 띠둥 섬, 주말 여행지','Pulau Pari':'하얀 모래 해변과 민박','Pulau Untung Jawa':'본토와 가장 가까운 섬','Pulau Harapan':'북쪽 섬 마을','Pulau Kelapa':'북쪽 섬 마을'});
Object.assign(KCAT,{'Pondok Labu':'out','Kebagusan':'out','Tebet Timur':'exp','Menteng Atas':'biz','Pasar Manggis':'biz','Rawa Barat':'lux','Pulo':'lux','Srengseng Sawah':'cul',
'Pulo Gebang':'hub','Rawa Terate':'ind','Jatinegara':'ind','Cakung Timur':'out','Ujung Menteng':'out','Bali Mester':'trad','Kampung Melayu':'hub','Rawamangun':'cul','Kayu Putih':'lux','Cililitan':'hub','Kampung Tengah':'trad','Lubang Buaya':'hub','Cilangkap':'hub','Cibubur':'tour','Rambutan':'hub','Cijantung':'hub',
'Menteng':'lux','Gondangdia':'lux','Cikini':'cul','Kebon Sirih':'biz','Gambir':'hub','Kebon Kelapa':'biz','Kampung Bali':'trad','Kebon Melati':'biz','Kebon Kacang':'biz','Gelora':'hub','Karet Tengsin':'biz','Senen':'trad','Kwitang':'trad','Kenari':'cul','Pasar Baru':'trad','Mangga Dua Selatan':'trad','Kemayoran':'hub','Gunung Sahari Selatan':'hub',
'Glodok':'trad','Pinangsia':'trad','Mangga Besar':'trad','Roa Malaka':'trad','Pekojan':'trad','Tanjung Duren Selatan':'biz','Tanjung Duren Utara':'cul','Grogol':'cul','Tomang':'hub','Slipi':'biz','Palmerah':'hub','Kemanggisan':'cul','Kedoya Utara':'biz','Kembangan Selatan':'biz','Kembangan Utara':'lux','Joglo':'out','Kapuk':'res','Kalideres':'hub',
'Kamal Muara':'lux','Kapuk Muara':'lux','Pluit':'lux','Penjaringan':'trad','Ancol':'tour','Tanjung Priok':'hub','Kelapa Gading Timur':'biz','Koja':'hub','Marunda':'ind','Kali Baru':'ind','Cilincing':'ind','Rorotan':'out','Semper Barat':'res','Semper Timur':'res','Suka Pura':'res'});
// 시(Kota) 개요
const KOTAD={'Jakarta Pusat':['중부 자카르타','정부 청사·모나스·옛 상업지와 탐린 업무지구가 있는 도심. 오래된 시장과 밀집 주거지가 함께 있음.'],
'Jakarta Selatan':['남부 자카르타','고급 주거지와 업무지구(SCBD·꾸닝안), 외국인 생활권이 모인 곳. 조사 단지는 모두 여기에 있음.'],
'Jakarta Timur':['동부 자카르타','가장 넓고 인구가 많은 시. 서민 주거지·공단·군 시설이 많고 JIKS(찌빠융)가 있음.'],
'Jakarta Barat':['서부 자카르타','차이나타운·코타 투아 구도심부터 대학가, 뿌리 인다 신흥 주거지까지. 공항 방면.'],
'Jakarta Utara':['북부 자카르타','항구·어시장·해변 리조트와 끌라빠 가딩·PIK 주거지. 해안 침수와 지반 침하가 진행 중인 저지대.'],
'Kepulauan Seribu':['천 개의 섬','자카르타만의 섬 지역. 배로 오가는 주말 여행지.']};
