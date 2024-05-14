import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound404: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative">
      <div className="flex flex-col min-h-screen items-center justify-center gap-y-2">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-9xl text-red-500"
        />
        <div className="flex items-center justify-center gap-x-3">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-4xl">Pagina no encontrada</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
