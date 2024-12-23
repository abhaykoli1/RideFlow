import { verifyEmail } from "@/store/auth-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    }
  }, [success, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && <p className="text-blue-500">Verifying your email...</p>}
      {success && (
        <p className="text-green-500">
          Email verified successfully! Redirecting...
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
