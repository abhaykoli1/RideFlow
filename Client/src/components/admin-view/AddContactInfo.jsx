import React, { Fragment, useState } from "react";
import { Label } from "../ui/label";
import CommonForm from "../common/form";
import { addContactDetails } from "@/config";

import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  addContactInfo,
  editContactInfo,
  fetchContactInfo,
} from "@/store/common/dashboard-slice";

const AddContactInfo = () => {
  const initialFormData = {
    phone: "",
    email: "",
    instagram: "",
    facebook: "",
    twitter: "",
    whatsapp: "",
    address: "",
  };

  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { ContactInfo, isLoading } = useSelector((state) => state.dasboard);
  const [OpenAddContactInfo, setOpenAddContactInfo] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editContactInfo({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchContactInfo());
            setFormData(initialFormData);
            setOpenAddContactInfo(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addContactInfo({
            ...formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchContactInfo());
            setOpenAddContactInfo(false);
            setFormData(initialFormData);
            toast({
              title: "Contact Info added successfully",
            });
          }
        });
  }

  useState(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  return (
    <Fragment className="w-full">
      <div className="mt-20 mb-6 w-full flex justify-between items-center">
        <h1 className="text-3xl text-slate-800 font-bold ">Add Contact Info</h1>
        {ContactInfo.length > 0 ? (
          <Button
            className="bg-slate-800 text-white"
            onClick={() => {
              setCurrentEditedId("6769b37095251b5b118ab301");
              setOpenAddContactInfo(true);
            }}
          >
            Edit
          </Button>
        ) : (
          <Button
            className="bg-slate-800 text-white"
            onClick={() => setOpenAddContactInfo(true)}
          >
            Add
          </Button>
        )}
      </div>
      <Sheet
        open={OpenAddContactInfo}
        onOpenChange={() => {
          setOpenAddContactInfo(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto !bg-white !text-slate-800"
        >
          <SheetHeader>
            <SheetTitle>Enter Your Contact Info</SheetTitle>
          </SheetHeader>

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonCss={"bg-slate-800 text-white"}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addContactDetails}
            />
          </div>
        </SheetContent>
      </Sheet>

      {!isLoading && ContactInfo && ContactInfo.length > 0 && (
        <table className="min-w-full bg-white border text-black border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left w-[150px]">Field</th>
              <th className="py-2 px-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {ContactInfo.map((content, index) => (
              <>
                <tr key={`${content._id}-email`} className="border-t">
                  <td className="py-2 px-4 font-bold">Email</td>
                  <td className="py-2 px-4">{content.email}</td>
                </tr>
                <tr key={`${content._id}-phone`} className="border-t">
                  <td className="py-2 px-4 font-bold">Phone</td>
                  <td className="py-2 px-4">{content.phone}</td>
                </tr>
                <tr key={`${content._id}-instagram`} className="border-t">
                  <td className="py-2 px-4 font-bold">Instagram Link</td>
                  <td className="py-2 px-4">{content.instagram}</td>
                </tr>
                <tr key={`${content._id}-instagram`} className="border-t">
                  <td className="py-2 px-4 font-bold">Facebook Link</td>
                  <td className="py-2 px-4">{content.facebook}</td>
                </tr>
                <tr key={`${content._id}-instagram`} className="border-t">
                  <td className="py-2 px-4 font-bold">Twitter Link</td>
                  <td className="py-2 px-4">{content.twitter}</td>
                </tr>
                <tr key={`${content._id}-whatsapp`} className="border-t">
                  <td className="py-2 px-4 font-bold">Whatsapp Link</td>
                  <td className="py-2 px-4">{content.whatsapp}</td>
                </tr>
                <tr key={`${content._id}-location`} className="border-t">
                  <td className="py-2 px-4 font-bold">Location</td>
                  <td className="py-2 px-4">{content.address}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default AddContactInfo;
