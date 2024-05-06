import MetaBaseDashboardModel from "../models/metabaseDashboard";

export interface MetaBaseDashboardResponse {
  archived: boolean;
  auto_apply_filters: boolean;
  cache_ttl: null;
  caveats: null;
  collection_id: number;
  collection_position: number;
  created_at: Date;
  creator: Creator;
  creator_id: number;
  description: string;
  embedding_params: null;
  enable_embedding: boolean;
  entity_id: string;
  id: number;
  initially_published_at: null;
  "last-edit-info": LastEditInfo;
  made_public_by_id: number;
  name: string;
  parameters: Parameter[];
  points_of_interest: null;
  position: null;
  public_uuid: string;
  show_in_getting_started: boolean;
  updated_at: Date;
  width: string;
}

export interface Creator {
  common_name: string;
  date_joined: Date;
  email: string;
  first_name: string;
  id: number;
  is_qbnewb: boolean;
  is_superuser: boolean;
  last_login: Date;
  last_name: string;
}

export interface LastEditInfo {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  timestamp: Date;
}

export interface Parameter {
  id: string;
  name: string;
  slug: string;
  type: string;
}


export const metaBaseDashboardModelFromResponse = (response: MetaBaseDashboardResponse): MetaBaseDashboardModel => {
  return {
    name: response.name,
    publicId: response.public_uuid,
    id: response.id,
    description: response.description,
    creator: response.creator.common_name,
  };
}