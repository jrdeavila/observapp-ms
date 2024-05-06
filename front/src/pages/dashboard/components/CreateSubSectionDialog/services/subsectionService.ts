import httpClient from "@/interceptors/requestResponseInterceptor";
import SubSectionModel from "../../SectionManagementTab/models/subSection";
import {
  SubSectionResponse,
  subSectionModelFromResponse,
} from "../../SectionManagementTab/responses/subSectionServiceResponse";
import { CreateSubSectionFormValues } from "../contexts/CreateSubSectionContext";

export interface CreateSubSectionRequest {
  title: string;
  description: string;
  image: any;
  slug: string;
  dashboard_url: string;
  section_id: string;
}

export const subSectionFormValuesToRequest = (
  values: CreateSubSectionFormValues
): CreateSubSectionRequest => {
  return {
    title: values.title,
    description: values.description,
    image: values.image,
    slug: values.slug,
    dashboard_url: values.dashboardId,
    section_id: values.sectionId,
  };
};

export const createSubSectionService = async (
  values: CreateSubSectionRequest
): Promise<SubSectionModel> => {
  let data = new FormData();
  data.append("title", values.title);
  data.append("description", values.description);
  data.append("image", values.image);
  data.append("slug", values.slug);
  data.append("dashboard_url", values.dashboard_url);
  let response = await httpClient.post<SubSectionResponse>(
    `/o/admin/sections/${values.section_id}/subsections`,
    data
  );
  return subSectionModelFromResponse(response.data);
};
