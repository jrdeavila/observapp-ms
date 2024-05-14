import httpClient from "@/interceptors/requestResponseInterceptor";
import LoginCredentials from "@/models/loginCredentials";
import TokenData from "../models/tokenData";
import {
  LoginResponse,
  loginResponseToTokenData,
} from "../responses/loginResponse";
import User from "@/models/user";
import {
  UserDataResponse,
  userDataResponseToUser,
} from "../responses/userDataResponse";

type LoginService = (data: LoginCredentials) => Promise<TokenData>;
type FetchUserData = () => Promise<User>;

export const loginService: LoginService = async (data) => {
  let res = await httpClient.post<LoginResponse>("/a/admin/login", data);
  return loginResponseToTokenData(res.data);
};

export const fetchUserData: FetchUserData = async () => {
  let res = await httpClient.post<UserDataResponse>("/a/admin/me");
  return userDataResponseToUser(res.data);
};
