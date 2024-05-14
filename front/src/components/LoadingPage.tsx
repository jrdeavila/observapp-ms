import { Spinner } from "@nextui-org/react";

const LoadingPage: React.FC<{}> = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Spinner className="text-center" color="primary" label="Cargando..." />
    </div>
  );
};

export default LoadingPage;
