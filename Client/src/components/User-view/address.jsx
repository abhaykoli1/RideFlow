import CommonForm from "../common/form";
import { addressFormControls } from "@/config";

import { SheetHeader, SheetTitle } from "../ui/sheet";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

function Address({
  formData,
  setFormData,
  currentEditedId,
  handleManageAddress,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (name === "address") {
      if (!value.trim()) {
        newErrors.address = "Address is required";
      } else {
        delete newErrors.address;
      }
    }

    if (name === "phone") {
      if (!value.trim() || !/^\d{10}$/.test(value)) {
        newErrors.phone = "Phone must be a 10-digit number";
      } else {
        delete newErrors.phone;
      }
    }

    if (name === "pincode") {
      if (!value.trim() || !/^\d{6}$/.test(value)) {
        newErrors.pincode = "Pincode must be a 6-digit number";
      } else {
        delete newErrors.pincode;
      }
    }
    setErrors(newErrors);
  };

  // Derived flag to check if the form is valid
  const isFormInvalid =
    !formData.address.trim() ||
    !formData.phone.trim() ||
    !/^\d{10}$/.test(formData.phone) ||
    !formData.pincode.trim() ||
    !/^\d{6}$/.test(formData.pincode);

  return (
    <div>
      <SheetHeader>
        <SheetTitle className="flex gap-3 items-cente  text-slate-800 mb-2">
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </SheetTitle>
        <Label className="text-slate-500 leading-4 mb-6 text-start">
          Note : Bike Rental service is currently available only in Jaipur,
          Rajasthan!
        </Label>
      </SheetHeader>

      <form onSubmit={handleManageAddress} className="text-slate-800">
        {/* Address */}
        <div className="mb-1">
          <Label className="block text-sm font-medium text-gray-700">
            Address
          </Label>
          <Input
            type="text"
            name="address"
            placeholder="Hawa Mahal"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2  border outline-none block w-full rounded-md border-gray-300 shadow-sm focus:ring- ring-none  focus:border-blue-500"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div className="mb-1">
          <Label className="block text-sm font-medium text-gray-700">
            City
          </Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            // onChange={handleChange}
            className="mt-1 p-2 block  border outline-none w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {/* {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>} */}
        </div>

        {/* State */}
        <div className="mb-1">
          <Label className="block  text-sm font-medium text-gray-700">
            State
          </Label>
          <Input
            type="text"
            name="state"
            value={formData.state}
            // onChange={handleChange}
            className="mt-1 p-2 block  border outline-none w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {/* {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )} */}
        </div>

        {/* Pincode */}
        <div className="mb-1">
          <Label className="block text-sm font-medium text-gray-700">
            Pincode
          </Label>
          <Input
            type="text"
            name="pincode"
            placeholder="123456"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-1 p-2 block  border outline-none w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm">{errors.pincode}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700">
            Phone
          </Label>
          <div className="flex items-center gap-2 mt-1">
            <Input value="+91" className="w-14" />
            <Input
              type="number"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              className=" p-2 block   outline-none w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          disabled={isFormInvalid}
          type="submit"
          className="w-full bg-slate-800 text-white py-2 rounded-md hover:scale"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Address;
