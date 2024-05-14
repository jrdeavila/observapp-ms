import SessionContext from "@/contexts/SessionContext";
import User from "@/models/user";
import { ReactNode, useState } from "react";

const SessionProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // ======================================================================
  const handleSetUser = (user: User | null) => {
    setUser(user);
  };
  // ======================================================================
  return (
    <SessionContext.Provider
      value={{
        user: user,
        setUser: handleSetUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
