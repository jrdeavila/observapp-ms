import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useContext } from "react";
import styled from "styled-components";
import ShowSectionContext from "../SectionManagementTab/contexts/SubSectionContext";
import SubSectionModel from "../SectionManagementTab/models/subSection";
import { generateImageURL } from "../SectionManagementTab/services/sectionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisVertical,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { deleteSubSectionService } from "../CreateSubSectionDialog/services/subsectionService";
import { toast } from "react-toastify";

interface ShowSectionListProps {}

const ShowSubSectionList: React.FC<ShowSectionListProps> = () => {
  const { subSections, onShowDashboard, onEdit } =
    useContext(ShowSectionContext);
  const SubSectionItem: React.FC<{ subSection: SubSectionModel }> = ({
    subSection,
  }) => {
    return (
      <div className="w-full m-5 p-5">
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
          <CardFooter>
            <div className="flex flex-row justify-end items-center w-full">
              <Popover>
                <PopoverTrigger>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col justify-start">
                    {[
                      {
                        icon: faEye,
                        title: "Ver Dashboard",
                        onClick: () => {
                          onShowDashboard(subSection.dashboardId);
                        },
                      },
                      {
                        icon: faEdit,
                        title: "Editar",
                        onClick: () => {
                          onEdit(subSection);
                        },
                      },
                      {
                        icon: faTrashAlt,
                        title: "Eliminar",
                        onClick: async () => {
                          await deleteSubSectionService(subSection);
                          toast.success("Sección eliminada");
                        },
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center cursor-pointer"
                        onClick={item.onClick}
                      >
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        <p>{item.title}</p>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardFooter>
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
