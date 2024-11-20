import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "@mui/material";

function RideFilter({ filters, handleFilter }) {
  return (
    <div className="w-full min-w-[200px] px-4">
      <div className="pt-[22px] pb-[15px] BorderBottom">
        <p className="text-lg font-extrabold">Filters</p>
      </div>
      <div className="py-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold capitalize">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-0 ">
                    <Checkbox
                      className="!text-yellow"
                      sx={{
                        color: "slate",
                        "&.Mui-checked": {
                          color: "tomato",
                        },
                      }}
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <div className="BorderBottom" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default RideFilter;
