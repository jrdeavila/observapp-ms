import React from "react";
import LoadDataForm from "../components/LoadDataForm/LoadDataForm";
import styled from "styled-components";
import LoadDataProvider from "../providers/LoadDataProvider";
import ShowDatabases from "../components/ShowDatabases";

const LoadData: React.FC<{}> = () => {
  return (
    <LoadDataProvider>
      <div className="p-5">
        <div className="w-full h-full flex flex-row items-start justify-center gap-x-5">
          <div className="w-full">
            <ShowDatabases />
          </div>
          <StyledDiv>
            <LoadDataForm />
          </StyledDiv>
        </div>
      </div>
    </LoadDataProvider>
  );
};

const StyledDiv = styled.div`
  width: 40rem;
`;

export default LoadData;
