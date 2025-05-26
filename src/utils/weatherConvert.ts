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
		return "무풍"; // 예외 처리
	} else {
		return "-";
	}
};
