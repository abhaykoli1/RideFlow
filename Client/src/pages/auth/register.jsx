import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/store/auth-slice";
import { MyContext } from "@/components/common/Helper/context";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          description:
            "Registration successfull! Please check your email to verify your account.",
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);
  const { auth } = useContext(MyContext);

  return (
    <div className={`mx-auto w-full max-w-md space-y-6 duration-500 `}>
      <AuthContainerPageElements
        HaveAccount={"Already have an Account? "}
        Auth={"SIGN UP"}
        GoToAuth={"Log In"}
        Google={false}
        To={"/auth/login"}
      />
      <CommonForm
        inputCss={"!border-l-0 !border-t-0 !border-r-0 mb-4 "}
        buttonCss={"Button bg-transparent AuthButton !mt-3"}
        lableCss={"hidden"}
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
