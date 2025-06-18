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

// 중기 예보 조회 req
export interface MidFcstReq {
	regId: string;
	tmFc: string;
}
export interface MidFcstRes {
	header: {
		resultCode: string;
		resultMsg: string;
	};
	body: {
		dataType: "XML" | "JSON";
		items: {
			item: {
				regId: string;
				rnSt4Am: number;
				rnSt4Pm: number;
				rnSt5Am: number;
				rnSt5Pm: number;
				rnSt6Am: number;
				rnSt6Pm: number;
				rnSt7Am: number;
				rnSt7Pm: number;
				rnSt8: number;
				rnSt9: number;
				rnSt10: number;
				wf4Am: string;
				wf4Pm: string;
				wf5Am: string;
				wf5Pm: string;
				wf6Am: string;
				wf6Pm: string;
				wf7Am: string;
				wf7Pm: string;
				wf8: string;
				wf9: string;
				wf10: string;
			}[];
		};
		pageNo: number;
		numOfRows: number;
		totalCount: number;
	};
}

export interface OpenWeatherForecastReq {
	cod: string;
	message: number;
	cnt: number;
	list: {
		dt: number;
		main: {
			temp: number;
			feels_like: number;
			temp_min: number;
			temp_max: number;
			pressure: number;
			sea_level: number;
			grnd_level: number;
			humidity: number;
			temp_kf: number;
		};
		weather: [
			{
				id: number;
				main: string;
				description: string;
				icon: string;
			}
		];
		clouds: {
			all: number;
		};
		wind: {
			speed: number;
			deg: number;
			gust: number;
		};
		visibility: number;
		pop: 0;
		sys: {
			pod: string;
		};
		dt_txt: string;
	}[];
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}

export interface OpenWeatherCurrentReq {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	rain: {
		"1h": number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}
