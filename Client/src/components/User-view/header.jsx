import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Call, Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactInfo } from "@/store/common/dashboard-slice";

const Header = () => {
  const { ContactInfo, isLoading } = useSelector((state) => state.dasboard);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchContactInfo();
  }, [dispatch]);

  const Socials = [
    {
      link: "",
      icon: <Facebook />,
    },
    {
      link: "",
      icon: <Instagram />,
    },
    {
      link: "",
      icon: <Twitter />,
    },
  ];
  return (
    <header>
      <div className="bg-yellow fixed  top-0 flex h-8 w-full z-50">
        {ContactInfo && ContactInfo.length > 0
          ? ContactInfo.map((content, index) => (
              <div
                className=" px-4 flex justify-between w-full  z-50"
                key={index}
              >
                <div className="flex font-medium gap-5 items-center">
                  <Label className="flex items-center gap-1 py-3">
                    <Call fontSize="small" />
                    +91 {content.phone}
                  </Label>
                  <Label className="lg:flex md:flex sm:flex hidden items-center gap-1">
                    <Mail className="h-5" />
                    {content.email}
                  </Label>
                </div>
                <div className=" flex gap-5 items-center justify-center cursor-pointer">
                  {Socials.map((items, index) => (
                    <div className="" key={index}>
                      <div className="">{items.icon}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </header>
  );
};

export default Header;
