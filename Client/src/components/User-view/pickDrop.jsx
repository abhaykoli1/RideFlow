import React, { useState } from "react";
import { Button } from "../ui/button";
import { DateRange } from "@mui/icons-material";
import { Label } from "../ui/label";
import DayCompo from "./day";
import { useNavigate } from "react-router-dom";
import DateCompo from "./date";
import { useToast } from "@/hooks/use-toast";

const PickDrop = () => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  function searchMessage() {
    console.log("Called");
    return toast({
      title: "Please Select Date and Days First",
      variant: "destructive",
    });
  }
  return (
    <div className="mx-auto container  lg:max-w-[750px] md:max-w-[650px]  max-w-[400px] lg:px-5 md:px-3 sm:px-2  pt-3  Border border-tomato rounded-lg bg-[rgba(0,0,0,0.5)]">
      <div className="flex lg:flex-row  md:flex-row sm:flex-col flex-col flex-1 w-100 justify-around lg:items-center">
        <div className="px-3 flex flex-[0.65] gap-1 flex-row md:flex-row sm:flex-row  justify-around ">
          <div className="mb-4 text-white  active:border-1  w-100  flex justify-center ">
            <div className=" w-full">
              <Label className="lg:text-lg md:text-lg sm:text-[16px] text-md">
                <DateRange className="mr-1 -mt-1.5" fontSize="small" />
                Pick Up
              </Label>
              <div className="BorderBottom">
                <DateCompo
                  Calendar={"!-left-[99px] absolute"}
                  date={date}
                  setDate={setDate}
                  dateCss={" "}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 text-white active:border-1  w-100  flex justify-center">
            <div className=" w-full">
              <Label className="lg:text-lg md:text-lg sm:text-[16px] text-md">
                Days
              </Label>
              <div className="BorderBottom">
                <DayCompo day={day} setDay={setDay} dayCss={""} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col mb-3 text-white flex-[0.35] gap-3 active:border-1 items-center w-100 justify-center flex px-3 w-[100%]">
          <p className="-mt-2 lg:flex md:flex sm:hidden hidden text-lg font-medium text-white bg-clip-text  animate-bounc animate-pulse ">
            Book Your Bike ASAP!!
          </p>
          {date !== null && day !== null ? (
            <Button
              disabled={date !== null && day !== null ? false : true}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  navigate("/ride/listing");
                }, 800);
              }}
              className="bg-transparent SearchBt Border text-[#b8b8b8] hover:border-gray-400 hover:text-[#fff] w-[100%] -mt-2 "
            >
              {loading === true ? "searching..." : "Search Ride"}
            </Button>
          ) : (
            <Button
              onClick={() => {
                alert("Please Select Date and Days First");
              }}
              className="bg-transparent SearchBt Border text-[#b8b8b8] hover:border-gray-400 hover:text-[#fff] w-[100%] -mt-2 "
            >
              Search Ride
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
