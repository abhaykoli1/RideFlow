import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useMediaQuery } from "react-responsive";

function AdminLayout() {
  const [sidebar, setSidebar] = useState(true);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 1023px)" });

  useEffect(() => {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  return (
    <div className="flex w-full h-screen bg-whitesmoke">
      <div className="fixed top-0 w-full right-0 z-10  ">
        <AdminHeader setSidebar={setSidebar} sidebar={sidebar} />
      </div>
      <div className="z-10">
        <AdminSidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>
      <main
        className={`flex  p-4 md:p-6  flex-1 flex-col  top-20 absolute right-0 bottom-0  z-0 duration-500 overflow-auto bg-whitesmoke ${
          sidebar ? "lg:left-60 left-0" : "!left-0"
        }`}
      >
        <Outlet />
      </main>

      {sidebar ? (
        <div
          onClick={() => setSidebar(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="lg:hidden md:flex flex w-full h-[100%] fixed right-0 top-0 bottom-0 duration-500 transition-all"
        />
      ) : null}
    </div>
  );
}

export default AdminLayout;
