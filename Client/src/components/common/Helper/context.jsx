import { createContext, useState } from "react";

const MyContext = createContext();
const AuthProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [auth, setAuth] = useState(false);
  const [currentRideId, setCurrentRideId] = useState("");
  const [openAddReviews, setOpenAddReviews] = useState(false);
  const [OpenAddRidesDialog, setOpenAddRidesDialog] = useState(false);

  return (
    <MyContext.Provider
      value={{
        setSidebar,
        sidebar,
        auth,
        openAddReviews,
        setOpenAddReviews,
        setAuth,
        OpenAddRidesDialog,
        setOpenAddRidesDialog,
        currentRideId,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { AuthProvider, MyContext };
