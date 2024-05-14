import User from "@/models/user";
import { createContext } from "react";

interface SessionContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const SessionContext = createContext<SessionContextProps>({
  user: null,
  setUser: () => {},
});

export default SessionContext;
