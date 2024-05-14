import TextField from "@/components/TextField";
import useAuth from "@/hooks/useAuth";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
} from "@nextui-org/react";
import { Formik } from "formik";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";
import { LoginFormValues } from "../models/LoginFormValues";

const LoginForm: React.FC = () => {
  // ======================================================================
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // ======================================================================
  let initialValues: LoginFormValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  // ======================================================================
  const authentication = useAuth();
  // ======================================================================
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // ======================================================================
  return (
    <StyledCard>
      <CardHeader>
        <h1 className="text-xl font-bold">Iniciar Sesión</h1>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            authentication
              .login({
                email: values.email,
                password: values.password,
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-2">
                <TextField
                  startContent={<FontAwesomeIcon icon={faEnvelope} />}
                  name="email"
                  type="email"
                  placeholder="Correo Electrónico"
                />
                <TextField
                  startContent={
                    <FontAwesomeIcon icon={faLock} className="cursor-pointer" />
                  }
                  endContent={
                    <FontAwesomeIcon
                      icon={!showPassword ? faEye : faEyeSlash}
                      onClick={handleToggleShowPassword}
                    />
                  }
                  name="password"
                  type={!showPassword ? "password" : "text"}
                  placeholder="Contraseña"
                />
                <Checkbox
                  onChange={(e) => {
                    setFieldValue("rememberMe", e.target.checked);
                  }}
                  name="rememberMe"
                >
                  Recordar mi cuenta
                </Checkbox>
                <Button
                  type="submit"
                  className="font-bold text-light bg-primary rounded-lg"
                >
                  {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 400px;
`;
export default LoginForm;
