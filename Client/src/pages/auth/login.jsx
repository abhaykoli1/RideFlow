import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import GoogleLoginButton from "@/components/authCompo/GoogleLogin";
import CommonForm from "@/components/common/form";
import { MyContext } from "@/components/common/Helper/context";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const { auth } = useContext(MyContext);
  const [formData, setFormData] = useState(initialState);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

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
  }

  return (
    <div
      className={`mx-auto w-full max-w-md  
    duration-500 
   `}
    >
      <AuthContainerPageElements
        HaveAccount={"Create a new Account? "}
        Auth={"LOG IN"}
        GoToAuth={"Sign Up"}
        Google={true}
        To={"/auth/register"}
      />
      <GoogleLoginButton />

      <p className="subtitle text-center mt-7 mb-5">OR</p>
      <CommonForm
        inputCss={
          "!border-l-0 !border-t-0 !border-r-0 mb-2  placeholder: !PlaceHolderText"
        }
        buttonCss={" invertBg  !mt-3"}
        lableCss={"hidden"}
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
