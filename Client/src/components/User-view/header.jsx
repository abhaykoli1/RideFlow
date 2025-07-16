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
        {/* {ContactInfo && ContactInfo.length > 0
          ? ContactInfo.map((content, index) => ( */}
        <div className=" px-4 flex justify-end w-full  z-50">
          <div className="flex font-medium gap-2 items-center justify-end w">
            <Call fontSize="small" className="text-black" />
            <a
              href={`tel:${9351254093}`}
              title="Contact Number"
              className="text-black hover:text-black"
            >
              +91 9351254093,
            </a>
            <a
              href={`tel:${9511564276}`}
              title="Contact Number"
              className="text-black hover:text-black"
            >
              +91 9511564276
            </a>
          </div>

          {/* <div className=" flex gap-5 items-center justify-center cursor-pointer">
                  {Socials.map((items, index) => (
                    <div className="" key={index}>
                      <div className="">{items.icon}</div>
                    </div>
                  ))}
                </div> */}
        </div>
        {/* // )) // : null} */}
      </div>
    </header>
  );
};

export default Header;
