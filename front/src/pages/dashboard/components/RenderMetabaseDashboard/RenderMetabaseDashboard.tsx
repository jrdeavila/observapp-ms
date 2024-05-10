import React from "react";

const RenderMetabaseDashboard: React.FC<{
  // dashboardId: string
}> = ({}) => {
  return (
    <div className="w-full bg-black">
      <iframe
        // className="w-full h-full"
        src="http://24.199.78.175/metabase/public/dashboard/314ad644-fc71-42e7-ae06-2dc668554cc6"
        frameBorder={0}
        allowTransparency
      ></iframe>
    </div>
  );
};

export default RenderMetabaseDashboard;
