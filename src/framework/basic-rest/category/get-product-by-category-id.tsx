
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";


const getProducts = async (category_id : string) => {
    const {
        data: { data }, 
    } = await http.put(`${API_ENDPOINTS.PRODUCT_CATEGORY}/${category_id}`);
    return data;
}
export const useGetProductByCategoryMutation = () => {
  return useMutation((input: string) => getProducts(input), {
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};