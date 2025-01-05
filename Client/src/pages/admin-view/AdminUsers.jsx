import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "@/store/config";
import { useSelector } from "react-redux";
import { Trash } from "lucide-react";
import logo from "../../assets/logo/rideFlowSmallYellowDark.png";

const AdminUsers = () => {
  const { user } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${config.API_URL}/users/getList`, {});
        setUsers(response.data.users);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch users. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const saveRole = async (userId, role) => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const response = await axios.put(`${config.API_URL}/users/updateRole`, {
        userId,
        role,
      });
      setSuccess(response.data.message || "User role updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update user role. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  const handleDelete = async (id) => {
    setLoading(true);
    setSuccess("");
    setError("");
    console.log(id);
    try {
      const response = await axios.delete(
        `${config.API_URL}/users/delete/${id}`
      );
      setSuccess(response.data.message || "User deleted successfully.");
      const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get(`${config.API_URL}/users/getList`);
          setUsers(response.data.users);
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch users. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-slate-800">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500 font-semibold">{success}</p>}
      {users.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left ">S.No</th>
              <th className="py-2 px-4 text-left min-w-52">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice()
              .sort((a, b) => a.role.localeCompare(b.role))
              .map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-2 px-4 relative">
                    <div
                      className={` ${
                        user?.email === "rideflowrental@gmail.com"
                          ? "flex"
                          : "hidden"
                      } h-full w-full  absolute top-0 left-0`}
                    ></div>{" "}
                    <span
                      className={` flex gap-3 items-center`}
                      disabled={
                        user?.email === "rideflowrental@gmail.com"
                          ? true
                          : false
                      }
                      onClick={() => handleDelete(user?._id)}
                    >
                      {user?.email === "rideflowrental@gmail.com" ? (
                        <div>
                          <img
                            src={logo}
                            alt="ride Flow logo"
                            className="h-5"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <Trash
                        size={18}
                        className={`${
                          user?.email === "rideflowrental@gmail.com"
                            ? "hidden"
                            : ""
                        } cursor-pointer`}
                      />
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {user.userName.replace(/(_\d+)$/, "")}
                  </td>
                  {/* <td className="py-2 px-4">{user.phone}</td> */}
                  {/* <td className="py-2 px-4">{user.dl}</td> */}
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <select
                      disabled={
                        user?.email === "rideflowrental@gmail.com"
                          ? true
                          : false
                      }
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border cursor-pointer border-gray-300 bg-white rounded px-2 py-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      disabled={
                        user?.email === "rideflowrental@gmail.com"
                          ? true
                          : false
                      }
                      onClick={() => saveRole(user?._id, user?.role)}
                      className="bg-slate-800 text-white px-4 py-[3px] rounded hover:bg-black hover:scale-95 transition"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
