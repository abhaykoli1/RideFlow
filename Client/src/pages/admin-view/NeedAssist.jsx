import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  fetchAllContactQuery,
} from "@/store/user/contact-slice"; // For contacts
import { Delete, Trash } from "lucide-react";

const ContactList = () => {
  const dispatch = useDispatch();

  // Select contact state
  const {
    contacts,
    isLoading: contactLoading,
    error: contactError,
  } = useSelector((state) => state.userContact);

  const handleDelete = (id) => {
    dispatch(deleteContact(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllContactQuery());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllContactQuery());
  }, [dispatch]);

  return (
    <div className="p-6 text-slate-800">
      <h1 className="text-3xl font-bold mb-6">Contact Queries</h1>

      {/* Contacts Section */}
      <div className="mb-8">
        {contactLoading ? (
          <p>Loading contacts...</p>
        ) : contactError ? (
          <p className="text-red-500">Error: {contactError}</p>
        ) : contacts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">S.No.</th>
                <th className="py-2 text-left">Name</th>
                <th className="py-2  text-left">Email</th>
                <th className="py-2  text-left">Phone</th>
                <th className="py-2 px-2 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  className="border-t hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-2 px-4">
                    {" "}
                    <span
                      className="flex gap-3 items-center"
                      onClick={() => handleDelete(contact._id)}
                    >
                      <Trash size={18} className="cursor-pointer" />
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-2 min-w-[140px]  w-ful">{contact.name}</td>
                  <td className="py-2 min-w-[230px] w-ful">{contact.email}</td>
                  <td className="py-2 min-w-[110px] w-ful ">{contact.phone}</td>
                  <td className="py-2 min-w-[300px] px-2 w-ful ">
                    {contact.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contact queries found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
