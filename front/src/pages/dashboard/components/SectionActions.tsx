import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useContext } from "react";
import styled from "styled-components";
import ShowSectionContext from "./SectionManagementTab/contexts/SubSectionContext";
import useSubSection from "../hooks/useSubSection";

const SectionActions: React.FC = () => {
  const { section } = useContext(ShowSectionContext);

  const sectionHook = useSubSection();
  const ActionLink: React.FC<{ onClick: () => void; children: ReactNode }> = ({
    children,
    onClick,
  }) => {
    return (
      <div onClick={onClick} className="flex flex-row">
        <div className="text-dark font-bold cursor-pointer hover:text-primary-600">
          {children}
        </div>
        <span className="ml-2">|</span>
      </div>
    );
  };

  return (
    <div className="py-4 flex flex-col gap-y-4">
      <span className="text-4xl ml-4">
        <b>{section.name}</b>
      </span>
      <StyledDiv className="flex flex-row gap-x-3 bg-primary-50 items-center px-5">
        <ActionLink
          onClick={() => {
            sectionHook.onCreate();
          }}
          children={
            <>
              <FontAwesomeIcon icon={faPlus} />
              <span className="ml-2">
                {`Agregar sección a ${section.name}`}{" "}
              </span>
            </>
          }
        />
        <ActionLink
          onClick={() => {
            sectionHook.onDelete();
          }}
          children={
            <>
              <FontAwesomeIcon icon={faTrash} />
              <span className="ml-2">Eliminar esta sección</span>
            </>
          }
        />
        <ActionLink
          onClick={() => {
            sectionHook.onEdit();
          }}
          children={
            <>
              <FontAwesomeIcon icon={faTrash} />
              <span className="ml-2">Actualizar esta sección</span>
            </>
          }
        />
      </StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  height: 50px;
`;

export default SectionActions;
