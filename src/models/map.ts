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
export interface GetStationsByPosResponse {
	ServiceResult: {
		comMsgHeader: string;
		msgHeader: {
			headerCd: number;
			headerMsg: string;
			itemCount: number;
		};
		msgBody: {
			itemList: StationItem[];
		};
	};
}
