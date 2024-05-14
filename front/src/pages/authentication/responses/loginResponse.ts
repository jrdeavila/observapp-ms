import TokenData from "../models/tokenData";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const loginResponseToTokenData = (
  response: LoginResponse
): TokenData => {
  return {
    token: response.access_token,
    expiresIn: response.expires_in,
  };
};
