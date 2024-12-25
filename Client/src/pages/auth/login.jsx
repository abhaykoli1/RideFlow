import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import GoogleLoginButton from "@/components/authCompo/GoogleLogin";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { MyContext } from "@/components/common/Helper/context";
import { Eye, EyeOff } from "lucide-react";

function AuthLogin() {
  const { auth } = useContext(MyContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors as the user types
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      isValid = false;
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
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

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(formData)).then((data) => {
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
    } else {
      toast.error("Please fix the errors and try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility state
  };
  return (
    <section className="mx-auto w-full max-w-md duration-500">
      <AuthContainerPageElements
        HaveAccount={"Create a new Account?"}
        Auth={"LOG IN"}
        GoToAuth={"Register"}
        Google={true}
        To={"/auth/register"}
      />
      <GoogleLoginButton />

      <p className="subtitle text-center mt-7 mb-5">OR</p>

      <Form className="max-w-md mx-auto p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0  ${
              errors.email
                ? "!border-b-red-500"
                : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                    formData.email
                  )
                ? "!border-b-green-500"
                : "!border-b-gray-300"
            } mb-2 placeholder:!PlaceHolderText`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`!border-b-2 !border-l-0 !border-t-0 !border-r-0 ${
              errors.password
                ? "!border-red-500"
                : formData.password.length > 6
                ? "!border-green-500"
                : "!border-gray-300"
            } mb-2 placeholder:!PlaceHolderText`}
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
          <div className="w-full flex justify-end mt-3">
            <a
              href="/auth/forgot-password"
              className=" hover:underline text-sm hover:text-yellow "
            >
              Forget Password?
            </a>
          </div>
        </div>

        <Button
          onClick={onSubmit}
          type="submit"
          className="w-full invertBg !font-bold !mt-3"
        >
          LOGIN
        </Button>
      </Form>
    </section>
  );
}

export default AuthLogin;
