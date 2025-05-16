export interface UltraSrtNcstReq {
	nx: number;
	ny: number;
	base_date: string;
	base_time: string;
}

export interface UltraSrtNcstRes {
	header: {
		resultCode: string;
		resultMsg: string;
	};
	body: {
		dataType: "XML" | "JSON";
		items: {
			item: {
				baseDate: string;
				baseTime: string;
				category: string;
				nx: number;
				ny: number;
				obsrValue: string;
			}[];
		};
		pageNo: number;
		numOfRows: number;
		totalCount: number;
	};
}
export interface UltraSrtFcstRes {
	header: {
		resultCode: string;
		resultMsg: string;
	};
	body: {
		dataType: "XML" | "JSON";
		items: {
			item: {
				baseDate: string;
				baseTime: string;
				category: string;
				nx: number;
				ny: number;
				fcstDate: string;
				fcstTime: string;
				fcstValue: number;
			}[];
		};
		pageNo: number;
		numOfRows: number;
		totalCount: number;
	};
}

//관측데이터
export interface UltraSrtNcstItem {
	type: "observation";
	baseDate: string;
	baseTime: string;
	category: string;
	nx: number;
	ny: number;
	obsrValue: string;
}

// 예보데이터
export interface UltraSrtFcstItem {
	type: "forecast";
	baseDate: string;
	baseTime: string;
	category: string;
	nx: number;
	ny: number;
	fcstDate: string;
	fcstTime: string;
	fcstValue: number;
}
