import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SectionContext from "./contexts/SectionContext";
import SectionModel from "./models/section";
import SectionProvider from "./providers/SectionProvider";
import SectionManagementActions from "./SectionManagementActions";

const SectionManagementTab: React.FC = () => {
  const SectionManagementIntroduction = () => {
    return (
      <div className="px-5">
        <h1 className="text-4xl">Administración de secciones</h1>
        <p className="text-xl">
          Aquí puedes configurar los recursos y secciones que se mostraran en el
          aplicativo Movil de ObservApp 📱
        </p>
      </div>
    );
  };
  return (
    <SectionProvider>
      <div className="py-5">
        <div className="flex flex-col gap-y-3">
          <SectionManagementIntroduction />
          <SectionManagementActions />
          <SectionList />
        </div>
      </div>
    </SectionProvider>
  );
};

interface SectionItemProps {
  section: SectionModel;
}

const SectionList: React.FC = () => {
  const { items } = useContext(SectionContext);

  const navigate = useNavigate();

  const SectionItem: React.FC<SectionItemProps> = ({ section }) => {
    const handleOnClick = () => {
      navigate("/dashboard/section/" + section.slug);
    };
    return (
      <div
        onClick={handleOnClick}
        className="m-5 p-5 w-1/4 transform transition-all duration-300 hover:scale-105"
      >
        <Card>
          <CardHeader className="bg-primary-200">
            <StyledDivCardHeader className="flex justify-center items-center">
              <FontAwesomeIcon icon={faImage} size="5x" color="white" />
            </StyledDivCardHeader>
          </CardHeader>
          <Divider />
          <CardBody>
            <h1 className="text-xl font-bold">{section.name}</h1>
          </CardBody>
          <Divider />
          <CardFooter>
            <p>{section.description}</p>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div className="relative flex flex-row flex-wrap h-full w-full">
      {items.map((e, i) => (
        <SectionItem section={e} key={i} />
      ))}
    </div>
  );
};

const StyledDivCardHeader = styled.div`
  height: 10rem;
  width: 100%;
`;

export default SectionManagementTab;
