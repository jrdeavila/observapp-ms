import { useContext } from "react";
import SideBar from "../components/Sidebar";
import DashboardContext from "../contexts/DashboardContext";
import DashboardProvider from "../providers/DashboardProvider";

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="h-full w-full">
        <div className="flex w-full h-full">
          <SideBar />
          <DashboardContent />
        </div>
      </div>
    </DashboardProvider>
  );
};

const DashboardContent: React.FC = () => {
  const { sideBarItems, sidebarIndex } = useContext(DashboardContext);
  return (
    <div className="w-full h-full overflow-y-auto">
      {sideBarItems[sidebarIndex].tab}
    </div>
  );
};

export default Dashboard;
