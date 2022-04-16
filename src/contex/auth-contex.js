import { createContext, useState } from "react";

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  isError: false,
};

export const AuthContext = createContext(initState);

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(initState);

  const start = () =>
    setState({ user: null, isFetching: true, isError: false });
  const success = (user) =>
    setState({ user, isFetching: false, isError: false });
  const failure = () =>
    setState({ user: null, isFetching: false, isError: true });
  const logout = () =>
    setState({ user: null, isFetching: false, isError: false });

  return (
    <AuthContext.Provider
      value={{ state, func: { start, success, failure, logout } }}
    >
      {children}
    </AuthContext.Provider>
  );
};
