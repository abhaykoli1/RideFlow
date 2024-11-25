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

// import React from "react";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/hooks/use-toast";
// import { googleAuth } from "@/store/auth-slice";
// import { useGoogleLogin } from "@react-oauth/google";
// import { Google } from "@mui/icons-material";

// const GoogleLoginButton = () => {
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   const handleGoogleLoginSuccess = async (response) => {
//     try {
//       if (!response.code) {
//         throw new Error("Google login failed: No code received");
//       }

//       const googleResponse = await dispatch(
//         googleAuth({ code: response.code })
//       );
//       if (googleResponse?.payload?.success) {
//         toast({
//           title: googleResponse.payload.message,
//         });
//       } else {
//         toast({
//           title: googleResponse?.payload?.message || "Login failed",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Google login error:", error);
//       toast({
//         title: "Google login failed",
//         variant: "destructive",
//       });
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: handleGoogleLoginSuccess,
//     flow: "auth-code",
//   });

//   return (
//     <div className="flex justify-center mb-5 w-full">
//       <button
//         className="font-roboto gap-3 flex items-center justify-center Border w-full hover:border-white  text-[#e0d5d5] hover:text-white hover:scale-[99%] text-sm font-semibold  px-5 py-2 border-none rounded-md bg-transparent cursor-pointer"
//         onClick={googleLogin}
//       >
//         <Google />
//         Google Login
//       </button>

//       <style>
//         {`
//           @keyframes gradient-animation {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default GoogleLoginButton;

// style={{
//     fontFamily: "'Roboto', sans-serif",
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#fff",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "transparent",
//     backgroundSize: "200% 200%",
//     animation: "gradient-animation 5s ease infinite",
//     cursor: "pointer",
//   }}
