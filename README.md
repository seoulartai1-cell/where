# JIKS 통학버스 주거지 찾기

단일 HTML 페이지 (Leaflet + OpenStreetMap). 빌드 없음.

## 배포 (GitHub Pages)
1. 이 폴더 내용을 저장소 루트에 올린다.
2. Settings → Pages → Source를 "GitHub Actions"로 지정한다.
3. main에 푸시하면 `.github/workflows/pages.yml`이 배포한다.

## 구조
- PC: 왼쪽 사이드바(필터·목록) + 오른쪽 지도. 모바일: 지도 / 목록·필터 탭.
- 외부 API 없음. 지도 타일(OpenStreetMap)만 사용한다.
- 색: 파랑(통과 단지)·회색(제외·시설·구역)·빨강(JIKS)·노랑(즐겨찾기).
- 즐겨찾기는 브라우저 localStorage에 저장한다.

## 주거 계약 가이드
`housing-guide/index.html` — 인도네시아 임대차 계약 안내와 확인 체크리스트. 배포 후 `/housing-guide/`에서 열린다.
