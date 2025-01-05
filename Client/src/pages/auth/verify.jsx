import { verifyEmail } from "@/store/auth-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams(); // Get the token from the URL
  const dispatch = useDispatch(); // Dispatch actions to Redux
  const navigate = useNavigate(); // Navigate to other routes
  const { isLoading, success, error } = useSelector((state) => state.auth); // Get state from Redux

  if (token) {
    dispatch(verifyEmail(token)); // Dispatch the verifyEmail thunk
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
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
    </div>
  );
};

export default VerifyEmail;
