import { createContext } from "react";
import SectionModel from "../models/section";

interface SectionContextProps {
  items: SectionModel[];
  onCreate: () => void;
  onEdit: (section: SectionModel) => void;
  onDelete: (section: SectionModel) => void;
  onAdd: (section: SectionModel) => void;
}

const SectionContext = createContext<SectionContextProps>({
  items: [],
  onCreate: () => {},
  onEdit: () => {},
  onDelete: () => {},
  onAdd: () => {},
});

export default SectionContext;
