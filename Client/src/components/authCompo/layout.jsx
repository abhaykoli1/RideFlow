import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { MyContext } from "../common/Helper/context";

const AuthLayout = () => {
  const { auth } = useContext(MyContext);

  return (
    <div className="flex min-h-screen w-full relative justify-between">
      <div
        className={`absolute  top-0 bottom-0 z-20 hidden md:flex lg:flex items-center justify-center w-[calc(100vw-360px)] px-12 bg-cover bg-top
    duration-500 transition-all
    ${auth ? "translate-x-[360px]" : "translate-x-0"}
  `}
        style={{
          backgroundImage:
            "url('http://res.cloudinary.com/dulkmeadg/image/upload/v1730526219/e7l6eu9absgauzh6pi9c.jpg')",
        }}
      >
        <div className="max-w-md space-y-6 text-center text-primary-foreground"></div>
      </div>
      <div
        className={`fixed bg-white text-slate-800 top-0 bottom-0 flex items-center justify-center px-4 lg:px-10 md:px-5 sm:px-5 transition-transform duration-500
        ${
          !auth
            ? "lg:translate-x-[calc(100vw-360px)] md:translate-x-[calc(100vw-360px)]"
            : ""
        }
        lg:w-[360px] md:w-[360px] sm:w-full w-full lg:flex-[0.3] flex-1`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
