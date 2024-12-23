import AuthContainerPageElements from "@/components/authCompo/AuthContainerPageElements";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail } from "@/store/auth-slice";
import React, {  useState } from "react";
import { useDispatch } from "react-redux";

const OTP = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [code, setCode] = useState(Array(6).fill(""));

  const handleVerifyInputChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value; // Update specific index
      setCode(newCode);
      // Move to the next input if it's not the last one
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

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(paste)) {
      const pasteArray = paste.split("");
      setCode(pasteArray.concat(Array(6 - pasteArray.length).fill("")));
    }
  };

  const onVerifySubmit = (event) => {
    event.preventDefault();
    const email = sessionStorage.getItem("sessionEmail");
    const verificationCode = code.join(""); // Combine the 6 digits into a single string

    if (!email || verificationCode.length !== 6) {
      toast({
        title: "Invalid Input",
        description: "Please enter all 6 digits of the verification code.",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      verifyEmail({
        email: sessionStorage.getItem("sessionEmail"),
        code: verificationCode,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Email Verified",
          description: "Your email has been verified successfully.",
        });
        // navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message || "Verification Failed",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <section>
      <AuthContainerPageElements
        HaveAccount={""}
        Auth={""}
        GoToAuth={""}
        Google={false}
        To={"null"}
      />
      <Form onSubmit={onVerifySubmit}>
        <div className="w-full flex flex-col">
          <div
            htmlFor="otp"
            className="font-bold  text-[18px] text-center  w-full"
          >
            Verification Code
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {code.map((value, index) => (
              <Input
                key={index}
                type="text"
                id={`otp-${index}`}
                maxLength="1"
                value={value}
                onChange={(e) => handleVerifyInputChange(e.target.value, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                onPaste={handlePaste}
                className="w-10 h-10 text-center border rounded-md text-lg focus:!border-yellow  focus:outline-no "
                required
              />
            ))}
          </div>
          <p className="mt-7 text-sm text-center ">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>
        <Button
          type="submit"
          className="Button bg-transparent AuthButton !mt-3 w-full"
        >
          Verify
        </Button>
      </Form>
    </section>
  );
};

export default OTP;
