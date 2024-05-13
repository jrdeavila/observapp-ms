import httpClient from "@/interceptors/requestResponseInterceptor";
import {
  DatabaseInfoResponse,
  responseToDatabaseInfoList,
} from "../responses/databaseInfoResponse";
import { DatabaseInfo } from "../models/loadData";

export const fetchDatabasesService: () => Promise<
  DatabaseInfo[]
> = async () => {
  const res = await httpClient.get<DatabaseInfoResponse[]>("/l/databases/");
  return responseToDatabaseInfoList(res.data);
};

export const deleteDatabaseService: (name: string) => Promise<void> = async (
  name
) => {
  await httpClient.delete(`/l/databases/${name}`);
};

export const goToAPIDatabaseService: (name: string) => Promise<void> = async (
  name
) => {
  let url = `/api/l/databases/${name}`;
  window.open(url, "_blank");
};
