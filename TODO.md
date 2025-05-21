-   [ ] Layout

    -   [x] Router setting
    -   [x] 다크/라이트모드

-   [ ] HOME

    -   [x] map / text 모드 탭메뉴로 나누기
    -   [x] map : OpenLayers 올리기
    -   [x] v world map 적용하기
    -   [x] 현재 위치 기반 버스 정류장 정보 보여주기
    -   [ ] 지도 이동 후 현위치로 돌아오는 버튼
    -   [ ] 정류소 명칭, ID 검색기능
    -   [ ] 날씨, 미세먼지 보여주기

-   [ ] Bus Stop Detail

    -   [x] 정류장 선택 시 bottom sheet로 도착 버스 정보 제공
    -   [x] 선택 된 정류장 이미지 구분되도록 스타일 개선
    -   [ ] 선택 해제 시 정류장 하이라이트 지우기
    -   [x] 버스 정보는 15초 마다 갱신
    -   [ ] 리플레시 버튼 : 클릭 시 버스 정보 새로고침
    -   [x] 도착이 빠른 순서대로 정렬
    -   [ ] 버스 혼잡도
    -   [ ] 우회여부

-   [ ] Bus Detail

    -   [ ] 버스 클릭 시 모달팝업으로 버스 정보 보여주기
    -   [ ] 버스 정보
        -   선택한 정류장에 해당 버스의 첫차, 막차 정보 : getBustimeByStationList
        -   배차간격
        -
    -   [ ] 15초 마다 갱신 + 리플레시 기능 추가
    -   [ ] getBusPosByRtid 로 해당 노선의 차량 위치 정보 보여주기
        -   고민 필요!
            -   노선의 차량 위치를 지도로도 보여주고 싶은데
            -   맵 모드일때는 지도 / 텍스트 모드일때는 리스트로 보여줘야 할지..
            -   텍스트 팝업에서 지도 아이콘 눌러서 단독 지도 띄워 보여주는게 나을지

-   [ ] Book Mark

-   [ ] Alarm

-   [ ] Weather

*   추후 추가할 기능

-   [ ] 다국어지원 : react-i18next

*   color theme
    --primary-100:#00ADB5;
    --primary-200:#AAE3E2;
    --primary-300:#fdf6fd;
    --accent-100:#AC7DD2;
    --accent-200:#fff4ff;
    --text-100:#EEEEEE;
    --text-200:#C5C5C5;
    --bg-100:#222831;
    --bg-200:#393E46;
    --bg-300:#454e59;

\*\* 배포 시 저작권 표시 해야함 open api

-   weather icon
    \*\* https://www.iconfinder.com/iconsets/weatherful

*   https://www.iconfinder.com/search?q=weather&family=weather-forecast-icon-2
