import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

import React, { Fragment, useContext, useEffect, useState } from "react";
import { MyContext } from "@/components/common/Helper/context";

const AdminDashboard = () => {
  const { sliderImages } = useContext(MyContext);

  const { toast } = useToast();

  const [OpenAddSlider, setOpenAddSlider] = useState(false);
  const [isRemoveImage, setIsRemoveImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isDisable, setDisable] = useState(true);
 

  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [sliderImage, setSliderImage] = useState([]);

  //// Submit

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between bg-whitesmoke">
        <h1 className="text-2xl font-bold ">Dashboard </h1>
        <Button
          className="bg-slate-800 lg:h-10 lg:px-2 text-white  md:h-9 md:px-2 sm:h-9  h-8 px-2 py-1 text-[11px]"
          // onClick={() => setOpenAddSlider(true)}
        >
          Add Slider JPG
        </Button>
      </div>
      <div className="overflow-y-scroll flex flex-row  gap-4 whitespace-nowrap w-full no-scrollbar mb-8">
        {/* {sliderImages && sliderImages.length > 0
          ? sliderImages.map((items, index) => (
              <div key={index}>
                <h2 className="font-medium text-lg mb-2 ">{items.Alt} :</h2>
                <div className="h-40 overflow-hidden w-72 flex items-center justify-center bg-white rounded-md ">
                  <img src={items.imageUrl} alt="" className="rounded-md" />
                </div>
              </div>
            ))
          : null} */}
      </div>

      <Sheet
        open={OpenAddSlider}
        onOpenChange={() => {
          setOpenAddSlider(false);
          setCurrentEditedId(null);
          // setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="text-left">
            <SheetTitle>Add Image To Slider</SheetTitle>
          </SheetHeader>

          {/* <RidesImageUpload
            title="Slider Images"
            folder="Slider"
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            isRemoveImage={isRemoveImage}
            setDisable={setDisable}
          /> */}
          <Button
            disabled={isDisable}
            // onClick={() => onSubmit()}
            className="w-full bg-black"
          >
            Add
          </Button>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminDashboard;
