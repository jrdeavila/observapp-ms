import TokenData from "@/pages/authentication/models/tokenData";
import axios from "axios";
import { toast } from "react-toastify";
import { Error404, handleValidationError, messageErrors } from "./handlerError";

export const baseURL = "http://24.199.78.175/api/";

let httpClient = axios.create({
  baseURL: baseURL,
});

httpClient.interceptors.request.use(
  function (config) {
    let strToken = localStorage.getItem("token");
    let tokenData: TokenData | null = strToken ? JSON.parse(strToken) : null;
    config.headers["Authorization"] = `Bearer ${tokenData?.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 422) {
      handleValidationError(error);
    }
    if (error.response.status === 404) {
      toast.error("No se encontró el recurso solicitado");
    }
    if (error.response.status === 401) {
      toast.error("No tienes permisos para realizar esta acción");
    }
    if (error.response.status === 400) {
      let err: Error404 = error.response.data;
      toast.error(messageErrors[err.name] || err.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
