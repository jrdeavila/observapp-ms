import FilePicker from "@/components/FilePicker";
import TextField from "@/components/TextField";
import { faCancel, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik } from "formik";
import React from "react";
import { Form } from "react-router-dom";
import { sendDatabaseService } from "./services/loadDataService";
import useLoadData from "../../hooks/useLoadData";

interface LoadDataFormValues {
  name: string;
  file: File | undefined;
  separator: string;
}
interface LoadDataFormErrors {
  name: string;
  file: string;
  separator: string;
}

const LoadDataForm: React.FC<{}> = ({}) => {
  let initialValue: LoadDataFormValues = {
    name: "",
    separator: ";",
    file: undefined,
  };

  const loadData = useLoadData();

  const handleOnSendLoadData = (values: LoadDataFormValues) => {
    sendDatabaseService(
      values.name,
      values.separator,
      values.file as File
    ).then(() => {
      loadData.refreshDatabases();
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validate={(values) => {
          let errors: Partial<LoadDataFormErrors> = {};

          if (!values.name) {
            errors.name = "El nombre es requerido";
          }

          if (!values.file) {
            errors.file = "El archivo es requerido";
          } else {
            let [_, extension] = values.file?.name.split(".") ?? ["", ""];
            if (extension != "csv") {
              errors.file = "El archivo debe ser de tipo CSV";
            }
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleOnSendLoadData(values);
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          values,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <span className="text-4xl">
                  Informacion de la base de datos
                </span>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-y-3">
                  <TextField
                    name="name"
                    label="Nombre de la base de datos"
                    placeholder="Nombre de la base de datos"
                    errorMessage={
                      errors.name && touched.name ? errors.name : ""
                    }
                  />

                  <Select
                    name="separator"
                    placeholder="Separador"
                    label="Separador"
                    value={values.separator}
                    onSelect={(value) => {
                      setFieldTouched("separator", true);
                      setFieldValue("separator", value);
                    }}
                  >
                    {[
                      {
                        value: ",",
                        label: "Coma (,)",
                      },
                      {
                        value: ";",
                        label: "Punto y coma (;)",
                      },
                      {
                        value: "|",
                        label: "Pipe (|)",
                      },
                    ].map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        textValue={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <FilePicker
                    name="filename"
                    value={values.file}
                    placeholder="Subir archivo"
                    errorMessage={
                      errors.file && touched.file ? errors.file : ""
                    }
                    onChange={(value) => {
                      setFieldTouched("file", true);
                      setFieldValue("file", value);
                    }}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="flex flex-row gap-x-1 items-end">
                  <Button
                    onClick={() => {
                      resetForm();
                    }}
                    type="button"
                    className="bg-primary text-white"
                  >
                    <div className="flex flex-row gap-x-1">
                      <span>Cancelar</span>
                      <FontAwesomeIcon icon={faCancel} />
                    </div>
                  </Button>
                  <Button type="submit" className="bg-primary text-white">
                    <div className="flex flex-row gap-x-1">
                      <span>Guardar</span>
                      <FontAwesomeIcon icon={faSave} />
                    </div>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoadDataForm;
