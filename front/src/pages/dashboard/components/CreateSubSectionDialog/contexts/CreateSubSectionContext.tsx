import { createContext } from "react";
import MetaBaseDashboardModel from "../models/metabaseDashboard";

export interface CreateSubSectionFormValues {
  title: string;
  description: string;
  image: File | undefined;
  slug: string;
  dashboardId: string;
  sectionId: string;
}

interface CreateSubSectionContextType {
  sectionId: string;
  dashboards: MetaBaseDashboardModel[];
  loading: boolean;
  onCreateSubSection: (values: CreateSubSectionFormValues) => Promise<boolean>;
}

const CreateSubSectionContext = createContext<CreateSubSectionContextType>({
  sectionId: "",
  dashboards: [],
  loading: false,
  onCreateSubSection: async (_) => false,
});

export default CreateSubSectionContext;
