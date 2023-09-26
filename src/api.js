// api.js
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const postToJSONPlaceholder = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
