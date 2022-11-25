import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const prevUser = sessionStorage.getItem("user");
  const [auth, setAuth] = useState(prevUser ? JSON.parse(prevUser) : {});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
