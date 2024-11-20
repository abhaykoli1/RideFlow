import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedGif from "@/components/animatedGif";
import CommonForm from "@/components/common/form";
import { ContactFormElements } from "@/config";
import { WhatsApp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addContactQuery } from "@/store/user/contact-slice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  comment: "",
};

function ReachUs() {
  const ContactDetails = [
    {
      description:
        "Location: Ride Flow 560/1, Boomi Plaza, 4th and 5th Floor 4th Cross, CMH Road",
      icon: <MapPin />,
    },
    {
      description: "Call : +91 9887434494",
      icon: <Phone />,
    },
    {
      description: " Chat : Chat now Get QR Code",
      icon: <WhatsApp />,
    },
    {
      description: " Mail : RideFlow@Outlook.com",
      icon: <Mail />,
    },
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const isAnyFieldFilled = Object.values(formData).some(
      (value) => value !== ""
    );
    setIsButtonDisabled(isAnyFieldFilled);
  }, [formData]);

  function onSubmit(event) {
    event.preventDefault();

    dispatch(addContactQuery(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Your Query Submitted" });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
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
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container pb-12 mx-auto z-10 pt-10"
      >
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-col gap-5 w-100"
          >
            {ContactDetails.map((details, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }} // Reset animation when out of view
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-sm flex gap-3 pb-3 items-start"
              >
                <span className="h-5 mb-2">{details.icon}</span>
                <span className="mt-1">{details.description}</span>
              </motion.div>
            ))}
            <motion.iframe
              className="w-full h-52 Border rounded-md shadow-lg"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441864.7609061763!2d73.9077571317999!3d26.92538802533424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cfc83d73f3a53%3A0x7f2b248d2b1284b8!2sChandpol%2C%20Jaipur%2C%20Rajasthan%20400200%2C%20India!5e0!3m2!1sen!2sus!4v1634035243653!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                isBtnDisabled={!isButtonDisabled}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default ReachUs;
