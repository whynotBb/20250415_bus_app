export type ILocation = {
  latitude: number;
  longitude: number;
};
export interface GetStationsByPosRequest extends ILocation {
  radius: number;
}

export interface StationItem {
  arsId: number; //정류소 고유번호
  dist: number; //거리
  gpsX: number; //정류소 좌표X (GRS80)
  gpsY: number; //정류소 좌표Y (GRS80)
  posX: number; //정류소 좌표X (WGS84)
  posY: number; //정류소 좌표Y (WGS84)
  stationId: number; //정류소 ID
  stationNm: string; //정류소명
  stationTp: number; //정류소타입 (0:공용, 1:일반형 시내/농어촌버스, 2:좌석형 시내/농어촌버스, 3:직행좌석형 시내/농어촌버스, 4:일반형 시외버스, 5:좌석형 시외버스, 6:고속형 시외버스, 7:마을버스)
}

export interface StationByUidItem {
  adirection: string; //방향
  arrmsg1: string; //첫번째도착예정버스의 도착정보메시지
  arrmsg2: string; //두번째도착예정버스의 도착정보메시지
  arrmsgSec1: string; //첫번째도착예정버스의 도착정보메시지
  arrmsgSec2: string; //두번째도착예정버스의 도착정보메시지
  arsId: number; //정류소 번호
  busRouteAbrv: string; //노선 약칭
  busRouteId: number; //노선ID
  busType1: number; //첫번째도착예정버스의 차량유형 (0:일반버스, 1:저상버스, 2:굴절버스)
  busType2: number;
  congestion1: number;
  congestion2: number;
  deTourAt: number; //해당노선 우회여부(00: 정상, 11: 우회)
  firstTm: number;
  gpsX: number; //정류소 좌표X (WGS84)
  gpsY: number; // 정류소 좌표Y (WGS84)
  isArrive1: number; //첫번째도착예정버스의 최종 정류소 도착출발여부
  isArrive2: number; //두번째도착예정버스의 최종 정류소 도착출발여부
  isFullFlag1: number; //첫번째도착예정버스의 만차여부
  isFullFlag2: number; //두번째도착예정버스의 만차여부
  isLast1: number; //첫번째도착예정버스의 막차여부 (0:막차아님, 1:막차)
  isLast2: number;
  lastTm: number;
  nextBus: string;
  nxtStn: string;
  posX: number;
  posY: number;
  rerdieDiv1: number;
  rerdieDiv2: number;
  rerideNum1: number;
  rerideNum2: number;
  routeType: number;
  rtNm: string; // 노선명
  sectNm: string;
  sectOrd1: number;
  sectOrd2: number;
  stId: number; //정류소 고유 ID
  stNm: string; //정류소명
  staOrd: number;
  stationNm1: string;
  stationTp: number; //정류소 타입(0:공용, 1:일반형 시내/농어촌버스, 2:좌석형 시내/농어촌버스, 3:직행좌석형 시내/농어촌버스, 4:일반형 시외버스, 5:좌석형 시외버스, 6:고속형 시외버스, 7:마을버스)
  term: number;
  traSpd1: number;
  traSpd2: number;
  traTime1: number;
  traTime2: number;
  vehId1: number;
  vehId2: number;
}

export interface GetStationsByPosResponse<T> {
  ServiceResult: {
    comMsgHeader: string;
    msgHeader: {
      headerCd: number;
      headerMsg: string;
      itemCount: number;
    };
    msgBody: {
      itemList: T[];
    };
  };
}
