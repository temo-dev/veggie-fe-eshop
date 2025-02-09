
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategories = async () => {
	const {
		data: { data },
	} = await http.get(API_ENDPOINTS.MENU);
	return data;
};
export const useCategoriesQuery = () => {
	return useQuery([API_ENDPOINTS.CATEGORIES],fetchCategories);
};
