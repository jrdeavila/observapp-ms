import SectionModel from "../models/section";

export interface SectionResponseList {
  data: SectionResponse[];
}

export interface SectionResponse {
  description: string;
  id: number;
  image: string;
  slug: string;
  title: string;
}

export const sectionModelListFromResponse: (
  response: SectionResponseList
) => SectionModel[] = (response: SectionResponseList) => {
  return response.data.map((e) => {
    let model: SectionModel = {
      description: e.description,
      slug: e.slug,
      image: e.image,
      name: e.title,
    };
    return model;
  });
};

export const sectionModelFromResponse: (response: {
  data: SectionResponse;
}) => SectionModel = (response) => {
  return {
    description: response.data.description,
    slug: response.data.slug,
    image: response.data.image,
    name: response.data.title,
  };
};
