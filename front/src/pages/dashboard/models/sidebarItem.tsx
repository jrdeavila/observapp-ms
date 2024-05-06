import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDatabase, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import SectionManagementTab from "../components/SectionManagementTab/SectionManagementTab";

interface SideBarItemModel {
  title: string;
  icon: IconProp;
  tab?: ReactNode;
  clickable?: boolean;
  onClick?: () => void;
}

export const sideBarItems: SideBarItemModel[] = [
  {
    icon: faDatabase,
    title: "Administración de secciones",
    tab: <SectionManagementTab />,
  },
  {
    icon: faTruckLoading,
    title: "Cargue de datos",
    tab: (
      <>
        <h1>Cargue</h1>
      </>
    ),
  },
  {
    icon: faDatabase,
    title: "MetaBase",
    clickable: true,
    onClick: () => {
      window.open("/metabase", "_blank");
    },
  },
];

export default SideBarItemModel;
