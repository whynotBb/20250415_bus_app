// netlify/functions/getStationByUid.js
import axios from "axios";

export const handler = async function (event, context) {
  const { arsId, serviceKey } = event.queryStringParameters;

  const url = `https://ws.bus.go.kr/api/rest/stationinfo/getStationByPos`;
  try {
    const response = await axios.get(url, {
      params: {
        serviceKey,
        arsId,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
