import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = "http://localhost/api/";

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
    if (error.response.status === 422){
      toast.error("Error de validación, por favor revisa los campos");
    }
    if (error.response.status === 404){
      toast.error("No se encontró el recurso solicitado");
    }
    if (error.response.status === 401){
      toast.error("No tienes permisos para realizar esta acción");
    }
    return Promise.reject(error);
  }
);

export default httpClient;
