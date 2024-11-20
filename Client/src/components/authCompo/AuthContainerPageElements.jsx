import React, { useContext, useState } from "react";
import { Bike, BikeIcon } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../common/Helper/context";
import Logo from "../User-view/logo";

const AuthContainerPageElements = ({
  HaveAccount,
  Auth,
  GoToAuth,
  Google,
  Href,
  To,
}) => {
  // const [showPass]
  const { auth, setAuth } = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex">
        <Logo />
      </div>
      <div className=" d-flex-row align-items-center justify-content-center mb-7">
        <h3 className="text-[20px] text-dark  font-bold">{Auth}</h3>
        <div className="flex gap-2">
          <p className="font-semibold mt-3 text-[14px]">{HaveAccount}</p>
          <p
            onClick={() => {
              setAuth(!auth);
              navigate(To);
            }}
            className="text-yellow underline mt-3 cursor-pointer hover:underline text-[14px]"
          >
            {GoToAuth}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainerPageElements;
