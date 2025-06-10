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
				fcstValue: string;
			}[];
		};
		pageNo: number;
		numOfRows: number;
		totalCount: number;
	};
}

//관측데이터
export interface UltraSrtNcstItem {
	// type: "observation";
	baseDate: string;
	baseTime: string;
	category: string;
	nx: number;
	ny: number;
	obsrValue: string;
}

// 예보데이터
export interface UltraSrtFcstItem {
	baseDate: string;
	baseTime: string;
	category: string;
	nx: number;
	ny: number;
	fcstDate: string;
	fcstTime: string;
	fcstValue: string;
}

export interface CoordToAddrRes {
	meta: {
		total_count: number;
	};
	documents: {
		road_address: {
			address_name: string;
			region_1depth_name: string;
			region_2depth_name: string;
			region_3depth_name: string;
			road_name: string;
			underground_yn: "Y" | "N";
			main_building_no: string;
			sub_building_no: string;
			building_name: string;
			zone_no: string;
		};
		address: {
			address_name: string;
			region_1depth_name: string;
			region_2depth_name: string;
			region_3depth_name: string;
			mountain_yn: "Y" | "N";
			main_address_no: string;
			sub_address_no: string;
			zip_code: string;
		};
	}[];
}
