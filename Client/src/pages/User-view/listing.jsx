import { MyContext } from "@/components/common/Helper/context";
import RideFilter from "@/components/User-view/filter";
import UserRideTile from "@/components/User-view/ride-tile";
import {
  fetchAllFilteredRides,
  // fetchRideDetails,
} from "@/store/user/Rides-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
// import RideDetailsDialog from "@/components/User-view/ride-details";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useMediaQuery } from "react-responsive";
import useDeviceType from "@/hooks/useDeviceType";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  // console.log("queryParams", queryParams);
  return queryParams.join("&");
}

const RideListing = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 514px)" });
  const { RidesList } = useSelector((state) => state.userRides);
  // console.log("RideDetails", RideDetails);
  // console.log("Ride list", RidesList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sidebar, setSidebar } = useContext(MyContext);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const categorySearchParam = searchParams.get("category");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { setCurrentRideId } = useContext(MyContext);
  // console.log("RideDetials : ", RideDetails);
  //
  const handleSort = (value) => {
    setSort(value);
    console.log(value);
  };
  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
    // console.log("cpyFilters", cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  // function handleGetRideDetails(getCurrentRideId) {
  //   console.log("getCurrentRideId :", getCurrentRideId);
  //   dispatch(fetchRideDetails(getCurrentRideId));
  // }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // Search Parameters on Change
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

  const deviceType = useDeviceType();
  {
    /* <div className="bg-red-300 p-4">
          <h1 className="text-white text-xl">Device Type Detection</h1>
          <p className="text-white">
            You are visiting on a {deviceType} device.
          </p>
        </div> */
  }
  return (
    <section className={`fixed flex w-full mt-0 left-0 h-[100%] ListingBg`}>
      {/* Filter  */}
      <div
        className={`h-[100%] overflow-scroll duration lg:w-[240px]  BorderRight`}
      >
        <div
          className={`lg:flex ml-5 mt-16 pt-[7px] md:hidden sm:hidden hidden rounded-sm z-1`}
        >
          <RideFilter filters={filters} handleFilter={handleFilter} />
        </div>
      </div>

      {/* listing  */}
      <div
        className={`flex flex-1 h-[100%] overflow-scroll pt-20 duration-700  flex-col`}
      >
        <div className=" py-3 mx-3 flex items-center justify-between BorderBotto border-b border-whit">
          <p className="text-md font-semibold">
            Displaying {RidesList?.length} Results{" "}
          </p>

          <div className="flex items-center gap-3">
            <div className="lg:hidden flex justify-end ">
              <Button
                onClick={() => setOpenFilterDialog(true)}
                className=" h-8 invertBg "
              >
                Filters
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="flex items-center gap-1 h-8 invertBg "
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[170px] !py-1 mt-1  Border   shadow-lg
                !bg-white !text-slate-800"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      className="hover:!bg-slate-100 "
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-4 md:g-3 sm:gap-4 lg:p-4 md:p-3 sm:p-3 p-3">
          {RidesList && RidesList.length > 0
            ? RidesList.map((rideItem, index) => (
                <UserRideTile
                  key={index}
                  fleet={true}
                  RidesList={RidesList}
                  className={
                    "grid bg-white grid-cols-1 shrink-0 w-full relative !rounded-xl overflow-hidden cursor-pointer mx-auto border"
                  }
                  // setOpenDetailsDialog={setOpenDetailsDialog}
                  // key={rideItem.id}
                  ride={rideItem}
                  // handleAddToCart={handleAddToCart}
                  // handleGetRideDetails={handleGetRideDetails}
                  // handleAddtoCart={handleAddtoCart} <div>No rides available.</div>
                />
              ))
            : null}
        </div>
      </div>

      {/* Filter Sheet */}
      <Sheet
        className=""
        open={openFilterDialog}
        onOpenChange={() => {
          setOpenFilterDialog(false);
        }}
      >
        <SheetContent className="BorderLeft shadow-none w-60 overflow-auto backdrop-blur-xl pl-4 rounded-x">
          <div className="mt-5 ">
            <RideFilter filters={filters} handleFilter={handleFilter} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default RideListing;
