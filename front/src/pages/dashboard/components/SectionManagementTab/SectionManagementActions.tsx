import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useContext } from "react";
import styled from "styled-components";
import SectionContext from "./contexts/SectionContext";

const SectionManagementActions: React.FC = () => {
  const { onCreate } = useContext(SectionContext);

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
      <StyledDiv className="flex flex-row gap-x-3 bg-primary-50 items-center px-5">
        <ActionLink
          onClick={() => {
            onCreate();
          }}
          children={
            <>
              <FontAwesomeIcon icon={faPlus} />
              <span className="ml-2">Agregar sección</span>
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

export default SectionManagementActions;
