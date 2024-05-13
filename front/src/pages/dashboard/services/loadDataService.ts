import httpClient from "@/interceptors/requestResponseInterceptor";
import {
  DatabaseInfoResponse,
  responseToDatabaseInfoList,
} from "../responses/databaseInfoResponse";
import { DatabaseInfo } from "../models/loadData";

export const fetchDatabasesService: () => Promise<
  DatabaseInfo[]
> = async () => {
  const res = await httpClient.get<DatabaseInfoResponse[]>("/l/load-data/");
  return responseToDatabaseInfoList(res.data);
};

export const deleteDatabaseService: (name: string) => Promise<void> = async (
  name
) => {
  await httpClient.delete(`/l/load-data/${name}`);
};

export const goToAPIDatabaseService: (name: string) => Promise<void> = async (
  name
) => {
  let url = `/api/l/load-data/${name}`;
  window.open(url, "_blank");
};
