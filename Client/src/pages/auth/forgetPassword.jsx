import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { forgotPassword } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading, success } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!email) {
      isValid = false;
      newErrors.vEmail = "Email is required.";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      isValid = false;
      newErrors.validEmail = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(forgotPassword(email)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Password reset email sent!",
            description: "Please check your inbox...",
          });
        } else {
          if (
            data?.payload?.message ===
            "This account is linked with Google. Please log in using Google authentication."
          ) {
            setTimeout(() => {
              navigate("/auth/login");
            }, [2000]);
          }
          toast({
            title: data?.payload?.message,
            description: "Please try again Later...",
            variant: "destructive",
          });
        }
      });
    } else {
      toast({
        title: "Please enter a valid email address!",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="mx-auto w-full max-w-md duration-500 bg-white text-slate-800">
      <div className="p-6  w-full">
        <AuthContainerPageElements
          HaveAccount={"Back to"}
          GoToAuth={"Log In"}
          Google={true}
          To={"/auth/login"}
          Auth={"FORGET PASSWORD"}
        />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                validateForm();
                setEmail(e.target.value);
              }}
              className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0  ${
                errors.validEmail
                  ? "!border-b-red-500"
                  : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                      email
                    )
                  ? "!border-b-green-500"
                  : "!border-b-gray-300"
              } mb-2 placeholder:!PlaceHolderText`}
              required
              placeholder="Enter your email"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-slate-800 text-white !font-bold !mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
