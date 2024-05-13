import AlertDialog from "@/components/AlertDialog";
import { ReactNode, useEffect, useState } from "react";
import LoadDataContext from "../contexts/LoadDataContext";
import {
  deleteDatabaseService,
  fetchDatabasesService,
  goToAPIDatabaseService,
} from "../services/loadDataService";
import { DatabaseInfo } from "../models/loadData";

const LoadDataProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [databases, setDatabases] = useState<DatabaseInfo[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [currentDatabase, setCurrentDatabase] = useState<string | null>(null);
  // ======================================================

  useEffect(() => {
    getDatabases();
  }, []);

  // ======================================================

  const getDatabases = async () => {
    let res = await fetchDatabasesService();
    setDatabases(res);
  };

  const deleteDatabase = async () => {
    await deleteDatabaseService(currentDatabase!);
    getDatabases();
  };

  // ======================================================
  const handleRefreshDatabases = () => {
    getDatabases();
  };
  const handleOnDeleteDatabase = (database: string) => {
    setShowAlert(true);
    setCurrentDatabase(database);
  };
  const handleShowDatabases = (database: string) => {
    goToAPIDatabaseService(database);
  };
  // ======================================================

  return (
    <LoadDataContext.Provider
      value={{
        databases: databases,
        refreshDatabases: handleRefreshDatabases,
        onShowDatabase: handleShowDatabases,
        onDeleteDatabase: handleOnDeleteDatabase,
      }}
    >
      {children}
      <AlertDialog
        title="Desea eliminar la base de datos?"
        message="Esta acción no se puede deshacer"
        onAccept={() => {
          deleteDatabase();
          setCurrentDatabase(null);
          setShowAlert(false);
        }}
        onClose={() => {
          setCurrentDatabase(null);
          setShowAlert(false);
        }}
        open={showAlert}
      />
    </LoadDataContext.Provider>
  );
};

export default LoadDataProvider;
