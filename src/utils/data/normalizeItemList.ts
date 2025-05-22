/**
 * XML > JSON 데이터 변환 시 리스트가 2개 이상이면 배열, 1개면 객체로 반환되는 특성 있음
 * 1개일때도 배열로 반환해주는 함수
 * @param itemList
 * @returns
 */
export const normalizeItemList = <T>(itemList: T[] | T | undefined | null): T[] => {
	if (!itemList) return [];
	return Array.isArray(itemList) ? itemList : [itemList];
};
