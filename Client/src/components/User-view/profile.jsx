// import { fetchProfile, updateUserProfile } from "@/store/common/profile-slice";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import { Separator } from "../ui/separator";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";

// const UserProfileContent = ({ userId }) => {
//   const dispatch = useDispatch();
//   const { profileData, isLoading, error } = useSelector(
//     (state) => state.profile
//   );

//   const { user } = useSelector((state) => state.auth);

//   // useEffect(() => {
//   //   dispatch(fetchProfile(user?.id));
//   // }, [dispatch, user?.id]);

//   // const [name, setName] = useState(""); // Local state for username

//   // const handleUpdateProfile = (e) => {
//   //   e.preventDefault();
//   //   const userId = profileData.data._id; // Use the logged-in user's ID or the relevant user ID
//   //   dispatch(updateUserProfile({ userId, name }));
//   // };

//   return (
//     <SheetContent className="overflow-auto !text-slate-800 bg-gradient-to-t from-[#ffeecc] to-white !max-w-[300px] BorderLef !border-none !bg-white px-3">
//       <SheetHeader className=" sticky top-0 flex justify-center  bg-white">
//         <SheetTitle className="text-start !text-[16px] my-4">
//           Profile
//         </SheetTitle>
//         <Separator />
//       </SheetHeader>
//       <div className="mt-4">
//         {isLoading && <p>Loading...</p>}
//         {error && <p>Error: {error}</p>}
//         {profileData && (
//           <form>
//             <Label>Name</Label>
//             <Input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Label>Phone</Label>
//             <Input type="text" value={"+91 9511564276"} disabled={true} />
//             <h1>{profileData.data.userName}</h1>
//             <p className="text-white">Email: {profileData.data.email}</p>
//             <Label>Email</Label>
//             <Input type="text" value={profileData.data.email} disabled={true} />
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? "Updating..." : "Update Profile"}
//             </button>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {user && <p>Profile updated: {user.userName}</p>}
//           </form>
//         )}
//       </div>
//       {/* <div>
//         <h2>Update Profile</h2>
//         <form onSubmit={handleUpdateProfile}>
//           <input
//             type="text"
//             placeholder="Enter new username"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Updating..." : "Update"}
//           </button>
//         </form>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {profileData && (
//           <p>Updated Username: {profileData.userName} Display updated name</p>
//         )}
//       </div> */}
//     </SheetContent>
//   );
// };

// export default UserProfileContent;
