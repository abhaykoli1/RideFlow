import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";

function RideDetailsDialog({ open, setOpen, RideDetails }) {
  const navigate = useNavigate();

  return (
    <Dialog className="detailsDialogBox " open={open} onOpenChange={setOpen}>
      <DialogContent className="!p-6 bg-gradient-to-t from-[#ffeecc] to-white detailsDialog !bg-whit border-[0.5px] border-gray-500 grid pt-16 grid-cols-2  gap-8 sm:p-12 max-w-[90vw] max-h-[100vh] sm:max-w-[70vw] md:max-w-[80vw] text-black lg:max-w-[70vw] overflow-auto">
        <div>
          <h1 className="text-2xl font-bold -mt-2">Ride Details</h1>
          <div className="relative overflow-hidden rounded-lg detailsImageBo">
            <img
              src={RideDetails?.image}
              alt={RideDetails?.rideName}
              className="aspect-square w-full object-cover detailsImage rounded-lg"
            />
          </div>
        </div>
        <div>
          <div className="pt-10">
            <DialogTitle className=" font-extrabold ">
              <p className="text-yellow capitalize mb-1 text-2xl">
                {RideDetails?.brand}
              </p>
              <p className="text-black text-xl  capitalize mb-1">
                {RideDetails?.rideName}
              </p>
            </DialogTitle>
            <DialogDescription>{RideDetails?.description}</DialogDescription>
          </div>
          <div className="flex flex-col pt-2">
            {RideDetails?.salePrice === 0 ? (
              <span
                className={`${
                  RideDetails?.salePrice > 0 ? "line-through" : ""
                } text-[15px] font-semibold  text-tomato`}
              >
                {"\u20B9"}
                {RideDetails?.rentPrice}
              </span>
            ) : (
              <span
                className={`${
                  RideDetails?.salePrice > 0 ? "line-through" : ""
                } text-[13px] font-medium  subtitle`}
              >
                {"\u20B9"}
                {RideDetails?.rentPrice}
              </span>
            )}

            {RideDetails?.salePrice > 0 ? (
              <div className="flex gap-3 items-center">
                <span className=" text-[14px] font-bold text-tomato">
                  {(
                    ((RideDetails?.rentPrice - RideDetails?.salePrice) /
                      RideDetails?.rentPrice) *
                    100
                  ).toFixed(0)}
                  %
                </span>
                <span className=" text-[14px] font-bold text-slate-800">
                  {"\u20B9"}
                  {RideDetails?.salePrice}
                  <span className="text-[14px] italic mr-10"> /- </span>
                </span>
              </div>
            ) : null}
          </div>

          <div className="text-gray-500 text-sm font-medium pt-2">
            <h5 className="font-bold text-black text-[15px] pb-2">
              Specification
            </h5>
            <div className="flex ">
              <div className="flex-[.5] flex gap-1 flex-col">
                <DialogDescription className="flex justify-between">
                  Type :
                </DialogDescription>
                <DialogDescription className="flex justify-between">
                  Brand:
                </DialogDescription>
                <DialogDescription className="flex justify-between">
                  Model:
                </DialogDescription>
                <DialogDescription className="flex justify-between">
                  Consumption:
                </DialogDescription>
                <DialogDescription className="flex justify-between">
                  HD:
                </DialogDescription>{" "}
                <DialogDescription className="flex justify-between">
                  CC:
                </DialogDescription>
              </div>
              <div className="flex-[.5] flex gap-1 flex-col">
                <DialogDescription>SCOOTER</DialogDescription>
                <DialogDescription>TVS</DialogDescription>
                <DialogDescription>Scooty </DialogDescription>
                <DialogDescription>40</DialogDescription>{" "}
                <DialogDescription>5.4 pS @ 6500</DialogDescription>
                <DialogDescription>87.8</DialogDescription>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5">
            {RideDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full border-gray-600 hover:border-black bg-black text-white   hover:text-white "
                onClick={() => {
                  navigate("/ride/booking");
                }}
                // handleAddToCart(RideDetails?._id, RideDetails?.totalStock)
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RideDetailsDialog;
