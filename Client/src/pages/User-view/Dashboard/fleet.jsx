import { MyContext } from "@/components/common/Helper/context";
import { fetchAllFilteredRides } from "@/store/user/Rides-slice";
import { MoveRight, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import UserRideTile from "@/components/User-view/ride-tile";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const RideFleet = () => {
  const { RidesList, RideDetails } = useSelector((state) => state.userRides);
  const dispatch = useDispatch();
  // const { sidebar, setSidebar } = useContext(MyContext);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredRides({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (RideDetails !== null) setOpenDetailsDialog(true);
  }, [RideDetails]);

  return (
    <section
      id="fleet"
      className="cursor-default 2xl:flex flex-col items-center mx-auto lg:pt-8"
    >
      <div className="titleHolder text-center flex flex-col gap-5  lg:pt-10 md:pt-8 sm:pt-6 pt-5 container mx-auto px-2">
        <div className=" flex items-center justify-center gap-2 ">
          <p className="  relative text-[#ffa500] font-bold text-3xl">
            Ride with Us!
          </p>
        </div>
        <div className="titleHolder px-3">
          <h1 className="font-bold text-4xl -mt-2">
            Choose the Perfect Bike for Your Adventure!
          </h1>
          <h6 className="mt-2 subtitle">
            As Jaipur's largest bike rental inventory, we offer unmatched
            options for every rider.
          </h6>
        </div>
        <div className="titleHolder flex gap-5 justify-center items-center pb-6 pt-2 subtitle">
          <h6 className=""> Simply Book</h6>
          <span className="animate-bounce ">
            <MoveRight />
          </span>
          <h6 className="">Pick Up</h6>
          <span className="animate-bounce flex">
            <MoveRight />
          </span>
          <h6 className="">Enjoy Your Journey!</h6>
        </div>
      </div>

      <div className="flex HorizontalScroll pt-7 pb-10 gap-5 px-5 md:px-10">
        {RidesList && RidesList.length > 0 ? (
          RidesList.slice(0, 5).map((rideItem, index) => (
            <UserRideTile
              index={index}
              className={
                "grid bg-white shadow-xl grid-cols-1 shrink-0 w-64 relative !rounded-xl overflow-hidden cursor-pointer mx-auto border"
              }
              fleet={true}
              RidesList={RidesList}
              setOpenDetailsDialog={setOpenDetailsDialog}
              key={rideItem.id}
              ride={rideItem}
              // handleGetRideDetails={handleGetRideDetails}
              // handleAddtoCart={handleAddtoCart} <div>No rides available.</div>
            />
          ))
        ) : (
          <p className="text-center text-md w-full animate-pulse">
            No rides available at the moment...
          </p>
        )}
      </div>
    </section>
  );
};

export default RideFleet;
