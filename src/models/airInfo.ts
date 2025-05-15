export interface AirInfoDataResponse {
	totalCount: number;
	pageNo: number;
	numOfRows: number;
	items?: {
		dataTime: string; //오염도측정 연-월-일 시간:분
		mangName: string; //측정망 정보(도시대기, 도로변대기, 국가배경농도, 교외대기, 항만)
		so2Value: string; //아황산가스 농도(단위: ppm)
		coValue: string; //일산화탄소 농도(단위: ppm)
		o3Value: string; //오존 농도(단위: ppm)
		no2Value: string; //이산화질소 농도(단위: ppm)
		pm10Value: string; //미세먼지(PM10) 농도(단위: ug/m3)
		pm10Value24?: string;
		pm25Value?: string; //	초미세먼지(PM2.5) 농도(단위: ug/m3)
		pm25Value24?: string; //초미세먼지(PM2.5) 24시간 예측이동농도(단위: ug/m3)
		khaiValue: string; //통합대기환경수치
		khaiGrade: string; //	통합대기환경지수 : 1~4 : 좋음/보통/나쁨/매우나쁨
		so2Grade: string; //아황산가스 지수
		coGrade: string;
		o3Grade: string;
		no2Grade: string;
		pm10Grade: string;
		pm25Grade?: string;
		pm10Grade1h?: string;
		pm25Grade1h?: string;
		so2Flag: string | null; //	측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애)
		coFlag: string | null;
		o3Flag: string | null;
		no2Flag: string | null;
		pm10Flag: string | null;
		pm25Flag: string | null;
	}[];
}
