import useSession from "@/hooks/useSession";
import React, { useState } from "react";

import useAuth from "@/hooks/useAuth";
import {
  faBackspace,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Divider,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

const UserAccountPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // ====================================================================
  const session = useSession();
  const authentication = useAuth();

  // ====================================================================

  const handleLogout = () => {
    authentication.logout();
    setIsOpen(false);
  };
  // ====================================================================
  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Button className="bg-primary-200 text-white">
          <div className="flex flex-row items-start gap-x-2">
            <FontAwesomeIcon icon={faUser} />
            <span className="font-bold">{session.user?.name}</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2 flex flex-col gap-y-1">
          <div className="font-bold">
            <span>Informacion de la Cuenta</span>
          </div>
          <div className="text-xs flex flex-col">
            <span className="font-bold">Email</span>
            <span className="text-xs text-gray-400">{session.user?.email}</span>
          </div>
          <div className="text-xs flex flex-col">
            <span className="font-bold">Roles</span>
            <span>{session.user?.roles.join(", ")}</span>
          </div>
          <Divider />
          <div className="font-bold">
            <span>Opciones de Cuenta</span>
          </div>
          <Listbox aria-label="user-account-options">
            <ListboxItem key="logout" textValue="logout" onClick={handleLogout}>
              <div className="flex flex-row justify-between items-center">
                <span>Cerrar Sesión</span>
                <FontAwesomeIcon icon={faBackspace} />
              </div>
            </ListboxItem>
          </Listbox>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAccountPopover;
