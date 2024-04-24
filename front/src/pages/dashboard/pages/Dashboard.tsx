import { useContext, useState } from "react";
import DashboardContext from "../contexts/DashboardContext";
import { sideBarItems } from "../models/sidebarItem";
import SideBar from "../components/Sidebar";

const Dashboard: React.FC = () => {
  const [sidebarIndex, setSidebarIndex] = useState(0);

  const handleSidebarIndex = (index: number) => {
    setSidebarIndex(index);
  };

  return (
    <DashboardContext.Provider
      value={{
        sidebarIndex: sidebarIndex,
        setSidebarIndex: handleSidebarIndex,
        sideBarItems: sideBarItems,
      }}
    >
      <div className="h-full w-full">
        <div className="flex w-full h-full">
          <SideBar />
          <DashboardContent />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

const DashboardContent: React.FC = () => {
  const { sideBarItems, sidebarIndex } = useContext(DashboardContext);
  return <div className="w-full h-full">{sideBarItems[sidebarIndex].tab}</div>;
};

export default Dashboard;
