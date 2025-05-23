/**
 * 대기오염 정보(미세먼지, 초미세, 오존) grade에 따른 텍스트 변환하여 반환하는 함수
 * @param grade 미세먼지 grade 숫자(string타입)
 * @returns
 */
export const airInfoGradeToTxt = (grade: string) => {
	switch (grade) {
		case "1":
			return "좋음";
		case "2":
			return "보통";
		case "3":
			return "나쁨";
		case "4":
			return "매우나쁨";
		default:
			return "";
	}
};
