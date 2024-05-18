import { createContext } from "react";
import SubSectionModel from "../models/subSection";
import SectionModel from "../models/section";

interface ShowSectionContextProps {
  slug: string;
  section: SectionModel;
  subSections: SubSectionModel[];
  onDelete: () => void;
  onEdit: () => void;
  onCreate: () => void;
  onAdd: (section: SubSectionModel) => void;
  onShowDashboard: (_dashboardId: string) => void;
}

const ShowSectionContext = createContext<ShowSectionContextProps>({
  slug: "",
  section: {
    description: "",
    image: "",
    name: "",
    slug: "",
  },
  subSections: [],
  onDelete: () => {},
  onEdit: () => {},
  onCreate: () => {},
  onAdd: () => {},
  onShowDashboard: () => {},
});
export default ShowSectionContext;
