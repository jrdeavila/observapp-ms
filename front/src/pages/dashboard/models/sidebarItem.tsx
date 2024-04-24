import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDatabase, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface SideBarItemModel {
  title: string;
  icon: IconProp;
  tab: ReactNode;
}

export const sideBarItems: SideBarItemModel[] = [
  {
    icon: faDatabase,
    title: "Administración de secciones",
    tab: (
      <>
        <h1>Administración</h1>
      </>
    ),
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
];

export default SideBarItemModel;
