// import RideImageUpload from "@/components/admin-view/image-upload";
// import AdminRideTile from "@/components/admin-view/ride-tile";
// import CommonForm from "@/components/common/form";
// import { MyContext } from "@/components/common/Helper/context";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";

// import { addRidesFormElements } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import {
//   addNewRide,
//   deleteRide,
//   editRide,
//   fetchAllRides,
// } from "@/store/admin/Rides-slice";

// import { Fragment, useContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function AdminRides() {
//   const initialFormData = {
//     image: null,
//     rideName: "",
//     description: "",
//     category: "",
//     brand: "",
//     cc: "",
//     rentPrice: "",
//     salePrice: "",
//     totalStock: "",
//     averageReview: 0,
//   };
//   const { OpenAddRidesDialog, setOpenAddRidesDialog } = useContext(MyContext);
//   const [formData, setFormData] = useState(initialFormData);
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
//   const { RidesList } = useSelector((state) => state.adminRides);

//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   console.log("uploadedImageUrl :", uploadedImageUrl);
//   function onSubmit(event) {
//     event.preventDefault();
//     currentEditedId !== null
//       ? dispatch(
//           editRide({
//             id: currentEditedId,
//             formData,
//             image: uploadedImageUrl,
//           })
//         ).then((data) => {
//           console.log(data, "edit");
//           if (data?.payload?.success) {
//             dispatch(fetchAllRides());
//             setFormData(initialFormData);
//             setOpenAddRidesDialog(false);
//             setCurrentEditedId(null);
//           }
//         })
//       : dispatch(
//           addNewRide({
//             ...formData,
//             image: uploadedImageUrl,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllRides());
//             setOpenAddRidesDialog(false);
//             setImageFile(null);
//             setFormData(initialFormData);
//             toast({
//               title: "Ride added successfully",
//             });
//           }
//         });
//   }

//   function handleDelete(getCurrentRideId) {
//     console.log("get Id", getCurrentRideId);
//     dispatch(deleteRide(getCurrentRideId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllRides());
//       }
//     });
//   }

//   function isFormValid() {
//     return (
//       Object.keys(formData)
//         .filter((key) => key !== "averageReview")
//         .every((key) => formData[key] !== "") && !imageLoadingState
//       // imageFile !== null
//     );
//   }

//   useEffect(() => {
//     dispatch(fetchAllRides());
//   }, [dispatch]);

//   return (
//     <Fragment className="bg-white h-[100vh]">
//       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//         {RidesList && RidesList.length > 0 ? (
//           RidesList.map((RidesListItem) => (
//             <AdminRideTile
//               setFormData={setFormData}
//               setOpenAddRidesDialog={setOpenAddRidesDialog}
//               setCurrentEditedId={setCurrentEditedId}
//               ride={RidesListItem}
//               handleDelete={handleDelete}
//             />
//           ))
//         ) : (
//           <p className="text-slate-800">No Rides found.</p>
//         )}
//       </div>
//       <Sheet
//         open={OpenAddRidesDialog}
//         onOpenChange={() => {
//           setOpenAddRidesDialog(false);
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent
//           side="right"
//           className="overflow-auto !bg-white !text-slate-800"
//         >
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Ride" : "Add New Ride"}
//             </SheetTitle>
//           </SheetHeader>
//           <RideImageUpload
//             imageFile={imageFile}
//             setImageFile={setImageFile}
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl}
//             setImageLoadingState={setImageLoadingState}
//             imageLoadingState={imageLoadingState}
//             isEditMode={currentEditedId !== null}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonCss={"bg-slate-800 text-white"}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addRidesFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminRides;
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideImageUpload from "@/components/admin-view/image-upload";
import AdminRideTile from "@/components/admin-view/ride-tile";
import CommonForm from "@/components/common/form";
import { MyContext } from "@/components/common/Helper/context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addRidesFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewRide,
  deleteRide,
  editRide,
  fetchAllRides,
} from "@/store/admin/Rides-slice";

function AdminRides() {
  // Initial form data structure
  const initialFormData = {
    image: null,
    rideName: "",
    description: "",
    category: "",
    brand: "",
    cc: "",
    rentPrice: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  // State hooks
  const { OpenAddRidesDialog, setOpenAddRidesDialog } = useContext(MyContext);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { RidesList } = useSelector((state) => state.adminRides);

  const dispatch = useDispatch();
  const { toast } = useToast();

  // Fetch all rides on component mount
  useEffect(() => {
    dispatch(fetchAllRides());
  }, [dispatch]);

  // Form submission handler
  const onSubmit = (event) => {
    event.preventDefault();

    const updatedFormData = {
      ...formData,
      image: uploadedImageUrl, // Add image to form data
    };

    // Dispatch edit or add action based on currentEditedId
    if (currentEditedId !== null) {
      dispatch(
        editRide({ id: currentEditedId, formData: updatedFormData })
      ).then((data) => {
        if (data?.payload?.success) {
          handleSuccess("Ride updated successfully");
        }
      });
    } else {
      dispatch(addNewRide(updatedFormData)).then((data) => {
        if (data?.payload?.success) {
          handleSuccess("Ride added successfully");
        }
      });
    }
  };

  // Handle successful actions
  const handleSuccess = (message) => {
    dispatch(fetchAllRides());
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setOpenAddRidesDialog(false);
    setCurrentEditedId(null);
    toast({ title: message });
  };

  // Handle ride deletion
  const handleDelete = (rideId) => {
    dispatch(deleteRide(rideId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllRides());
        toast({ title: "Ride deleted successfully" });
      }
    });
  };

  // Validate form data
  const isFormValid = () => {
    return (
      Object.keys(formData)
        .filter((key) => key !== "averageReview")
        .every((key) => formData[key] !== "") && !imageLoadingState
    );
  };

  return (
    <Fragment>
      {/* Rides Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {RidesList && RidesList.length > 0 ? (
          RidesList.map((ride) => (
            <AdminRideTile
              key={ride.id}
              ride={ride}
              setFormData={setFormData}
              setOpenAddRidesDialog={setOpenAddRidesDialog}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-slate-800">No Rides found.</p>
        )}
      </div>

      {/* Add/Edit Ride Sheet */}
      <Sheet
        open={OpenAddRidesDialog}
        onOpenChange={() => {
          setOpenAddRidesDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto !bg-white text-slate-800"
        >
          <SheetHeader>
            <SheetTitle className="text-slate-800">
              {currentEditedId !== null ? "Edit Ride" : "Add New Ride"}
            </SheetTitle>
          </SheetHeader>
          {/* Image Upload */}
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
              inputCss={"text-slate-800"}
              lableCss={"text-slate-800 font-semibold"}
              textAreaCss={"text-slate-800"}
              formData={formData}
              setFormData={setFormData}
              buttonCss="bg-slate-800 text-white"
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addRidesFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminRides;
