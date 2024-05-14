import SessionContext from "@/contexts/SessionContext";
import User from "@/models/user";
import { useContext } from "react";

interface UseSessionHookProps {
  setUser: (user: User | null) => void;
  active: boolean;
  user: User | null;
}

export default function useSession(): UseSessionHookProps {
  const { user, setUser } = useContext(SessionContext);
  return {
    setUser,
    active: !!user,
    user,
  };
}
