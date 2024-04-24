import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-row justify-center items-center mt-10">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
