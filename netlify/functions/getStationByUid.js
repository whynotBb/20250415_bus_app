// ESM 방식으로 변경: import 사용
import { callBusApi } from "./apiHelper.js"; // .js 확장자를 명시적으로 추가합니다.

export const handler = async function (event, context) {
  const { arsId, serviceKey } = event.queryStringParameters;

  const params = { serviceKey, arsId };
  return await callBusApi("/stationinfo/getStationByUid", params);
};
