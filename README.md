# JIKS 통학버스 주거지 찾기

단일 HTML 페이지 (Leaflet + OpenStreetMap). 빌드 없음.

## 배포 (GitHub Pages)
1. 이 폴더 내용을 저장소 루트에 올린다.
2. Settings → Pages → Source를 "GitHub Actions"로 지정한다.
3. main에 푸시하면 `.github/workflows/pages.yml`이 배포한다.

## 생활 조건 옵션
- 필수·선호 선택: 필수는 미충족 시 제외, 선호는 충족 수로 정렬한다.
- 주변 인프라(슈퍼마켓·편의점·병원·약국·세탁소·공원·한식당·ATM): 브라우저가 Overpass API(OpenStreetMap)에서 불러와 반경 안 개수를 집계한다. 결과는 7일간 localStorage에 저장한다.
- 설비·계약 항목(보안·침수·에어컨·주차 등): 단지 팝업에서 ✓·✗로 기록한다. 기록은 해당 브라우저의 localStorage에만 저장된다.

## 주거 계약 가이드
`housing-guide/index.html` — 인도네시아 임대차 계약 안내와 확인 체크리스트. 배포 후 `/housing-guide/`에서 열린다.

## 화면 구조
- PC: 왼쪽 사이드바(정렬·필터·즐겨찾기·목록·안내) + 오른쪽 전체 지도의 2열 격자.
- 모바일(860px 이하): 상단 "지도 / 목록·필터" 탭 전환.
- 필터는 접이식 그룹(기본 조건·생활 조건·지도 표시)으로 묶고, 결과 수와 정렬은 사이드바 상단에 고정한다.

경계 데이터: GADM v3.6(2019)을 단순화한 파생 데이터(kel.js). GADM은 비영리 용도로 제공되는 데이터입니다.
