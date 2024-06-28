import axios from "axios";
import MetaBaseDashboardModel from "../models/metabaseDashboard";
import {
  MetaBaseDashboardResponse,
  metaBaseDashboardModelFromResponse,
} from "../responses/MetabaseDashboardResponse";

export const baseURL = "http://ec2-100-25-4-141.compute-1.amazonaws.com/metabase/api";

let httpMetaBaseClient = axios.create({
  baseURL: baseURL,
});

httpMetaBaseClient.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["X-API-KEY"] =
      "mb_vu4jW7uZb3uKbea1HrwzMXqgC+4A1AmBJRqPuZpc18g=";
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
