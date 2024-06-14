import SubSectionModel from "../models/subSection";

export interface SubSectionListResponse {
  data: SubSectionResponse[];
}

export interface SubSectionResponse {
  dashboard_url: string;
  description: string;
  id: number;
  image: string;
  slug: string;
  title: string;
}

export const subSectionModelFromResponse = (
  response: SubSectionResponse,
  sectionSlug: string
): SubSectionModel => {
  return {
    sectionSlug: sectionSlug,
    title: response.title,
    description: response.description,
    image: response.image,
    slug: response.slug,
    dashboardId: response.dashboard_url,
  };
};

export const subSectionModelListFromResponse = (
  response: SubSectionListResponse,
  sectionSlug: string
): SubSectionModel[] => {
  return response.data.map((subSection) => {
    return {
      sectionSlug: sectionSlug,
      title: subSection.title,
      description: subSection.description,
      image: subSection.image,
      slug: subSection.slug,
      dashboardId: subSection.dashboard_url,
    };
  });
};
