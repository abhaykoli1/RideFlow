import { createContext, useState } from "react";

const MyContext = createContext();
const AuthProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [auth, setAuth] = useState(false);

  // const callFunction = (value) => {
  //   setSidebar(value);
  // };
  const [currentRideId, setCurrentRideId] = useState("");
  // console.log("auth loc", auth);
  return (
    <MyContext.Provider
      value={{
        setSidebar,
        sidebar,
        auth,
        setAuth,
        currentRideId,
        // callFunction,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { AuthProvider, MyContext };
