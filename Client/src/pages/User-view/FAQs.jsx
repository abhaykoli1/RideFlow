import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
const faqs = [
  {
    question: "What types of bikes do you offer?",
    answer:
      "We offer a variety of bikes including mountain bikes, road bikes, and hybrid bikes to suit your riding preferences.",
  },
  {
    question: "How do I rent a bike?",
    answer:
      "You can rent a bike by selecting your desired bike on our website, choosing the rental period, and completing the booking form.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your reservation up to 24 hours before your rental period begins for a full refund.",
  },
  {
    question: "Do you provide helmets and locks?",
    answer: "Yes, we provide free helmets and locks with every bike rental.",
  },
  {
    question: "What should I do if I have a problem with my bike?",
    answer:
      "If you encounter any issues, please contact our support team immediately for assistance.",
  },
  {
    question: "Are there any age restrictions for renting a bike?",
    answer:
      "Yes, you must be at least 18 years old to rent a bike. Minors can rent with a parent's consent.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support via the contact form on our website or by calling our support number.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-100 h-full overflow-y-auto bg- flex flex-col justify-between pt-16">
      <div className="container mx-auto h-full p-6">
      <div className="titleHolder">
        <h1 className="text-3xl font-bold text-tomato">
          Frequently Asked Questions
        </h1>
        <h6 className="subtitle text-gray-300 mb-5">
          Find answers to the most common questions about our bike rental
          service. If you need more help, feel free to{" "}
          <span
            className="underline text-yellow cursor-pointer"
            onClick={() => {
              navigate("/ride/Reach-Us");
            }}
          >
            contact us!
          </span>
        </h6>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="mt-1 h-20 text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[17px] pt-3 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
