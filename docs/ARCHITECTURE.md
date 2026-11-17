# 앱 구조 (2026-11-16 재구성)

## 1. 이전 구조의 문제

### 로직
| 문제 | 내용 | 영향 |
|---|---|---|
| 한 파일 혼재 | `index.html` 136KB에 CSS·데이터(R, PO, ZN, JD, TG…)·로직·UI가 섞임 | 수정 범위 파악 어려움, 데이터 갱신 때 로직 손상 위험 |
| 가격 출처 이중화 | 필터는 단지 요약가 `r.p`, 화면 매물은 `r.ls[].price` | 매물 가격이 바뀌어도 필터 결과는 그대로 |
| 매물 키가 배열 순서 | 매물 즐겨찾기 키 `id:코드:index` | 매물 순서가 바뀌면 즐겨찾기가 다른 매물로 옮겨감 |
| 지역 모델 4중 | ZN(원), TG(통칭), JD(동네), KCAT/CAT/JCAT, 런타임 색 덮어쓰기(TONE) | 같은 설명이 두 곳, id 매칭 예외(`sen→scb`) |
| 역 데이터 3중 | `ST`(6역, 거리 필터), `MT`(13역), `TRS`(OSM) | MRT 거리 필터가 남북선 6역만 봄 |
| 버스 데이터 3중 | `r.b`, `X`, `BUSR` | 시간표와 노선도가 따로 놀 수 있음 |
| 저장 키 난립 | `jiks-fav-v1`, `jiks_fl`, `jiks_fx`, `jiks_cost`, `where.*` | 내보내기는 단지 즐겨찾기만, 매물·조건·기록은 빠짐 |
| 전체 다시 그리기 | 필터 한 번에 동 경계 폴리곤까지 모두 다시 생성 | 슬라이더 조작 때 느림 |
| "실시간" 부재 | 매물은 손으로 넣은 정적 값, 링크는 구글 site: 검색 | 내려간 매물·바뀐 가격을 알 수 없음 |

### 화면 구조(IA)
- 사이드바 한 줄에 아코디언 10개: 찾기(조건)·결정(즐겨찾기)·지도 표시(레이어)·학습(지역 안내)이 섞여 있음
- 결과 목록이 아코디언 8개 아래에 묻힘
- 즐겨찾기가 둘로 갈라짐(매물은 맨 위, 단지는 목록 바로 위)
- 계약 가이드는 별도 페이지로 나가 앱 흐름이 끊김

## 2. 새 구조

### 사이트 맵 (2026-11-17)
하나의 웹앱(`index.html`)이 주소의 `#` 경로로 화면을 나눈다. 탭 순서는 쓰는 순서(찾는다 → 고른다 → 주변을 본다 → 계약한다)를 따른다.
```
/                         앱 하나
├─ #/find                 찾기      조건(기본·생활) → 결과 목록, 매물 자동 확인 현황   ← 첫 화면
├─ #/mine                 내 후보    단지·매물 즐겨찾기, 환율·공과금, 전체 백업
├─ #/area                 지역·교통  지역 구분·동네 안내, 철도·BRT, 통학버스 노선·시간표
├─ #/guide                계약 가이드 안내(선납금·전기 계산기)
│   └─ #/guide/check                확인 체크리스트
├─ #/map                  모바일 지도(PC는 찾기·내 후보·지역·교통 옆에 늘 지도)
└─ #/c/<단지 id>           단지로 이동(공유 링크)
/housing-guide/           예전 주소 → #/guide로 넘김
```
- 지역 데이터와 그 설명(동네 안내)을 한 탭에, 통학버스 노선과 시간표를 한 탭에 모았다.
- 매물 확인 현황은 매물을 고르는 "찾기"에 두고, 헤더의 상태 버튼이 그곳을 연다.
- 계약 가이드는 별도 페이지가 아니라 앱의 한 화면이다. 헤더·탭·색·저장(백업)을 공유한다.
- 뒤로 가기, 새로고침, 링크 공유가 화면 단위로 동작한다.

