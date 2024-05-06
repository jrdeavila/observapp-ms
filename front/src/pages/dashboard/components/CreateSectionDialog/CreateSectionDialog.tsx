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
} from "@nextui-org/react";
import { Formik } from "formik";
import { useContext } from "react";
import { Form } from "react-router-dom";
import SectionModel from "../SectionManagementTab/models/section";
import CreateSectionContext, {
  CreateSectionFormValues,
} from "./context/CreateSectionContext";

interface CreateSectionDialogProps {
  section: SectionModel | undefined;
  open: boolean;
  onClose: () => void;
}

const CreateSectionDialog: React.FC<CreateSectionDialogProps> = ({
  section,
  open,
  onClose,
}) => {
  const { onCreateSection, loading } = useContext(CreateSectionContext);

  // =======================================================================

  let initialValues: CreateSectionFormValues = {
    title: section?.name ?? "",
    description: section?.description ?? "",
    image: undefined,
    slug: section?.slug ?? "",
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
              let errors: Partial<CreateSectionFormValues> = {};

              if (!values.title) {
                errors.title = "El título es requerido";
              }

              if (!values.description) {
                errors.description = "La descripción es requerida";
              }

              if (!values.slug) {
                errors.slug = "El slug es requerido";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              let res = await onCreateSection(values);
              if (res) {
                onClose();
              }
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
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

export default CreateSectionDialog;
