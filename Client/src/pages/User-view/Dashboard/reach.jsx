import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedGif from "@/components/animatedGif";
import CommonForm from "@/components/common/form";
import { ContactFormElements } from "@/config";
import { WhatsApp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addContactQuery } from "@/store/user/contact-slice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { fetchContactInfo } from "@/store/common/dashboard-slice";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  comment: "",
};

function ReachUs() {
  const { ContactInfo, isLoading } = useSelector((state) => state.dasboard);
  const [ContactDetails, setContactDetails] = useState([]);

  useEffect(() => {
    if (ContactInfo && ContactInfo.length > 0) {
      const { address, phone, whatsapp, email } = ContactInfo[0];

      setContactDetails([
        {
          description: address || "Address not available",
          icon: <MapPin />,
        },
        {
          description: `Call : +91 ${phone || "Phone not available"}`,
          icon: <Phone />,
        },
        {
          description: "Chat now on ",
          Link: `${whatsapp || ""}`,
          icon: <WhatsApp />,
        },
        {
          description: `Mail : ${email || "Email not available"}`,
          icon: <Mail />,
        },
      ]);
    }
  }, [ContactInfo]);

  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();
  const dispatch = useDispatch();
  useState(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  const isValidForm = () => {
    const { name, email, phone, comment } = formData;

    // Name Validation
    if (!name || name.trim() === "") return false;

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) return false;

    // Phone Validation (10 digits)
    const phonePattern = /\d{10}$/;
    if (!phone || !phonePattern.test(phone)) return false;

    // Comment Validation
    if (!comment || comment.trim() === "") return false;

    return true; // All fields are valid
  };

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addContactQuery(formData)).then((data) => {
      console.log(data);
      const success = data?.payload?.success;
      const message = data?.payload?.message;

      if (success) {
        toast({
          title: "Success!",
          description: message || "Your query was submitted successfully.",
        });
      } else if (!success || data.error) {
        const errorMessage =
          data?.payload?.message ||
          data?.error?.message ||
          "There was a problem.";

        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: errorMessage, // Use the server message
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  }

  return (
    <section
      id="reachUs"
      className="Contact-background flex h-full flex-col w-100 overflow-auto lg:px-6 md:px-5 sm:px-4 px-4 justify-between pt-7"
    >
      <p>email</p>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container pb-12 mx-auto z-10 "
      >
        <div className="titleHolder -mb-3 mt-5">
          <h1 className=" font-bold text-yellow ">Reach Us Out!</h1>
          {/* <h6 className="subtitle text-center mt-2">
            We are a passionate team dedicated to providing the best bike rental
            experience.
          </h6> */}
        </div>
        <motion.div className="mb-12 titleHolder">
          <h1 className="text-3xl font-bold mt-5 mb-2">
            <span className="text-tomato">Ready for Your Next Adventure? </span>
            Book Your Bike Today!
          </h1>
          <h6 className="lg:w-[80%] md:w-[80%] w-100 subtitle">
            Explore our diverse selection of two-wheelers available for rent.
            Choose flexible options by the hour, day, week, or month – and hit
            the road with ease!
          </h6>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-col gap-5 w-100"
          >
            {ContactDetails.map((details, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-sm flex gap-3 pb-3 items-start"
              >
                <span className="h-5 mb-2">{details.icon}</span>
                <span className="mt-1">{details.description}</span>
                <span className="mt-[5px] -ml-2">
                  {index === 2 ? (
                    <a id="WhasappText" href={details.Link}>
                      WhatsApp
                    </a>
                  ) : null}
                </span>
              </motion.div>
            ))}
            <motion.iframe
              className="w-full h-60 border rounded-md shadow-lg"
              title="map"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCnB8fjIxUxle9dEmChHrcY0wnatLC5B8s&q=Sindicamp+Metro+Station,+Jaipur,+Rajasthan&zoom=16"
              allowFullScreen
              loading="lazy"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="ContactForm Border p-3 rounded-md w-100 flex flex-col justify-end"
          >
            <h2 className="text-[#ffa500] font-bold text-[25px] mb-2 flex items-end">
              <AnimatedGif
                src={
                  "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522799/fspzicudavgpb5vbtb9t.gif"
                }
                className={"CallCenter h-14 rounded-l-lg"}
              />
              Need Assistance? We're Here to Help
            </h2>
            <div>
              <CommonForm
                buttonCss="lg:!w-[50%] ButtonTransparent bg-transparent"
                inputCss="mb-2 bg-transparent !border-t-0 !border-r-0 !border-l-0 placeholder:text-[#999] border-[#999]"
                textAreaCss="bg-transparent !border-t-0 !border-r-0 !border-l-0  placeholder:text-[#999] border-[#999]"
                hideLabel={"hidden"}
                formControls={ContactFormElements}
                buttonText={"Submit Query"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                To={"/auth/login"}
                isBtnDisabled={!isValidForm()}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default ReachUs;
