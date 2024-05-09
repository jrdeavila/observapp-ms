import axios from "axios";
import MetaBaseDashboardModel from "../models/metabaseDashboard";
import {
  MetaBaseDashboardResponse,
  metaBaseDashboardModelFromResponse,
} from "../responses/MetabaseDashboardResponse";

export const baseURL = "http://24.199.78.175/metabase/api";

let httpMetaBaseClient = axios.create({
  baseURL: baseURL,
});

httpMetaBaseClient.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["X-API-KEY"] =
      "mb_GnmFHGA4UUXO9uMCnA1vPcp7V8UsAbHh/XPZdlRyjmo=";
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

export const fetchMetaBaseDashboards = async (): Promise<
  MetaBaseDashboardModel[]
> => {
  let response = await httpMetaBaseClient.get<MetaBaseDashboardResponse[]>(
    "/dashboard"
  );
  return response.data.map(metaBaseDashboardModelFromResponse);
};
