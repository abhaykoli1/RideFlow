import { fetchAllUsers } from "@/store/auth-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, isLoading, error } = useSelector((state) => state.auth);

  // useEffect(() => {
  // Fetch users only once when the component mounts
  console.log("Fetching users...");
  // dispatch(fetchAllUsers());
  // }, [dispatch]); // Only `dispatch` should be in the dependency array

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 text-slate-800">
      <h1 className="text-3xl text-slate-800 font-bold">Users List</h1>

      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && allUsers.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-100 transition duration-150"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.userName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && allUsers.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default AdminUsers;
