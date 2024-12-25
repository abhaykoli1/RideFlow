import { verifyEmail } from "@/store/auth-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams(); // Get the token from the URL
  const dispatch = useDispatch(); // Dispatch actions to Redux
  const navigate = useNavigate(); // Navigate to other routes
  const { isLoading, success, error } = useSelector((state) => state.auth); // Get state from Redux

  // useEffect(() => {
  if (token) {
    dispatch(verifyEmail(token)); // Dispatch the verifyEmail thunk
  }
  // }, [dispatch, token]);

  useEffect(() => {
    if (success) {
      // Redirect to login after 3 seconds
      const timer = setTimeout(() => navigate("/ride/home"), 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [success, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading && <p className="text-blue-500">Verifying your email...</p>}
      {success && (
        <p className="text-green-500">
          Email verified successfully! Redirecting...
        </p>
      )}
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </div>
  );
};

export default VerifyEmail;




// import { verifyEmail } from "@/store/auth-slice";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";

// const VerifyEmail = () => {
//   const { token } = useParams(); // Get the token from the URL
//   const dispatch = useDispatch(); // Dispatch actions to Redux
//   const navigate = useNavigate(); // Navigate to other routes
//   const { isLoading, success, error } = useSelector((state) => state.auth); // Get state from Redux
//   const [hasAttempted, setHasAttempted] = useState(false); // Track whether verification was attempted

//   useEffect(() => {
//     if (token && !hasAttempted) {
//       dispatch(verifyEmail(token));
//       setHasAttempted(true);
//     }
//   }, [dispatch, token, hasAttempted]);

//   useEffect(() => {
//     if (success) {
//       // Redirect to login after 3 seconds
//       const timer = setTimeout(() => navigate("/ride/home"), 3000);
//       return () => clearTimeout(timer); // Cleanup timer on component unmount
//     }
//   }, [success, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       {isLoading && <p className="text-blue-500">Verifying your email...</p>}
//       {success && (
//         <p className="text-green-500">
//           Email verified successfully! Redirecting...
//         </p>
//       )}
//       {/* {error && <p className="text-red-500">{error}</p>} */}
//     </div>
//   );
// };

// export default VerifyEmail;