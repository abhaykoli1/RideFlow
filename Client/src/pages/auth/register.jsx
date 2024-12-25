import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, verifyEmail } from "@/store/auth-slice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState(Array(6).fill(""));

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      sessionStorage.setItem("sessionEmail", value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear errors on input
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate userName
    if (!formData.userName.trim()) {
      isValid = false;
      newErrors.userName = "Full name is required.";
    }

    // Validate email
    if (!formData.email) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      isValid = false;
      newErrors.email = "Invalid email address.";
    }

    // Validate password
    if (!formData.password) {
      isValid = false;
      newErrors.password = "Password is required.";
    } else if (formData.password.length <= 6) {
      isValid = false;
      newErrors.password = "Password must be more than 6 characters.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    if (validateRegisterForm()) {
      dispatch(registerUser(formData)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Registration successful!",
            description: data?.payload?.message,
          });
        } else {
          toast({
            title: "Registration failed.",
            description: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }
  };

  const handleVerifyInputChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input if not last
      if (value !== "" && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const [otpError, setOtpError] = useState(""); // State for OTP error

  const validateVerificationCode = () => {
    const codeString = code.join(""); // Combine digits into a single string
    if (codeString.length !== 6) {
      setOtpError("This field is required. Please enter all 6 digits.");
      return false;
    }
    setOtpError(""); // Clear error if valid
    return true;
  };

  const onVerifySubmit = (event) => {
    event.preventDefault();
    const email = sessionStorage.getItem("sessionEmail");

    if (validateVerificationCode()) {
      dispatch(verifyEmail({ email: email, code: code.join("") })).then(
        (data) => {
          if (data?.payload?.success) {
            toast({
              title: "Verified",
              description: "Email verified successfully.",
            });
          } else {
            toast({
              title: "Verification Failed",
              description: data?.payload?.message || "Invalid code.",
              variant: "destructive",
            });
          }
        }
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <AuthContainerPageElements
        HaveAccount={"Already have an Account? "}
        Auth={"REGISTER"}
        GoToAuth={"Log In"}
        To={"/auth/login"}
      />

      {/* Registration Form */}
      <form onSubmit={onRegisterSubmit}>
        <div>
          <Input
            type="text"
            id="userName"
            name="userName"
            placeholder="Full Name"
            value={formData.userName}
            onChange={handleInputChange}
            className={`!border-b-2 !border-l-0 mb-2 !border-t-0 !border-r-0  ${
              errors.userName
                ? "!border-red-500"
                : formData.userName
                ? "!border-green-500"
                : "!border-gray-300"
            }`}
            required
          />
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className={`!border-b-2 mb-2 !border-l-0 !border-t-0 !border-r-0  ${
              errors.email
                ? "!border-red-500"
                : formData.email &&
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                    formData.email
                  )
                ? "!border-green-500"
                : "!border-gray-300"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        {/* <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`!border-b-2 mb-2 !border-l-0 !border-t-0 !border-r-0  ${
              errors.password
                ? "!border-red-500"
                : formData.password.length > 6
                ? "!border-green-500"
                : "!border-gray-300"
            }`}
            required
          />
          <div className="absolute top-0 right-3">
            {showPassword ? (
              <EyeOff
                onClick={togglePasswordVisibility}
                className="text-gray-500 cursor-pointer"
              />
            ) : (
              <Eye
                onClick={togglePasswordVisibility}
                className="text-gray-500 cursor-pointer"
              />
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div> */}

        {/* //// */}

        <div className="mb-4 relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0 ${
              errors.password
                ? "!border-red-500"
                : formData.password.length > 6
                ? "!border-green-500"
                : "!border-gray-300"
            } placeholder:!PlaceHolderText`}
            required
          />
          {formData.password && (
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button className="w-full invertBg !font-bold mt-3" type="submit">
          Register
        </Button>
      </form>

      {/* //       
//       <form onSubmit={onVerifySubmit}>
//         <div>
//           <div
//             htmlFor="otp"
//             className="font-bold  text-[18px] text-center  w-full"
//           >
//             Verification Code
//           </div>
//           <div className="flex items-cente justify-center gap-2 mt-4">
//             {code.map((value, index) => (
//               <Input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength="1"
//                 value={value}
//                 onChange={(e) => handleVerifyInputChange(e.target.value, index)}
//                 onKeyUp={(e) => handleKeyUp(e, index)}
//                 className="w-10 h-10 text-center border rounded-md text-lg focus:!border-yellow  focus:outline-no "
//               />
//             ))}
//           </div>
//           {otpError && (
//             <p className="text-red-500 text-center text-sm mt-2">{otpError}</p>
//           )}
//         </div>
//         <Button className="w-full invertBg !font-bold mt-3" type="submit">
//           Verify
//         </Button>
//       </form> */}
    </div>
  );
}

export default AuthRegister;
