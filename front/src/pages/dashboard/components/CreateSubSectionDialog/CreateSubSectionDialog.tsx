import ImageUploader from "@/components/ImageUploader";
import TextField from "@/components/TextField";
import {
  faLink,
  faTextHeight,
  faTextWidth,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import SubSectionModel from "../SectionManagementTab/models/subSection";
import CreateSubSectionContext, {
  CreateSubSectionFormValues,
} from "./contexts/CreateSubSectionContext";
import { useContext } from "react";

interface CreateSubSectionDialogProps {
  sectionSlug: string;
  section: SubSectionModel | undefined;
  open: boolean;
  onClose: () => void;
}

const CreateSubSectionDialog: React.FC<CreateSubSectionDialogProps> = ({
  section,
  open,
  onClose,
}) => {
  const {
    dashboards,
    sectionId,
    onCreateSubSection,
    loading,
    onUpdateSubSection,
  } = useContext(CreateSubSectionContext);

  // =======================================================================

  let initialValues: CreateSubSectionFormValues = {
    title: section?.title ?? "",
    description: section?.description ?? "",
    image: undefined,
    slug: section?.slug ?? "",
    dashboardId: section?.dashboardId ?? "",
    sectionId: sectionId,
  };

  // =======================================================================

  return (
    <Modal
      isOpen={open}
      title="Crear sección"
      onClose={onClose}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              let errors: Partial<CreateSubSectionFormValues> = {};

              if (!values.title) {
                errors.title = "El título es requerido";
              }

              if (!values.description) {
                errors.description = "La descripción es requerida";
              }

              if (!values.slug) {
                errors.slug = "El slug es requerido";
              }

              if (!values.dashboardId) {
                errors.dashboardId = "La URL del dashboard es requerida";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              if (section) {
                let res = await onUpdateSubSection(values);
                if (res) {
                  onClose();
                }
                return;
              }
              let res = await onCreateSubSection(values);
              if (res) {
                onClose();
              }
            }}
          >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <ModalHeader>
                    <span className="text-3xl">Información de la sección</span>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-y-3">
                      <ImageUploader
                        name="image-1"
                        label="Imagen"
                        accept="image/*"
                        onChange={(file) => {
                          setFieldValue("image", file);
                        }}
                      />
                      <TextField
                        startContent={<FontAwesomeIcon icon={faTextWidth} />}
                        name="title"
                        type="text"
                        placeholder="Título"
                      />
                      <TextField
                        startContent={<FontAwesomeIcon icon={faTextHeight} />}
                        name="description"
                        type="text"
                        placeholder="Descripción"
                      />
                      <TextField
                        startContent={<FontAwesomeIcon icon={faLink} />}
                        name="slug"
                        type="text"
                        placeholder="Slug"
                      />
                      <Select
                        name="dashboardId"
                        label="Dashboard de MetaBase"
                        placeholder="Selecciona un dashboard de MetaBase"
                        isInvalid={!!errors.dashboardId && touched.dashboardId}
                        errorMessage={errors.dashboardId}
                        value={values.dashboardId}
                        onChange={(e) => {
                          let id = dashboards.filter((d) => d.id === parseInt(e.target.value))[0].publicId;
                          setFieldValue("dashboardId", id);
                        }}
                      >
                        {dashboards.map((e) => (
                          <SelectItem
                            key={e.id}
                            value={e.publicId}
                            textValue={e.name}
                          >
                            <div className="flex flex-col">
                              <span className="text-bold text-small">
                                {e.name}
                              </span>
                              <span className="text-tiny text-default-400">
                                {e.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-row gap-x-2">
                      <Button
                        color="danger"
                        type="button"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" color="primary">
                        {loading ? "Creando..." : "Crear"}
                      </Button>
                    </div>
                  </ModalFooter>
                </Form>
              </>
            )}
          </Formik>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateSubSectionDialog;
