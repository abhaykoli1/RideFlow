// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useEffect, useRef, useState } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { Skeleton } from "../ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import config from "@/store/config";

// function RideImageUpload({
//   imageFile,
//   setImageFile,
//   uploadedImageUrl,
//   setUploadedImageUrl,
//   imageLoadingState,
//   setImageLoadingState,
//   isEditMode,
//   isCustomStyling = false,
// }) {
//   const inputRef = useRef(null);
//   const [imageError, setImageError] = useState(null);
//   const { toast } = useToast();
//   const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes

//   // Handle file selection
//   async function handleImageFileChange(event) {
//     const selectedFile = event.target.files?.[0];

//     if (selectedFile) {
//       if (selectedFile.size > MAX_SIZE) {
//         setImageError("File size exceeds 10MB limit");
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//         toast({
//           title: "Uh oh! Something went wrong.",
//           description: "File size exceeds 10MB limit",
//         });
//         setImageFile(null);
//         return;
//       } else {
//         setImageError(null);
//         try {
//           const webpFile = await convertToWebp(selectedFile);
//           setImageFile(webpFile);
//         } catch (error) {
//           toast({
//             title: "Error",
//             description: "Failed to convert image to .webp",
//           });
//         }
//       }
//     }
//   }

//   // Function to convert image to .webp format
//   function convertToWebp(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();

//       reader.onload = function (e) {
//         const img = new Image();
//         img.src = e.target.result;

//         img.onload = function () {
//           const canvas = document.createElement("canvas");
//           canvas.width = img.width;
//           canvas.height = img.height;

//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0);

//           // Convert canvas content to .webp data URL
//           canvas.toBlob(
//             (blob) => {
//               if (blob) {
//                 const webpFile = new File(
//                   [blob],
//                   file.name.replace(/\.\w+$/, ".webp"),
//                   {
//                     type: "image/webp",
//                     lastModified: Date.now(),
//                   }
//                 );
//                 resolve(webpFile);
//               } else {
//                 reject(new Error("Failed to convert image to .webp"));
//               }
//             },
//             "image/webp",
//             1.0 // Quality (0.8 = 80%)
//           );
//         };

//         img.onerror = function () {
//           reject(new Error("Failed to load image for conversion"));
//         };
//       };

//       reader.onerror = function () {
//         reject(new Error("Failed to read the image file"));
//       };

//       reader.readAsDataURL(file);
//     });
//   }

//   // Handle drag over (for drag-and-drop)
//   function handleDragOver(event) {
//     event.preventDefault();
//   }

//   // Handle drop (for drag-and-drop)
//   function handleDrop(event) {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer.files?.[0];
//     if (droppedFile)
//       handleImageFileChange({ target: { files: [droppedFile] } });
//   }

//   // Remove the uploaded image
//   function handleRemoveImage() {
//     setImageFile(null);
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   }

//   // Upload image to server or cloud storage (like Cloudinary)
//   async function uploadImageToServer() {
//     setImageLoadingState(true);
//     const data = new FormData();
//     data.append("file", imageFile);

//     try {
//       const response = await axios.post(`${config.API_URL}/upload`, data);

//       if (response?.data?.success) {
//         toast({
//           title: "Image Uploaded Successfully",
//         });
//         setUploadedImageUrl(response.data.result.url);
//         console.log(response.data.result.url);
//       }
//     } catch (error) {
//       toast({
//         title: "Error Uploading Image",
//         description: error.message,
//       });
//       setImageFile(null);
//     } finally {
//       setImageLoadingState(false);
//     }
//   }

//   // Trigger image upload once the file is selected
//   useEffect(() => {
//     if (imageFile !== null) uploadImageToServer();
//   }, [imageFile]);

//   return (
//     <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
//       <Label className="text-lg text-slate-800 font-semibold mb-2 block">
//         Upload Image
//       </Label>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         className={`${
//           isEditMode ? "opacity-60" : ""
//         } border-2 border-dashed border-muted-foreground rounded-lg p-4`}
//       >
//         <Input
//           id="image-upload"
//           type="file"
//           className="hidden"
//           ref={inputRef}
//           onChange={handleImageFileChange}
//           // disabled={isEditMode}
//         />
//         {!imageFile ? (
//           <Label
//             htmlFor="image-upload"
//             className={`${
//               isEditMode ? "cursor-not-allowed" : ""
//             } flex flex-col items-center justify-center h-32 cursor-pointer`}
//           >
//             <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//             <span className="text-muted-foreground">
//               Drag & drop or click to upload image
//             </span>
//             <span className="text-muted-foreground mt-2">
//               File size should be under 10 MB
//             </span>
//           </Label>
//         ) : imageLoadingState ? (
//           <Skeleton className="w-[50%] text-slate-800 mx-auto flex items-center justify-center h-10 bg-transparent">
//             Uploading...
//           </Skeleton>
//         ) : (
//           <div className="flex items-center justify-between py-[4.6px]">
//             <div className="flex items-center">
//               <FileIcon className="w-8 text-slate-800 text-primary mr-2 h-8" />
//             </div>
//             <p className="text-sm text-slate-800 font-medium">
//               {imageFile.name}
//             </p>
//             <div
//               className="hover:bg-white !bg-none border-none"
//               onClick={handleRemoveImage}
//             >
//               <XIcon className="text-black hover:w-7 h-7" />
//               <span className="sr-only">Remove File</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RideImageUpload;
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import config from "@/store/config";

function RideImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const [imageError, setImageError] = useState(null); // For error messages
  const { toast } = useToast();
  console.log(isEditMode, "isEditMode");
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) {
      if (selectedFile.size > MAX_SIZE) {
        setImageError("File size exceeds 10MB limit");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "File size exceeds 10MB limit",
        });

        setImageFile(null);
        return;
      } else {
        setImageError(null);
        setImageFile(selectedFile);
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const response = await axios.post(
        `${config.API_URL}/admin/Rides/upload-image`,
        data
      );

      if (response?.data?.success) {
        toast({
          title: "Image Uploaded Successfully",
        });
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      toast({
        title: "Error Uploading Image",
        description: error.message,
      });
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg text-slate-800 font-semibold mb-2 block">
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed border-muted-foreground rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-muted-foreground">
              Drag & drop or click to upload image
            </span>
            <span className="text-muted-foreground mt-2">
              File size should be of under 10 MB
            </span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="w-[50%] text-slate-800 mx-auto flex items-center justify-center h-10 bg-transparent">
            Uploading...
          </Skeleton>
        ) : (
          <div className="flex items-center justify-between py-[4.6px]">
            <div className="flex items-center">
              <FileIcon className="w-8 text-slate-800 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm text-slate-800 font-medium">
              {imageFile.name}
            </p>
            <div
              className="hover:bg-white !bg-none border-none"
              onClick={handleRemoveImage}
            >
              <XIcon className="text-black  hover:w-7 h-7" />
              <span className="sr-only">Remove File</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RideImageUpload;