### 파일
```
index.html                     화면 뼈대(맨 위 주석에 사이트 맵)
css/app.css · css/guide.css    스타일(가이드는 #gv 안에서만)
js/core/base.js                공통 도우미·기준점
js/core/router.js              # 경로 → 화면 전환
js/data/                       데이터만: places(단지·매물), districts(자카르타 전체 시·구·동 설명), regions(통칭·동네·특징 분류), kelurahan(경계), routes(버스·철도), photos(사진)
js/features/                   기능: model, favorites, filter, regions, map, list, needs, transit, busroutes, photos, listings, guide
js/main.js                     초기화 순서
data/listings.json             매물 자동 확인 결과(배포 때 생성)
scripts/update-listings.mjs    매물 확인기
scripts/build-boundaries.py    자카르타 전체 구·동 경계 생성(GADM 4.1 + BPS 코드)
scripts/update-nearby.mjs      통학버스 정류장 주변 매물 수집(Jendela360·Pinhome 자동 + nearby-manual.json)
scripts/nearby-manual.json     자동 수집이 막힌 사이트(Rumah123·99.co·Travelio 등)에서 직접 찾은 매물
data/nearby.json               정류장 주변 매물 결과(배포 때 생성, 단지 좌표 캐시 포함)
.github/workflows/pages.yml    확인 + 배포(6시간마다, 푸시 때)
housing-guide/index.html       예전 주소 넘김
docs/ARCHITECTURE.md           이 문서
```
데이터 파일은 함수가 없고, 기능 파일은 데이터를 고치지 않는다(파생값 계산 제외).

### 저장소
모든 사용자 데이터는 `S`(js/core/util.js)를 거친다. 키는 그대로 두어 기존 기록을 잃지 않고, "전체 백업"이 모든 키(단지·매물 즐겨찾기, 메모, 생활 조건, 설비 기록, 공과금 단가)를 한 파일로 내보내고 가져온다.

매물 즐겨찾기 키는 `단지id:매물코드:URL`로 바꿨다. 이전 키(`단지id:코드:순번`)는 처음 열 때 자동 변환한다.

## 3. 매물 실시간 연동

GitHub Pages는 정적 호스팅이고 부동산 사이트는 브라우저 직접 조회(CORS)를 막는다. 그래서 서버 쪽 수집 + 정적 JSON 방식을 쓴다.

```
GitHub Actions (6시간마다, 수동 실행 가능)
  └ scripts/update-listings.mjs
      1. js/data/places.js의 매물 URL마다 접속 → 살아 있음/내려감, 현재 가격 추출
      2. 단지 목록 페이지(Jendela360·Travelio 등)에서 새 매물 코드·가격 발견
      3. data/listings.json 저장 → 커밋 → Pages 배포
브라우저
  └ js/features/listings.js
      1. data/listings.json을 캐시 없이 읽음(열 때, 탭 복귀 때, 30분마다)
      2. 내려간 매물 표시, 바뀐 가격 반영, 새 매물을 단지 팝업·목록에 추가
      3. 필터의 최저 월세를 살아 있는 매물 가격으로 다시 계산
      4. 헤더에 "매물 n시간 전 확인" 표시, 찾기 탭 "매물 자동 확인 현황"에 사이트별 결과
```
수집이 실패한 사이트는 이전 값을 유지하고 실패로 표시한다. 사이트 구조가 바뀌면 `scripts/update-listings.mjs`의 추출 규칙(`extract*`)을 고친다.

## 4. 통학버스 정류장 주변 매물

```
scripts/update-nearby.mjs (Actions 6시간마다)
  1. js/data/routes.js의 모든 탑승 지점(BUSR) 좌표
  2. Jendela360 지역 페이지 → 단지 목록, 단지 페이지의 좌표로 정류장 거리 계산(좌표는 30일 캐시)
  3. 반경 1.2km 안 단지: Jendela360 임대 매물 + Pinhome 단지 페이지(JSON-LD) 임대 매물
  4. scripts/nearby-manual.json(Rumah123·99.co·Travelio·properti1 직접 조사, 확인 날짜 포함) 합치기
  5. data/nearby.json
js/features/nearby.js
  "찾기" 탭 "버스 정류장 주변 매물": 반경·노선·정렬, 예산·방 조건, 지도 표시
  단지마다 Rumah123·99.co·Travelio·Mamikos·Pinhome·OLX 실시간 검색 링크
```
Rumah123·99.co는 자동 접속을 막아(Cloudflare) 자동 수집하지 않는다. 직접 찾은 매물은 수동 파일에 넣고 확인 날짜를 표시한다.
