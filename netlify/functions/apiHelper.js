import axios from "axios";

export const callBusApi = async (endpoint, params) => {
  try {
    const url = `https://ws.bus.go.kr/api/rest${endpoint}`;
    console.log("API URL:", url); // URL 확인
    console.log("Params:", params); // 파라미터 확인

    const response = await axios.get(url, { params });

    console.log("API Response:", response.data); // API 응답 확인
    return response.data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    return { error: "API 호출 실패" }; // 오류 발생 시 반환
  }
};
