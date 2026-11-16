# JIKS 통학버스 주거지 찾기

단일 HTML 페이지 (Leaflet + OpenStreetMap). 빌드 없음.

## 배포 (GitHub Pages)
1. 이 폴더 내용을 저장소 루트에 올린다.
2. Settings → Pages → Source를 "GitHub Actions"로 지정한다.
3. main에 푸시하면 `.github/workflows/pages.yml`이 배포한다.

## 구조
- PC: 왼쪽 사이드바(필터·목록) + 오른쪽 지도. 모바일: 지도 / 목록·필터 탭.
- 외부 API 없음. 지도 타일(OpenStreetMap)만 사용한다. 노선·역 데이터는 `routes.js`에 내장되어 있다.
- 색: 파랑(통과 단지)·회색(제외·시설·구역)·빨강(JIKS)·노랑(즐겨찾기).
- 즐겨찾기는 브라우저 localStorage에 저장한다.

## 주거 계약 가이드
`housing-guide/index.html` — 인도네시아 임대차 계약 안내와 확인 체크리스트. 배포 후 `/housing-guide/`에서 열린다.

## 통학 버스 노선도·철도
- "통학 버스 노선도": 노선별로 켜고 끈다. 전체 켜기·끄기, 정류장 이름·시각(확대 시) 표시도 따로 고른다. 노선은 정류장을 시간 순서로 이어 JIKS까지 간 도로 경로 추정(OSRM·OpenStreetMap)이며 실제 경로와 다를 수 있다. 노선 번호는 시간표 블록 순서로 추정했다. 점선 원은 단지 위치를 찾지 못한 대략 위치다.
- "철도·지하철": LRT·KRL·공항철도·고속철·MRT 2단계(미개통) 역과 노선을 종류별로 켜고 끈다. MRT 남북선은 "지도 표시"의 MRT 칩이다. 역 좌표는 Wikidata이고 노선선은 역 순서를 추정해 이은 것이다.
- 데이터는 `routes.js`(`BUSR`, `TRS`). 갱신하려면 해당 변수를 수정한다.
