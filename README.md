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
