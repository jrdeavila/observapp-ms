import httpClient from "@/interceptors/requestResponseInterceptor";
import { LoginFormValues } from "../models/LoginFormValues";

type LoginService = (data: LoginFormValues) => Promise<string>;

export const loginService: LoginService = async (data) => {
  let res = await httpClient.post("/auth/login", data);
  console.log(res.data);
  return res.data;
};
