import { fetchProfile } from "@/store/common/profile-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = ({ userId }) => {
  const dispatch = useDispatch();
  const { profileData, isLoading, error } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  console.log(profileData);
  useEffect(() => {
    dispatch(fetchProfile(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="mt-20">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {profileData && (
        <div>
          <h1>{profileData.data.userName}</h1>
          <p className="text-white">Email: {profileData.data.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
