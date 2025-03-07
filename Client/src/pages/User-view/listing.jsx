import RideFilter from "@/components/User-view/filter";
import UserRideTile from "@/components/User-view/ride-tile";
import { fetchAllFilteredRides } from "@/store/user/Rides-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DateCompo from "@/components/User-view/date";
import DayCompo from "@/components/User-view/day";
import { Helmet } from "react-helmet";

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

const RideListing = () => {
  const { RidesList } = useSelector((state) => state.userRides);
  const dispatch = useDispatch();
  const [day, setDay] = useState("1");
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const categorySearchParam = searchParams.get("category");

  const handleSort = (value) => {
    setSort(value);
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
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

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
    if (filters !== null && sort !== null);
    dispatch(
      fetchAllFilteredRides({ filterParams: filters, sortParams: sort })
    );
  }, [dispatch, sort, filters]);

  return (
    <section className={`fixed flex w-full mt-0 left-0 h-[100%] ListingBg `}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Listed Rides | RideFlow | Bike to ride in jaipur</title>
        <link rel="canonical" href="https://rideflowrentals.in/listing" />
      </Helmet>
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
        <div
          className={`flex lg:items-center lg:flex-row md:flex-row sm:flex-row flex-col-reverse gap-5 mb-7 mt-2 ml-5`}
        >
          <DayCompo
            day={day}
            setDay={setDay}
            dayCss={
              "font-semibold h-8 Text !text-lg !border-b !pl-2 !rounded-lg ! h-9"
            }
          />
          <DateCompo
            date={date}
            setDate={setDate}
            Calendar={"!-left-[115px] absolute"}
            dateCss={
              "font-semibold !text-lg  Text !border-b !pl-2  !rounded-lg   h-9 w-full"
            }
          />
        </div>
        <div className=" py-3 mx-6 x-3 flex items-center justify-between BorderBottom  border-whit">
          <h6 className="text- font-semibold">{RidesList?.length} Results</h6>
          <div className="flex items-center gap-3">
            <div className="lg:hidden flex justify-end ">
              <Button
                onClick={() => setOpenFilterDialog(true)}
                className=" h-8 invertBg"
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
                className="w-[170px] !py-1 mt-1 Border shadow-lg
                !bg-white !text-slate-800"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      className="hover:!bg-slate-100"
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

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  p-5">
          {RidesList && RidesList.length > 0
            ? RidesList.map((rideItem, index) => (
                <UserRideTile
                  key={index}
                  fleet={true}
                  RidesList={RidesList}
                  ride={rideItem}
                  className={
                    "grid bg-white grid-cols-1  shrink-0 w-full relative !rounded-xl overflow-hidden cursor-pointer mx-auto border"
                  }
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
