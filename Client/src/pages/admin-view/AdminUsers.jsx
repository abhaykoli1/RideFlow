import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { UsersList } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  // }, [dispatch]);

  return <div>Users</div>;
};

export default AdminUsers;
