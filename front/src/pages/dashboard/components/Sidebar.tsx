import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import styled from "styled-components";
import DashboardContext from "../contexts/DashboardContext";
import useDashboard from "../hooks/useDashboard";

interface SideBarProps {
  title: string;
  icon: IconProp;
  active: boolean;
  index: number;
  clickable?: boolean;
  onClick?: () => void;
}

const SideBar: React.FC = () => {
  const { sideBarItems, sidebarIndex } = useContext(DashboardContext);

  const SideBarItem: React.FC<SideBarProps> = ({
    title,
    icon,
    active,
    index,
    clickable,
    onClick,
  }) => {
    const dashboard = useDashboard();
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      dashboard.changeTab(index);
    };
    const backgroundColor = active ? "bg-primary-400" : "bg-primary-300";
    const backgroundColorHover = active
      ? "hover:bg-primary-500"
      : "hover:bg-primary-400";
    const textColor = active ? "text-light" : "text-light";
    return (
      <div
        onClick={!!clickable ? onClick : handleClick}
        className={`${backgroundColor} p-3 rounded-md cursor-pointer transition duration-300 ease-in-out ${backgroundColorHover} hover:text-white hover:scale-105`}
      >
        <div className="flex flex-row items-center gap-x-3">
          <FontAwesomeIcon icon={icon} size="2x" className={textColor} />
          <p className={`${textColor} text-xl font-bold`}>{title}</p>
          {!!clickable && (
            <>
              <div className="flex-grow"></div>
              <FontAwesomeIcon icon={faLink} className={textColor} />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <StyledSideBarContent className="h-full bg-primary-200 transform transition-all duration-300 -translate-x-80  lg:translate-x-0">
      <div className="p-5 h-full w-full">
        <h1 className="text-4xl font-bold text-light">Dashboard</h1>
        <ul className="mt-10 flex flex-col gap-y-3">
          {sideBarItems.map((e, i) => {
            return (
              <div key={i}>
                <SideBarItem
                  active={sidebarIndex == i}
                  icon={e.icon}
                  title={e.title}
                  index={i}
                  clickable={e.clickable}
                  onClick={e.onClick}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </StyledSideBarContent>
  );
};

const StyledSideBarContent = styled.div`
  width: 20rem;
`;
export default SideBar;
