import { API_URL } from "../utils/constants";

export async function getLastProductApi(limit = 20) {
  try {
    const url = `${API_URL}/products?_limit=${limit}&_sort=createAt:DESC`; //querys strapi
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductAPi(id) {
  try {
    const url = `${API_URL}/products/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
