import { ReactNode, useState } from "react";
import CreateSectionContext, {
  CreateSectionFormValues,
} from "../context/CreateSectionContext";
import { createSectionService } from "../../SectionManagementTab/services/sectionService";
import useSection from "../../SectionManagementTab/hooks/section";

const CreateSectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  // ==========================================================================
  const sectionHook = useSection();
  // ==========================================================================
  const handleOnCreate = async (value: CreateSectionFormValues) => {
    try {
      let res = await createSectionService(value);
      console.log(res);
      sectionHook.onAdd(res);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
      return true;
    }
  };
  // ==========================================================================
  return (
    <CreateSectionContext.Provider
      value={{
        onCreateSection: handleOnCreate,
        loading: loading,
      }}
    >
      {children}
    </CreateSectionContext.Provider>
  );
};

export default CreateSectionProvider;
