import User from "@/models/user";

export interface UserDataResponse {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  roles: {
    id: string;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: { model_type: string; model_id: string; role_id: string };
  }[];
}

export const userDataResponseToUser = (data: UserDataResponse): User => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    roles: data.roles.map((role) => role.name),
  };
};
