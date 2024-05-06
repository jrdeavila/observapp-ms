import { createContext } from "react";

export interface CreateSectionFormValues {
  title: string;
  description: string;
  image: File | undefined;
  slug: string;
}

export const createSectionFormValuesToFormData = (
  values: CreateSectionFormValues
) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("slug", values.slug);
  if (values.image) {
    formData.append("image", values.image);
  }
  return formData;
};

interface CreateSectionContextType {
  loading: boolean;
  onCreateSection: (values: CreateSectionFormValues) => Promise<boolean>;
}

const CreateSectionContext = createContext<CreateSectionContextType>({
  loading: false,
  onCreateSection: async (_) => false,
});

export default CreateSectionContext;
