import React from "react";
import LoadDataForm from "../components/LoadDataForm/LoadDataForm";
import styled from "styled-components";

const LoadData: React.FC<{}> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <StyledDiv>
        <LoadDataForm />
      </StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  width: 40rem;
`;

export default LoadData;
