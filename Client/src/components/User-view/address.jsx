import CommonForm from "../common/form";
import { addressFormControls } from "@/config";

import { SheetHeader, SheetTitle } from "../ui/sheet";

function Address({
  formData,
  setFormData,
  currentEditedId,
  handleManageAddress,
  isFormValid,
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
        formData={formData}
        setFormData={setFormData}
        formControls={addressFormControls}
        buttonText={currentEditedId !== null ? "Edit" : "Add"}
        onSubmit={handleManageAddress}
        isBtnDisabled={!isFormValid()}
      />
    </div>
  );
}

export default Address;
