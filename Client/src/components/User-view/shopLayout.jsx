import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShopHeader from "./shopHeader";
import ShopSidebar from "./shopSidebar";
import { MyContext } from "../common/Helper/context";
import Footer from "@/pages/User-view/Dashboard/footer";

function ShopLayout() {
  const { sidebar, setSidebar } = useContext(MyContext);
  const [HeaderContent, setHeaderContent] = useState();
  const [footerVisible, setFooterVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/ride/home") {
      setHeaderContent(true);
      setFooterVisible(false);
    } else if (location.pathname === "/ride/listing") {
      setFooterVisible(false);
    } else {
      setFooterVisible(true);
    }
  }, [location]);

  return (
    <div className="h-screen flex-1 flex min-h-screen w-full ">
      {/* sidebar */}
      <div
        className={`z-30 h-full mt-0 fixed duration-500 transition-all  shadow-xl
          ${sidebar ? "left-0" : "-left-[241px] "}`}
      >
        <ShopSidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
          setHeaderContent={setHeaderContent}
          HeaderContent={HeaderContent}
        />
      </div>
      {/* header  */}
      <div className="fixed top-0 w-full right-0 bg-transparent z-50">
        <ShopHeader
          setOpen={setSidebar}
          sidebar={sidebar}
          setSidebar={setSidebar}
          setHeaderContent={setHeaderContent}
          HeaderContent={HeaderContent}
        />
      </div>
      <div className="HeaderBG  lg:h-[72px] md:h-[72px] h-[60px] w-full fixed  top-0 z-40"></div>

      <main className="absolute top-0 right-0 left-0">
        <div className="  h-full ">
          <Outlet />
        </div>
        {footerVisible ? <Footer /> : null}
      </main>
      {/* <main
        className={`flex flex-col absolute top-0  left-0 right-0 bottom-0  duration-500 transition-all scroll bg-cover  h-100 justify-between`}
      >
      {/* {footerVisible ? <Footer /> : null} */}
      {/* </main> */}

      {sidebar ? (
        <div
          onClick={() => setSidebar(false)}
          className="sidebarBack z-10 lg:hidden md:flex flex w-full h-screen fixed right-0 top-0 bottom-0 duration-500 transition-all"
        />
      ) : null}
    </div>
  );
}

export default ShopLayout;