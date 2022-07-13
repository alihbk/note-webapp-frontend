import axios from "axios";
import { baseUrl } from "../utility/const";

export const axiosContext = () => {
  const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error", error);
      let res = error.response;
      if (res.status === 401) {
        window.location.href = "/401";
      }
      return Promise.reject(error);
    }
  );

  return axiosClient;
};
