import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = "http://24.199.78.175/api/";

interface Error404 {
  name: string;
  message: string;
}

const messageErrors: any = {
  LOAD_DATA_ERROR: "Error al cargar los datos",
};

let httpClient = axios.create({
  baseURL: baseURL,
});

httpClient.interceptors.request.use(
  function (config) {
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
      toast.error("Error de validación, por favor revisa los campos");
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
