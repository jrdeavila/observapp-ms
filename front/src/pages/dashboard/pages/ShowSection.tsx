import AlertDialog from "@/components/AlertDialog";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateSubSectionDialog from "../components/CreateSubSectionDialog/CreateSubSectionDialog";
import CreateSubSectionProvider from "../components/CreateSubSectionDialog/providers/CreateSubSectionProvider";
import SectionActions from "../components/SectionActions";
import ShowSectionContext from "../components/SectionManagementTab/contexts/SubSectionContext";
import SectionModel from "../components/SectionManagementTab/models/section";
import SubSectionModel from "../components/SectionManagementTab/models/subSection";
import {
  deleteSectionService,
  fetchSectionService,
  fetchSubsectionsBySectionSlugService,
} from "../components/SectionManagementTab/services/sectionService";
import ShowSubSectionList from "../components/ShowSectionList/ShowSubSectionList";

const ShowSection: React.FC = () => {
  // ==========================================

  let params = useParams();
  let navigation = useNavigate();

  // ==========================================
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subSections, setSubSections] = useState<SubSectionModel[]>([]);
  const [showCreateSubSectionDialog, setShowCreateSubSectionDialog] =
    useState(false);
  const [section, setSection] = useState<SectionModel>({
    description: "",
    image: "",
    name: "",
    slug: "",
  });

  // ==========================================

  useEffect(() => {
    getSubSections();
    getSection();
  }, []);

  // ==========================================

  const getSubSections = async () => {
    let res = await fetchSubsectionsBySectionSlugService(params.slug!);
    setSubSections(res);
  };

  const getSection = async () => {
    let res = await fetchSectionService(params.slug!);
    setSection(res);
  };

  // ==========================================

  const handleOnDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleOnEdit = () => {};

  const handleOnCreate = () => {
    setShowCreateSubSectionDialog(true);
  };

  const handleDeleteSection = async () => {
    let res = await deleteSectionService(section.slug);
    if (res) {
      navigation("/dashboard");
    }
    setDeleteDialogOpen(false);
  };

  const handleOnAdd = (section: SubSectionModel) => {
    setSubSections([...subSections, section]);
  };

  // ==========================================

  return (
    <ShowSectionContext.Provider
      value={{
        slug: params.slug!,
        section: section,
        subSections: subSections,
        onDelete: handleOnDelete,
        onEdit: handleOnEdit,
        onCreate: handleOnCreate,
        onAdd: handleOnAdd,
      }}
    >
      <SectionActions />
      <ShowSubSectionList />
      <CreateSubSectionProvider sectionId={section.slug}>
        <CreateSubSectionDialog
          open={showCreateSubSectionDialog}
          onClose={() => {
            setShowCreateSubSectionDialog(false);
          }}
          sectionSlug={section.slug}
          section={undefined}
        />
      </CreateSubSectionProvider>
      <AlertDialog
        title={`Eliminar ${section.name}`}
        message="¿Estás seguro de eliminar esta sección?"
        onAccept={handleDeleteSection}
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
      />
    </ShowSectionContext.Provider>
  );
};

export default ShowSection;
