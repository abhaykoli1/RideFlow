// import React from "react";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/hooks/use-toast";
// import { googleAuth } from "@/store/auth-slice";
// import { GoogleLogin } from "@react-oauth/google";

// const GoogleLoginButton = () => {
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   const handleGoogleLogin = async (response) => {
//     try {
//       // Send response.credential (the id_token) to the backend
//       const googleResponse = await dispatch(googleAuth(response.credential));
//       if (googleResponse?.payload?.success) {
//         toast({
//           title: googleResponse?.payload?.message,
//         });
//         // Reload the page after successful login
//         window.location.reload();
//       } else {
//         toast({
//           title: googleResponse?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Google login failed",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleGoogleLogin}
//       text="continue_with"
//       theme="outline"
//       width="100%"
//       // containerProps={{
//       //   style: {
//       //     width: "100%",
//       //     height: "100%",
//       //     borderRadius: "8px",
//       //     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//       //     backgroundColor: "red",
//       //   },
//       // }}
//       onError={(error) => {
//         console.error(error);
//         toast({
//           title: "Google login failed",
//           variant: "destructive",
//         });
//       }}
//     />
//   );
// };

// export default GoogleLoginButton;

// import React from "react";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/hooks/use-toast";
// import { googleAuth } from "@/store/auth-slice";
// import { useGoogleLogin } from "@react-oauth/google";

// const GoogleLoginButton = () => {
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   // Initialize the Google login hook
//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         // Send the id_token to your backend via the Redux action
//         const googleResponse = await dispatch(googleAuth(response));
//         if (googleResponse?.payload?.success) {
//           toast({
//             title: googleResponse?.payload?.message,
//           });
//           // Reload the page after successful login
//           window.location.reload();
//         } else {
//           toast({
//             title: googleResponse?.payload?.message,
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         toast({
//           title: "Google login failed",
//           variant: "destructive",
//         });
//       }
//     },
//     onError: () => {
//       toast({
//         title: "Google login failed",
//         variant: "destructive",
//       });
//     },
//   });

//   return (
//     <button
//       onClick={() => login()}
//       className="!bg-white shadow-lg border border-gray-300 hover:scale-[99%] w-full justify-center text-black px-4 py-2 rounded-md gap-5  flex items-center space-x-2 hover:bg-gray-100 transition duration-200"
//     >
//       <svg
//         width="25"
//         height="28"
//         viewBox="0 0 256 262"
//         xmlns="http://www.w3.org/2000/svg"
//         preserveAspectRatio="xMidYMid"
//       >
//         <path
//           d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
//           fill="#4285F4"
//         />
//         <path
//           d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
//           fill="#34A853"
//         />
//         <path
//           d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
//           fill="#FBBC05"
//         />
//         <path
//           d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
//           fill="#EB4335"
//         />
//       </svg>
//       <span className="font-medium">Continue with Google</span>
//     </button>
//   );
// };

// export default GoogleLoginButton;

// import React from "react";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/hooks/use-toast";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import { googleLogin } from "@/store/auth-slice";

// const GoogleLoginButton = () => {
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   // Google login hook initialization
//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       console.log(response.access_token);
//       try {
//         // Dispatch the Redux action with the token
//         const result = await dispatch(googleLogin(response.access_token));

//         if (GoogleOAuthProvider.fulfilled.match(result)) {
//           toast({ title: result.payload.message || "Login successful" });
//           window.location.reload();
//         } else {
//           toast({
//             title: result.payload?.message || "Login failed",
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         console.log("Login Error:", error);
//         toast({
//           title: "Google login failed",
//           variant: "destructive",
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Google login failed",
//         variant: "destructive",
//       });
//     },
//   });

//   return (
//     <button
//       onClick={() => login()}
//       className="!bg-white shadow-lg border border-gray-300 hover:scale-[99%] w-full justify-center text-black px-4 py-2 rounded-md gap-5 flex items-center space-x-2 hover:bg-gray-100 transition duration-200"
//     >
//       <svg
//         width="25"
//         height="28"
//         viewBox="0 0 256 262"
//         xmlns="http://www.w3.org/2000/svg"
//         preserveAspectRatio="xMidYMid"
//       >
//         <path
//           d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
//           fill="#4285F4"
//         />
//         <path
//           d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
//           fill="#34A853"
//         />
//         <path
//           d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
//           fill="#FBBC05"
//         />
//         <path
//           d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
//           fill="#EB4335"
//         />
//       </svg>
//       <span className="font-medium">Continue with Google</span>
//     </button>
//   );
// };

// export default GoogleLoginButton;
/// --------------------------------------------------------
// import React from "react";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/hooks/use-toast";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import { googleLogin } from "@/store/auth-slice";

// const GoogleLoginButton = () => {
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   // Google login hook initialization
//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       const { access_token } = response; // Ensure this is the ID token, not access token
//       console.log("Google ID Token:", access_token); // Log the token for debugging purposes
//       try {
//         // Dispatch the Redux action with the ID token
//         const result = await dispatch(googleLogin(access_token));

//         if (result?.payload?.success) {
//           toast({ title: result.payload.message || "Login successful" });
//           window.location.reload(); // Reload to update the UI with the user info
//         } else {
//           toast({
//             title: result?.payload?.message || "Login failed",
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         console.log("Login Error:", error);
//         toast({
//           title: "Google login failed",
//           variant: "destructive",
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Google login failed",
//         variant: "destructive",
//       });
//     },
//   });

//   return (
//     <button
//       onClick={() => login()}
//       className="!bg-white shadow-lg border border-gray-300 hover:scale-[99%] w-full justify-center text-black px-4 py-2 rounded-md gap-5 flex items-center space-x-2 hover:bg-gray-100 transition duration-200"
//     >
//       <svg
//         width="25"
//         height="28"
//         viewBox="0 0 256 262"
//         xmlns="http://www.w3.org/2000/svg"
//         preserveAspectRatio="xMidYMid"
//       >
//         <path
//           d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
//           fill="#4285F4"
//         />
//         <path
//           d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
//           fill="#34A853"
//         />
//         <path
//           d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
//           fill="#FBBC05"
//         />
//         <path
//           d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
//           fill="#EB4335"
//         />
//       </svg>
//       <span className="font-medium">Continue with Google</span>
//     </button>
//   );
// };

// export default GoogleLoginButton;
//-------------------------------------------------------

import { useToast } from "@/hooks/use-toast";
import { googleLogin } from "@/store/auth-slice";
import config from "@/store/config";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: config.CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      {
        theme: "outline", // "outline" or "filled_blue"
        size: "large", // "small", "medium", "large"
        type: "standard", // "standard" or "icon"
        shape: "rectangular", // "rectangular", "pill", "circle", "square"
        text: "signin_with", // "signin_with" or "signup_with"
        logo_alignment: "left", // "left" or "center"
      }
    );
    window.google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    console.log("Access Token:", token);

    if (token) {
      dispatch(googleLogin(token)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    } else {
      console.log("failed");
    }
  };

  return (
    <div className="w-full items-center justify-center flex">
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default GoogleLoginButton;
