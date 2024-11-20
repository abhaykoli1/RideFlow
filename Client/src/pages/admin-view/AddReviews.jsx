import RideImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import ReviewTile from "@/components/common/review-Tile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addReviewFormElements } from "@/config";
import {
  addnewReview,
  deleteReview,
  editReview,
  fetchAllReviews,
} from "@/store/admin/Reviews-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  icon: "",
  userName: "",
  review: "",
};

const AddReviews = () => {
  const [openAddReviews, setOpenAddReviews] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { ReviewsList } = useSelector((state) => state.adminReviews);
  console.log(ReviewsList);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editReview({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllReviews());
            setFormData(initialFormData);
            setOpenAddReviews(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addnewReview({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllReviews());
            setOpenAddReviews(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Review added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentReviewId) {
    console.log("get Id", getCurrentReviewId);
    dispatch(deleteReview(getCurrentReviewId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllReviews());
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <Fragment className="bg-white h-[100vh]">
      <div className="mb-5  w-full flex justify-end ">
        <Button
          className="!bg-slate-800"
          onClick={() => setOpenAddReviews(true)}
        >
          Add New Review
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {ReviewsList && ReviewsList.length > 0
          ? ReviewsList.map((items) => (
              <ReviewTile
                review={items}
                setFormData={setFormData}
                setOpenAddReviews={setOpenAddReviews}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openAddReviews}
        onOpenChange={() => {
          setOpenAddReviews(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto !bg-white !text-slate-800"
        >
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Review" : "Add New Review"}
            </SheetTitle>
          </SheetHeader>
          <RideImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonCss={"bg-slate-800 text-white"}
              buttonText={currentEditedId !== null ? "Edit" : "Add Review"}
              formControls={addReviewFormElements}
              //   isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AddReviews;