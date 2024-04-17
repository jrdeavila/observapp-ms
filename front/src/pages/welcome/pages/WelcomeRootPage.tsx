import React from "react";
import AnalyticsIllustration from "../styled-components/AnalyticsIllustration.styled";

const WelcomeRootPage: React.FC = () => {
  return (
    <div className="flex flex-row gap-x-10">
      <div>
        <AnalyticsIllustration />
      </div>
      <div className="flex flex-col gap-y-3 justify-center items-center">
        <h1 className="text-5xl">
          Bienvenido a ObservApp, la plataforma de analítica de datos de
          Observatorio Socioeconómico de la Cámara de comercio de Valledupar
        </h1>
      </div>
    </div>
  );
};

export default WelcomeRootPage;
