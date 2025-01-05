import React from "react";
import { motion } from "framer-motion";
import Home from "../../../assets/Home.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WhyChooseUs = () => {
  const faqs = [
    {
      question: "Do you offer maintenance for your bikes?",
      answer:
        "Yes! All our bikes are regularly maintained and inspected to ensure your safety and comfort.",
    },
    {
      question: "Can I rent a bike for a full day?",
      answer:
        "Absolutely! We offer full-day rentals as well as hourly rates, giving you the flexibility to choose what suits you best.",
    },
    {
      question: "Can I cancel my reservation?",
      answer:
        "Yes, you can cancel your reservation up to 24 hours in advance for a full refund. Please refer to our cancellation policy for more details.",
    },
    {
      question: "What are the age requirements for renting a bike?",
      answer:
        "Renters must be at least 18 years old. However, minors can rent bikes if accompanied by an adult who takes responsibility for the rental.",
    },
  ];

  return (
    <section className="lg:py-12 md:py-10 sm:py-14 py-10 lg:px-6 md:px-5 sm:px-4 px-4">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }} // Repeats animation every time it enters viewport
        >
          <div className="flex flex-col justify-center">
            <div className="titleHolder">
              <motion.h1
                className="text-3xl font-bold text-tomato"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: false }}
              >
                Why Choose Us?
              </motion.h1>
              <motion.h6
                className="subtitle mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: false }}
              >
                Experience the best bike rental service in town with a wide
                range of high-quality bikes and exceptional customer support.
              </motion.h6>
            </div>
            <motion.img
              src={Home}
              alt="Bike Rental"
              className="rounded-lg w-full"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5 }}
                  viewport={{ once: true }}
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </motion.div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
