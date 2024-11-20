import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/user/address-slice";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import { Map } from "lucide-react";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({
  handleDeleteAddress,
  handleEditAddress,
  formData,
  setFormData,
  currentEditedId,
  addressList,
  setCurrentEditedId,
  handleManageAddress,
  isFormValid,
  selectedId,
  setCurrentSelectedAddress,
}) {
  return (
    <div>
      <SheetHeader>
        <SheetTitle className="flex gap-3 items-center mb-6 text-slate-800">
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </SheetTitle>
      </SheetHeader>

      <CommonForm
        buttonCss={` ${
          !isFormValid() ? "bg-black" : "bg-slate-800"
        } text-white`}
        inputCss={"text-slate-800"}
        lableCss={"text-slate-800 mt-2"}
        textAreaCss={"text-slate-800"}
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={currentEditedId !== null ? "Edit" : "Add"}
        onSubmit={handleManageAddress}
        isBtnDisabled={!isFormValid()}
      />
    </div>
  );
}

export default Address;
