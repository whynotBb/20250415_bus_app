import { XMLParser } from "fast-xml-parser";

// XML을 JSON으로 변환하는 함수
export const convertXMLToJSON = async (xmlData: string) => {
	try {
		//json 으로 파싱
		const parser = new XMLParser();
		const json = parser.parse(xmlData);
		return json;
	} catch (error) {
		console.error("XML 파싱 오류:", error);
		return null;
	}
};
