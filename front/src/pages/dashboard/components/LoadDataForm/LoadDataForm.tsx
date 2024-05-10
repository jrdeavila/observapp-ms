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
} from "@nextui-org/react";
import { Formik } from "formik";
import React from "react";
import { Form } from "react-router-dom";

interface LoadDataFormValues {
  name: string;
  file: File | undefined;
}
interface LoadDataFormErrors {
  name: string;
  file: string;
}

const LoadDataForm: React.FC<{}> = ({}) => {
  let initialValue: LoadDataFormValues = {
    name: "",
    file: undefined,
  };
  const handleOnCancel = () => {
    // TODO: Implement on Cancel Event
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validate={(values) => {
          let errors: Partial<LoadDataFormErrors> = {};

          if (!values.name) {
            errors.name = "Este campo es requerido";
          }

          if (!values.file) {
            errors.file = "Este campo es requerido";
          } else {
            let [_, extension] = values.file?.name.split(".") ?? ["", ""];
            if (extension != "csv") {
              errors.file = "El archivo debe ser de tipo CSV";
            }
          }

          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          values,
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
                    onClick={handleOnCancel}
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
