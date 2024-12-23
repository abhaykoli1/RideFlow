import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email is required!");
      return;
    }
    dispatch(forgotPassword(email));
  };

  return (
    <section className="mx-auto w-full max-w-md duration-500">
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
              onChange={(e) => setEmail(e.target.value)}
              className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0  ${
                error.email
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
            className="w-full invertBg !font-bold !mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          {/* {error && <p className="mt-4 text-red-600 text-sm">{error}</p>} */}
        </form>
        {/* {successMessage && (
          <p className="mt-4 text-green-600 text-sm">{successMessage}</p>
        )}*/}
      </div>
    </section>
  );
};

export default ForgotPassword;
