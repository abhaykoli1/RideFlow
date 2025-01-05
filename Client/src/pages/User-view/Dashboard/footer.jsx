import {
  Facebook,
  Instagram,
  Mail,
  Map,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import whatsapp from "../../../assets/wp.webp";
import tw from "../../../assets/tw.webp";
import ig from "../../../assets/ig.webp";
import fb from "../../../assets/fb.webp";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactInfo } from "@/store/common/dashboard-slice";

const Footer = () => {
  const [Socials, setSocials] = useState([]);
  const navigate = useNavigate();
  const { ContactInfo, isLoading } = useSelector((state) => state.dasboard);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const dispatch = useDispatch();
  useState(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  useEffect(() => {
    if (ContactInfo && ContactInfo.length > 0) {
      const { address, phone, whatsapp, email, instagram, twitter, facebook } =
        ContactInfo[0];
      setSocials([
        {
          id: 1,
          link: twitter || "",
          icon: tw,
        },
        {
          id: 2,
          link: instagram || "",
          icon: ig,
        },
        {
          id: 3,
          link: facebook || "",
          icon: fb,
        },
      ]);

      setFooter([
        {
          id: 1,
          title: "Ride Flow",
          item1Icon: <Mail />,
          item1: `${email || "Email No. not available"}`,
          path1: "/Reach-Us",

          item2Icon: <Phone />,
          item2: `${phone || "Phone No. not available"}`,
          path2: "/Reach-Us",

          item3Icon: "",
          item3: "",
          path3: "",
        },
      ]);
    }
  }, [ContactInfo]);

  const footerLinks = [
    {
      id: 1,
      title: "Legal Terms",
      item1Icon: "",
      item1: "Privacy & Policy",
      path1: "/Policy",
      item2Icon: "",
      item2: "Terms & Conditions",
      path2: "/Terms&Condition",
      item3Icon: "",
      item3: "",
      path3: "",
    },
    {
      id: 2,
      title: "Links",
      item1Icon: "",
      item1: "About Us",
      path1: "/about",
      item2Icon: "",
      item2: "FAQ's",
      path2: "/faqs",
      item3Icon: "",
      item3: "",
      path3: "",
    },
  ];

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section className="items-center">
      <Divider />
      <div className=" flex-1 gap-7 justify-between lg:px-6 md:px-6 sm:px-5 px-5 BorderTop">
        <div className="container mt-2 mx-auto grid md:grid-cols-3 sm:grid-cols-2 lg:gap-16 lg:grid-cols-3 py-3">
          {footer.map((items, index) => (
            <div key={index} className="my-2">
              <h3 className="text-[18px] font-semibold  pb-2 uppercase">
                {items.title}
              </h3>
              <p className="border w-44 mb-3  border-[#ffa500]"></p>
              <div className=" cursor-pointer lg:text-lg md:text-md text-sm font-medium  subtitle">
                <p
                  onClick={() => {
                    goTop();
                    navigate(items.path1);
                  }}
                  className="flex gap-2 mb-1.5 hover:text-[#ffa500] duration-500 items-end"
                >
                  {items.item1Icon}
                  {items.item1}
                </p>
                <p
                  onClick={() => {
                    goTop();
                    navigate(items.path2);
                  }}
                  className="flex gap-2 mb-1.5 hover:text-[#ffa500] duration-500 items-end"
                >
                  {items.item2Icon}
                  {items.item2}
                </p>
                <p
                  onClick={() => {
                    navigate(items.path3);
                  }}
                  className="flex  gap-1 mb-1.5 hover:text-[#ffa500] duration-500 items-end"
                >
                  {items.item3Icon}
                  {items.item3}
                </p>
              </div>
            </div>
          ))}
          {footerLinks.map((items, index) => (
            <div key={index} className="my-2">
              <h3 className="text-[18px] font-semibold  pb-2 uppercase">
                {items.title}
              </h3>
              <p className="border w-44 mb-3  border-[#ffa500]"></p>

              {/* /// */}
              <div className=" cursor-pointer lg:text-lg md:text-md text-sm font-medium  subtitle">
                <p
                  onClick={() => {
                    goTop();
                    navigate(items.path1);
                  }}
                  className="flex gap-2 mb-1.5 hover:text-[#ffa500] duration-500 items-end"
                >
                  {items.item1Icon}
                  {items.item1}
                </p>
                <p
                  onClick={() => {
                    goTop();
                    navigate(items.path2);
                  }}
                  className="flex gap-2 mb-1.5 hover:text-[#ffa500] duration-500 items-end"
                >
                  {items.item2Icon}
                  {items.item2}
                </p>
                <p
                  onClick={() => {
                    navigate(items.path3);
                  }}
                  className="flex  gap-1 mb-1.5 hover:text-[#ffa500] duration-500 items-end"
                >
                  {items.item3Icon}
                  {items.item3}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#ffa500] text-white h-28 w-full flex justify-center items-center ">
        <div>
          <div className="flex-1 text-center font-semibold cursor-default">
            &copy; 2024 RideFlow Rentals. All Right Reserved.
          </div>
          <div className="mt-3  flex gap-5 items-center justify-center cursor-pointer">
            {Socials.map((items, index) => (
              <a
                href={items.link}
                target="_blank"
                className="flex items-center"
                key={index}
              >
                <img
                  src={items.icon}
                  className={` ${
                    items.link === " " ? "hidden" : "flex"
                  } h-10 w-10`}
                />
              </a>
            ))}
          </div>
        </div>

        {showTopBtn && (
          <div
            className="flex invertBg justify-center items-center  lg:h-10 lg:w-10 md:h-10 md:w-10 h-10 w-10 fixed left-5 bottom-5 rounded-md z-50 cursor-pointer"
            onClick={() => goTop()}
          >
            <ChevronUp size={28} />
          </div>
        )}
      </div>

      {ContactInfo && ContactInfo.length > 0
        ? ContactInfo.map((content, index) => (
            <a
              target="_black"
              href={content.whatsapp}
              className="flex justify-center items-center lg:h-24 lg:w-24 md:h-20 md:w-20 h-16 w-16 fixed right-5 bottom-[7px] rounded-md z-50 cursor-pointer"
            >
              <img src={whatsapp} />
            </a>
          ))
        : null}
    </section>
  );
};

export default Footer;
