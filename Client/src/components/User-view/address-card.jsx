import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  console.log(addressInfo);
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-yellow rounded-sm ${
        selectedId?._id === addressInfo?._id
          ? "bg-gradient-to-b from-[#ffedca]  to-white  "
          : "border-black"
      }`}
    >
      <CardContent className="flex flex-col p-4 gap-1 !px-3 py-2">
        <Label className="text-md">
          {addressInfo?.address},
          <span className="uppercase">{addressInfo?.city}</span>,
          <span className="uppercase">Rajisthan</span>, {addressInfo?.pincode}
        </Label>
        <Label className="text-md ">Phone : {addressInfo?.phone}</Label>
        {/* <Button className="w-16 h-7 mt-1   bg-transparent rounded Border">
          Home
        </Button> */}
        <div
        // className={`${
        //   selectedId?._id === addressInfo?._id
        //     ? "flex flex-col gap-2"
        //     : "flex items-center"
        // } justify-between `}
        ></div>
      </CardContent>
      <CardFooter
        className={`${
          selectedId?._id === addressInfo?._id ? "flex" : "hidden"
        } p-3 justify-between -mt-2`}
      >
        <div
          className=" hover:text-green-600 font-semibold"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </div>
        <div
          className=" hover:text-tomato font-semibold"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </div>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
