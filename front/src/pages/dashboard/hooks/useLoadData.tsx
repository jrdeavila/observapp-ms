import { useContext } from "react";
import LoadDataContext from "../contexts/LoadDataContext";

interface UseLoadDataHookProps {
  refreshDatabases: () => void;
  onDeleteDatabase: (database: string) => void;
}

const useLoadData = (): UseLoadDataHookProps => {
  const { refreshDatabases, onDeleteDatabase } = useContext(LoadDataContext);
  return {
    refreshDatabases,
    onDeleteDatabase,
  };
};

export default useLoadData;
