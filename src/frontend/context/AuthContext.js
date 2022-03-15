import { createContext } from "react";

const AuthContext = createContext({
  loggedIn: () => {},
  isLoggedIn: false,
  registered: false,
  token: null,
  firstName: "",
  lastName: "",
  email: "",
});

const ServingUrl = createContext({
  localUrl: process.env.REACT_APP_BACKEND_URL,
  cloudUrl: process.env.REACT_APP_CLOUD_URL,
});

export default AuthContext;
export { ServingUrl };
