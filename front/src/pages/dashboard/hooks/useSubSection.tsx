import { useContext } from "react";
import SubSectionContext from "../components/SectionManagementTab/contexts/SubSectionContext";
import SubSectionModel from "../components/SectionManagementTab/models/subSection";

interface UseSubSectionHook {
  onCreate: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAdd: (section: SubSectionModel) => void;
}

const useSubSection: () => UseSubSectionHook = () => {
  const { onCreate, onDelete, onEdit, onAdd } = useContext(SubSectionContext);

  return { onCreate, onDelete, onEdit, onAdd };
};

export default useSubSection;
