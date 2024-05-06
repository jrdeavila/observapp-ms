import axios from "axios";
import MetaBaseDashboardModel from "../models/metabaseDashboard";
import { MetaBaseDashboardResponse, metaBaseDashboardModelFromResponse } from "../responses/MetabaseDashboardResponse";

export const baseURL = "http://localhost/metabase/api";

let httpMetaBaseClient = axios.create({
  baseURL: baseURL,
});


httpMetaBaseClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpMetaBaseClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchMetaBaseDashboards = async (): Promise<MetaBaseDashboardModel[]> => {
  let response = await httpMetaBaseClient.get<MetaBaseDashboardResponse[]>("/dashboard");
  return response.data.map(metaBaseDashboardModelFromResponse);
}