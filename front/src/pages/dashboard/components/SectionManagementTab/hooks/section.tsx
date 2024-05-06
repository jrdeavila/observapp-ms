import { useContext } from "react";
import SectionContext from "../contexts/SectionContext";
import SectionModel from "../models/section";

interface UseSectionHook {
  onCreate: () => void;
  onDelete: (section: SectionModel) => void;
  onEdit: (section: SectionModel) => void;
  onAdd: (section: SectionModel) => void;
}

const useSection: () => UseSectionHook = () => {
  const { onCreate, onDelete, onEdit, onAdd } = useContext(SectionContext);

  return { onCreate, onDelete, onEdit, onAdd };
};

export default useSection;
