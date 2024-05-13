import React from "react";
import LoadDataForm from "../components/LoadDataForm/LoadDataForm";
import LoadDataProvider from "../providers/LoadDataProvider";
import ShowDatabases from "../components/ShowDatabases";

const LoadData: React.FC<{}> = () => {
  return (
    <LoadDataProvider>
      <div className="p-5">
        <div className="w-full h-full grid  grid-cols-3 gap-5">
          <div className="col-span-3 lg:col-span-1">
            <LoadDataForm />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <ShowDatabases />
          </div>
        </div>
      </div>
    </LoadDataProvider>
  );
};

export default LoadData;
