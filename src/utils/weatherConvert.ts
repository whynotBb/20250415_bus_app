import { UltraSrtFcstRes, UltraSrtNcstRes } from "../models/weather";

/**
 * VEC 값에 따른 풍향 한글 표기 반환
 * @param vec
 * @returns
 */
export const vecToTxt = (vec: string | undefined): string => {
	if (vec !== undefined) {
		const value = Number(vec);
		if (value >= 0 && value < 45) return "북풍";
		if (value >= 45 && value < 90) return "북동풍";
		if (value >= 90 && value < 135) return "동풍";
		if (value >= 135 && value < 180) return "남동풍";
		if (value >= 180 && value < 225) return "남풍";
		if (value >= 225 && value < 270) return "남서풍";
		if (value >= 270 && value < 315) return "서풍";
		if (value >= 315 && value < 360) return "북서풍";
		return "-"; // 예외 처리
	} else {
		return "-";
	}
};

/**
 * 단기 예보 발표 시각 1일 8회이므로, 현재시각이 발표 시각에서 경과하였다면 이전 발표 시각으로 basetime 지정
 * Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
 * 00~01은 어제 23시 조회 값 가져오기 위해 23 설정
 * @param hour
 * @returns
 */
export const vilageBaseTime = (hour: number): number => {
	console.log("vilageBaseTime", hour);
	if (hour !== undefined) {
		if (hour >= 0 && hour < 2) return 23;
		if (hour >= 2 && hour < 5) return 2;
		if (hour >= 5 && hour < 8) return 5;
		if (hour >= 8 && hour < 11) return 8;
		if (hour >= 11 && hour < 14) return 11;
		if (hour >= 14 && hour < 17) return 14;
		if (hour >= 17 && hour < 20) return 17;
		if (hour >= 20 && hour < 23) return 20;
		return 23;
	} else {
		return hour;
	}
};

/**
 * 날씨 데이터를 받아와 category의 value 반환
 * @param data : 날씨 데이터
 * @param category : 카테고리값
 * @returns
 */
export const getValueByCategory = (data: UltraSrtNcstRes | UltraSrtFcstRes, category: string): string | null => {
	if (!data) return null;

	const t1hItem = data.body.items.item.find((item) => item.category === category);

	if (!t1hItem) return null;

	// Type narrowing을 통해 안전하게 처리
	if ("obsrValue" in t1hItem) {
		return t1hItem.obsrValue;
	}

	if ("fcstValue" in t1hItem) {
		return t1hItem.fcstValue;
	}

	return null;
};

/**
 *
 * @param data : 날씨 데이터 중 item만 보낼 경우
 * @param category
 * @returns
 */
interface vilageItems {
	baseDate: string;
	baseTime: string;
	category: string;
	fcstDate: string;
	fcstTime: string;
	fcstValue: string;
	nx: number;
	ny: number;
}
export const getValueByCategorySm = (data: vilageItems[], category: string): string | undefined => {
	if (!data) return "";

	return data.find((item) => item.category === category)?.fcstValue;
};
