import React from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { googleAuth } from "@/store/auth-slice";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleGoogleLogin = async (response) => {
    try {
      // Send response.credential (the id_token) to the backend
      const googleResponse = await dispatch(googleAuth(response.credential));
      if (googleResponse?.payload?.success) {
        toast({
          title: googleResponse?.payload?.message,
        });
        // Reload the page after successful login
        window.location.reload();
      } else {
        toast({
          title: googleResponse?.payload?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Google login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center mb-5 w-full ">
      {/* <button onClick={Login}>Sign in with Google</button> */}
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        text="continue_with"
        theme="outline "
        width="100%"
        containerProps={{
          style: {
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
        }}
        onError={(error) => {
          console.error(error);
          toast({
            title: "Google login failed",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
