import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const { Provider } = AuthContext;

export function useAuthContext() {
  const contextValues = useContext(AuthContext);
  return contextValues;
}

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState();

  // Effects
  useEffect(() => {
    const isLogin = !!localStorage.getItem("token");
    if (isLogin) setIsLoggedIn(true);
  }, []);

  return (
    <Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </Provider>
  );
}
