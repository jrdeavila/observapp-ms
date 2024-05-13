import { createContext } from "react";
import { DatabaseInfo } from "../models/loadData";

interface LoadDataContextProps {
  databases: DatabaseInfo[];
  refreshDatabases: () => void;
  onDeleteDatabase: (database: string) => void;
  onShowDatabase: (database: string) => void;
}

const LoadDataContext = createContext<LoadDataContextProps>({
  databases: [],
  refreshDatabases: () => {},
  onDeleteDatabase: (_database: string) => {},
  onShowDatabase: (_database: string) => {},
});

export default LoadDataContext;
