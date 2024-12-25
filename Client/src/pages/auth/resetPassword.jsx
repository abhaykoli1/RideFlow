import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/store/auth-slice";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, success } = useSelector((state) => state.auth);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!newPassword || newPassword.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (newPassword !== confirmPassword) {
      isValid = false;
      newErrors.passwordMatch = "Passwords do not match.";
    }
    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(resetPassword({ token, newPassword })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    } else if (newPassword.length < 7) {
      toast({
        title: "Password must be more than 6 characters!",
        variant: "destructive",
      });
    } else if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <section className="mx-auto w-full max-w-md duration-500">
      <div className="p-6 w-full">
        <AuthContainerPageElements
          HaveAccount={"Back to"}
          GoToAuth={"Log In"}
          Google={false}
          To={"/auth/login"}
          Auth={"RESET PASSWORD"}
        />
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0 ${
                errors.newPassword
                  ? "!border-red-500"
                  : newPassword.length > 6
                  ? "!border-green-500"
                  : "!border-gray-300"
              } mb-2 placeholder:!PlaceHolderText`}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validateForm();
              }}
              placeholder="Enter your new password"
              required
            />
            {newPassword && (
              <div className="absolute top-0 translate-y-[50%] right-3">
                {showPassword ? (
                  <EyeOff
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 h-[22px] w-[22px]"
                  />
                ) : (
                  <Eye
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 h-[22px] w-[22px]"
                  />
                )}
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateForm();
              }}
              placeholder="Confirm your new password"
              className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0 ${
                confirmPassword < 6
                  ? "!border-gray-300"
                  : confirmPassword !== newPassword
                  ? "!border-red-500"
                  : confirmPassword === newPassword
                  ? "!border-green-500"
                  : "!border-gray-300"
              } mb-2 placeholder:!PlaceHolderText`}
              required
            />
            {confirmPassword && (
              <div className="absolute top-0 translate-y-[50%] right-3">
                {showConfirmPassword ? (
                  <EyeOff
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-gray-500 h-[22px] w-[22px]"
                  />
                ) : (
                  <Eye
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-gray-500 h-[22px] w-[22px]"
                  />
                )}
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full invertBg !font-bold !mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        {success && (
          <p className="mt-4 text-green-600 text-sm">
            Password has been reset successfully. Redirecting to login...
          </p>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
