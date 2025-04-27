import axios from "axios";

export async function handler(event) {
  const { tmX, tmY, radius } = event.queryStringParameters;

  try {
    const response = await axios.get("https://ws.bus.go.kr/api/rest/stationinfo/getStationByPos", {
      params: {
        serviceKey: import.meta.env.SEOUL_BUS_API_KEY,
        tmX,
        tmY,
        radius,
      },
      responseType: "text",
    });

    return {
      statusCode: 200,
      body: response.data,
    };
  } catch (error) {
    console.error("Netlify Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
