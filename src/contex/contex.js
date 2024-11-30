import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, displayName, setDisplayName }}>
      {children}
    </UserContext.Provider>
  );
};
