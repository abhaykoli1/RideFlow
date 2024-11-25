import { LogoutOutlined } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Menu, CircleChevronLeft, MenuIcon } from "lucide-react";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import Logo from "../User-view/logo";

const AdminHeader = ({ setSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    navigate("/");
    dispatch(logoutUser());
  }
  return (
    <header
      className={`flex  items-center justify-between px-4 py-3 bg-[#fff] h-20 shadow-md
        `}
    >
      <div className="flex items-center gap-4">
        <Menu
          onClick={() => setSidebar(true)}
          size={34}
          color="#222"
          className="h-10  w-11 border rounded-md border-slate-700 p-1 cursor-pointer"
        />
        <Logo L2={"text-slate-800"} B={"border border-black"} />
      </div>
      <div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-transparent !border-orange-500 text-slate-700 inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-md  "
        >
          <LogoutOutlined />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
