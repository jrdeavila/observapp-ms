import { DatabaseInfo } from "../models/loadData";

export interface DatabaseInfoResponse {
  name: string;
  records: number;
  columns: number;
  created_at: string;
}

export const responseToDatabaseInfo = (
  response: DatabaseInfoResponse
): DatabaseInfo => {
  return {
    name: response.name,
    records: response.records,
    columns: response.columns,
    createdAt: response.created_at,
  };
};

export const responseToDatabaseInfoList = (
  response: DatabaseInfoResponse[]
): DatabaseInfo[] => {
  return response.map((res) => responseToDatabaseInfo(res));
};
