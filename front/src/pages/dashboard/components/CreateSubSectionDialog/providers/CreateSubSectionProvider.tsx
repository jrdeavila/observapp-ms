import { useEffect, useState } from "react";
import MetaBaseDashboardModel from "../models/metabaseDashboard";
import CreateSubSectionContext, {
  CreateSubSectionFormValues,
} from "../contexts/CreateSubSectionContext";
import { fetchMetaBaseDashboards } from "../services/metabaseService";
import {
  createSubSectionService,
  subSectionFormValuesToRequest,
} from "../services/subsectionService";
import useSubSection from "@/pages/dashboard/hooks/useSubSection";

const CreateSubSectionProvider: React.FC<{
  children: React.ReactNode;
  sectionId: string;
}> = ({ children, sectionId }) => {
  const [dashboards, setDashboards] = useState<MetaBaseDashboardModel[]>([]);
  const [loading, setLoading] = useState(false);
  // =======================================================================
  const subSectionHook = useSubSection();
  // =======================================================================

  useEffect(() => {
    getDashboards();
  }, []);

  // =======================================================================

  const getDashboards = async () => {
    let res = await fetchMetaBaseDashboards();
    setDashboards(res);
  };

  // =======================================================================

  const handleOnCreateSubSection: (
    values: CreateSubSectionFormValues
  ) => Promise<boolean> = async (values: CreateSubSectionFormValues) => {
    setLoading(true);
    try {
      let res = await createSubSectionService(
        subSectionFormValuesToRequest(values)
      );
      subSectionHook.onAdd(res);

      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  // =======================================================================

  return (
    <CreateSubSectionContext.Provider
      value={{
        sectionId,
        dashboards,
        loading,
        onCreateSubSection: handleOnCreateSubSection,
      }}
    >
      {children}
    </CreateSubSectionContext.Provider>
  );
};

export default CreateSubSectionProvider;
