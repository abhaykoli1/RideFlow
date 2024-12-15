import AddContactInfo from "@/components/admin-view/AddContactInfo";
import RideImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { addContactDetails, addDashboardFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";

import {
  editDashboardContent,
  addNewDashboardContent,
  fetchDashboardContent,
  deleteAllDashboardContent,
} from "@/store/common/dashboard-slice";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  heading: "",
};

function AdminDashboard() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { DashboardContent } = useSelector((state) => state.dasboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editDashboardContent({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchDashboardContent());
            setFormData(initialFormData);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewDashboardContent({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchDashboardContent());
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Content added successfully",
            });
          }
        });
  }

  // function handleDelete(getCurrentId) {
  //   console.log("get Id", getCurrentId);
  //   dispatch(deleteDashboardContent(getCurrentId)).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchDashboardContent());
  //     }
  //   });
  // }
  function handleDeleteAll() {
    dispatch(deleteAllDashboardContent()).then((data) => {
      if (data?.payload?.success) {
        window.location.reload();
        // dispatch(fetchDashboardContent());
      } else {
        console.error("Failed to delete all content:", data?.payload?.message);
      }
    });
  }

  function isFormValid() {
    return (
      Object.keys(formData)
        .filter((key) => key !== "averageReview")
        .every((key) => formData[key] !== "") &&
      !imageLoadingState &&
      imageFile !== null
    );
  }

  useEffect(() => {
    dispatch(fetchDashboardContent());
  }, [dispatch]);

  return (
    <Fragment className="bg-white text-black h-[100vh]">
      <div className="mb-5  w-full flex justify-between items-center">
        <h1 className="text-3xl text-slate-800 font-bold ">Dashboard </h1>
      </div>
      <div className="max-w-[750px mx-aut w-full ">
        {/* <div className="grid gap-10 grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"> */}
        <div>
          {DashboardContent && DashboardContent.length > 0 ? (
            DashboardContent.map((content, index) => (
              <div
                key={index}
                className={`2xl:h-[400px] rounded-xl  xl:h-[400px] lg:h-[300px] md:h-[250px] sm:h-[250px] h-[250px] bg-cover bg-top`}
                style={{
                  backgroundImage: `url(${content.image})`,
                }}
              >
                <div className="hero-Back rounded-xl">
                  <div className="mx-auto  2xl:h-[400px] xl:h-[400px] lg:h-[300px] md:h-[250px] pt-24 pb-3 sm:h-[250px] h-[250px]    flex flex-col justify-between  ">
                    <div id="Conten" className="text-center">
                      <h1
                        className={`bebas-neue-regular bg-gradient-to-t from-[#fff] to-[#fff9ee] bg-clip-text text-transparent font-bold text-shadow lg:text-[6vw] xl:text-[4vw] 2xl:text-[4vw] sm:text-[8vw] text-[10.5vw] leading-[1]  w-full`}
                      >
                        {content.heading}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <RideImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />

              <div className="py-6 max-w-[450px] w-full mx-auto">
                <CommonForm
                  onSubmit={onSubmit}
                  formData={formData}
                  inputCss={"text-slate-800"}
                  lableCss={"text-slate-800"}
                  setFormData={setFormData}
                  buttonCss={"bg-slate-800 text-white"}
                  buttonText={currentEditedId !== null ? "Edit" : "Add"}
                  formControls={addDashboardFormElements}
                  isBtnDisabled={!isFormValid()}
                />
              </div>
            </div>
          )}
          <div className="max-w-[750px] mt-5 mx-auto">
            {DashboardContent && DashboardContent.length > 0 ? (
              <Button
                className=" w-full bg-slate-800 text-white"
                onClick={handleDeleteAll}
              >
                Delete
              </Button>
            ) : null}
          </div>
        </div>

        <div className="w-full flex items-center flex-col"></div>
        <AddContactInfo />
      </div>
    </Fragment>
  );
}

export default AdminDashboard;
