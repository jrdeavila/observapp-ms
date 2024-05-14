import {
  SectionResponse,
  SectionResponseList,
  sectionModelFromResponse,
  sectionModelListFromResponse,
} from "../responses/sectionServiceResponse";
import SectionModel from "../models/section";
import httpClient, { baseURL } from "@/interceptors/requestResponseInterceptor";
import SubSectionModel from "../models/subSection";
import {
  SubSectionListResponse,
  subSectionModelListFromResponse,
} from "../responses/subSectionServiceResponse";
import {
  CreateSectionFormValues,
  createSectionFormValuesToFormData,
} from "../../CreateSectionDialog/context/CreateSectionContext";

export const fetchSectionsService: () => Promise<SectionModel[]> = async () => {
  let res = await httpClient.get<SectionResponseList>("/o/admin/sections/");
  return sectionModelListFromResponse(res.data);
};

export const deleteSectionService: (
  sectionSlug: string
) => Promise<boolean> = async (sectionSlug) => {
  let res = await httpClient.delete("/o/admin/sections/" + sectionSlug);
  return res.status === 204;
};

export const createSectionService: (
  section: CreateSectionFormValues
) => Promise<SectionModel> = async (section) => {
  let res = await httpClient.post<{ data: SectionResponse }>(
    "/o/admin/sections/",
    createSectionFormValuesToFormData(section)
  );
  return sectionModelFromResponse(res.data);
};

export const updateSectionService: (
  section: SectionModel
) => Promise<void> = async (section) => {
  await httpClient.put("/o/admin/sections/" + section.slug, section);
};

export const fetchSubsectionsBySectionSlugService: (
  sectionSlug: string
) => Promise<SubSectionModel[]> = async (sectionSlug) => {
  let res = await httpClient.get<SubSectionListResponse>(
    "/o/admin/sections/" + sectionSlug + "/subsections/"
  );
  return subSectionModelListFromResponse(res.data);
};

export const fetchSectionService: (
  sectionSlug: string
) => Promise<SectionModel> = async (sectionSlug) => {
  let res = await httpClient.get<{ data: SectionResponse }>(
    "/o/admin/sections/" + sectionSlug
  );
  return sectionModelFromResponse(res.data);
};

export const generateImageURL: (image: string) => string = (image) => {
  return baseURL + "o/storage/" + image;
};
