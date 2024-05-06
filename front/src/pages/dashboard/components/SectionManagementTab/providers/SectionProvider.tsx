import React, { ReactNode, useEffect, useState } from "react";
import SectionContext from "../contexts/SectionContext";
import SectionModel from "../models/section";
import { fetchSectionsService } from "../services/sectionService";
import CreateSectionDialog from "../../CreateSectionDialog/CreateSectionDialog";
import CreateSectionProvider from "../../CreateSectionDialog/provider/CreateSectionProvider";

interface SectionProviderProps {
  children: ReactNode;
}

const SectionProvider: React.FC<SectionProviderProps> = ({ children }) => {
  const [sectionItems, setSectionItems] = useState<SectionModel[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<
    SectionModel | undefined
  >(undefined);
  useEffect(() => {
    getSections();
  }, []);

  useEffect(() => {
    if (sectionItems) {
      localStorage.setItem("sectionItems", JSON.stringify(sectionItems));
    }
  }, [sectionItems]);

  // ==========================================================================

  const getSections = async () => {
    let inStorage = localStorage.getItem("sectionItems");
    if (inStorage) {
      let cachedModels: SectionModel[] = JSON.parse(inStorage);
      setSectionItems(cachedModels);
    }
    let res = await fetchSectionsService();
    setSectionItems(res);
  };

  // ==========================================================================

  const handleOnCreate = () => {
    setCurrentSection(undefined);
    setShowCreateModal(true);
  };

  const handleOnEdit = (section: SectionModel) => {
    setCurrentSection(section);
    setShowCreateModal(true);
  };

  const handleOnCloseModal = () => {
    setCurrentSection(undefined);
    setShowCreateModal(false);
  };

  const handleOnAdd = (section: SectionModel) => {
    setSectionItems([...sectionItems, section]);
  };
  const handleOnDelete = (section: SectionModel) => {
    let newSections = sectionItems.filter((s) => s.slug !== section.slug);
    setSectionItems(newSections);
  };

  // ==========================================================================
  return (
    <SectionContext.Provider
      value={{
        items: sectionItems,
        onAdd: handleOnAdd,
        onDelete: handleOnDelete,
        onCreate: handleOnCreate,
        onEdit: handleOnEdit,
      }}
    >
      {children}
      {
        <CreateSectionProvider>
          <CreateSectionDialog
            open={showCreateModal}
            onClose={handleOnCloseModal}
            section={currentSection}
          />
        </CreateSectionProvider>
      }
    </SectionContext.Provider>
  );
};

export default SectionProvider;
