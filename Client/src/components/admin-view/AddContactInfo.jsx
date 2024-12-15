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
    <Fragment className="w-full ">
      <div className="mt-20 mb-6 w-full flex justify-between items-center">
        <h1 className="text-3xl text-slate-800 font-bold ">
          Add Contact Info{" "}
        </h1>

        {ContactInfo.length > 0 ? (
          <Button
            className="bg-slate-800 text-white"
            onClick={() => {
              setCurrentEditedId("675ddaf9fd8852060da37b22");
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

      {ContactInfo && ContactInfo.length > 0
        ? ContactInfo.map((content, index) => (
            <div className=" text-lg text-slate-800">
              <p>
                <strong>Id :</strong>
                {content._id}
              </p>
              <p>
                <strong>Email : </strong>
                {content.email}
              </p>
              <p>
                <strong>Phone : </strong>
                {content.phone}
              </p>
              <p>
                <strong>Instagram Link : </strong>
                {content.instagram}
              </p>
              <p>
                <strong>Whatsapp Link : </strong>
                {content.whatsapp}
              </p>
              <p>
                <strong>Location : </strong>
                {content.address}
              </p>
            </div>
          ))
        : null}
    </Fragment>
  );
};

export default AddContactInfo;
