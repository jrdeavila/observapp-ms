import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { useContext } from "react";
import styled from "styled-components";
import ShowSectionContext from "../SectionManagementTab/contexts/SubSectionContext";
import SubSectionModel from "../SectionManagementTab/models/subSection";
import { generateImageURL } from "../SectionManagementTab/services/sectionService";

interface ShowSectionListProps {}

const ShowSubSectionList: React.FC<ShowSectionListProps> = () => {
  const { subSections } = useContext(ShowSectionContext);
  const SubSectionItem: React.FC<{ subSection: SubSectionModel }> = ({
    subSection,
  }) => {
    return (
      <div className="m-5 p-5 transform transition-all duration-300 hover:scale-105">
        <Card>
          <StyledCardHeader image={generateImageURL(subSection.image)}>
            <BackgroundFilter className=" flex flex-col justify-end items-start">
              <h1 className="text-2xl text-light">{subSection.title}</h1>
            </BackgroundFilter>
          </StyledCardHeader>
          <Divider />
          <CardBody className="pb-10">
            <p>{subSection.description}</p>
          </CardBody>
        </Card>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-3">
      {subSections.map((subSection, index) => (
        <SubSectionItem subSection={subSection} key={index} />
      ))}
    </div>
  );
};

const StyledCardHeader = styled(CardHeader)<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 200px;
  pointer-events: none;
  margin: 0;
  padding: 0;
`;

const BackgroundFilter = styled.div`
  height: 100%;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 1rem;
`;

export default ShowSubSectionList;
