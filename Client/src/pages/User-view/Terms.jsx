import { fetchContactInfo } from "@/store/common/dashboard-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TermsAndConditions = () => {
  const { ContactInfo, isLoading } = useSelector((state) => state.dasboard);
  const dispatch = useDispatch();
  useState(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  return (
    <div className="ListingBg">
      <div className="container px-5 text-xl mx-auto py-8 lg:pt-28 md:pt-24 pt-20">
        <div className="titleHolder">
          <h1 className=" font-bold text-center mb-6 text-yellow">
            Terms and Conditions
          </h1>
        </div>
        <p className="mb-6">
          By using <span className="font-semibold text-yellow">RideFlow</span>,
          you agree to these Terms and Conditions. Please read them carefully.
        </p>
        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          1. Eligibility
        </h6>
        <p className="mb-6">
          You must be 18+ with a valid driver’s license to rent a bike.
        </p>
        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          2. Rental Responsibilities
        </h6>
        <p className="mb-6">
          Use bikes responsibly, follow traffic laws, and return them in good
          condition. You are liable for damages, loss, or theft during the
          rental period.
        </p>
        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          3. Payments and Refunds
        </h6>
        <p className="mb-6">
          All rentals must be paid upfront. Cancellation and refund policies
          apply as per the booking terms.
        </p>
        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          4. Prohibited Use
        </h6>
        <p className="mb-6">
          Do not use bikes for illegal activities, sublease them, or operate
          under the influence of drugs/alcohol.
        </p>
        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          5. Liability
        </h6>
        <p className="mb-6">
          RideFlow is not responsible for injuries, damages, or losses during
          rentals. You assume full responsibility.
        </p>
        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          6. Changes and Contact
        </h6>
        <p className="mb-6">
          We may update these terms periodically. For questions, contact us at:
        </p>
        {ContactInfo && ContactInfo.length > 0
          ? ContactInfo.map((content, index) => (
              <ul key={index} className="list-disc  ">
                <li className="flex gap-2">
                  <strong>Email: </strong> {content.email}
                </li>
                <li className="flex gap-2">
                  <strong>Phone: </strong>+91 {content.phone}
                </li>
              </ul>
            ))
          : null}
        <li className="flex gap-2 mb-2">
          <strong>Address: </strong>
        </li>
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex gap-3">
            <p>
              <strong>1. </strong>
            </p>
            <p>
              Sindhi Camp Bus Stand, Entry Gate 1, Kanti Nagar, Sindhi Camp,
              Jaipur, Rajasthan 302016
            </p>
          </div>
          <div className="flex gap-3">
            <p>
              <strong>2. </strong>
            </p>
            <p>
              Ganpati Plaza, Mirza Ismail Road Near Gulab Ji chai Wale,Sindhi
              Camp,Jaipur,Raj
            </p>
          </div>
          <div className="flex gap-3">
            <p>
              <strong>3. </strong>
            </p>
            <p>
              Gate No. 2 Pillar No. 155, Metro Parking, Jaipur Railway Station,
              opposite Car Maker Work-Shop, Gopalbari, Jaipur, Rajasthan 302007
            </p>
          </div>
        </div>
        <p className="text-center font-semibold">
          Thank you for choosing RideFlow!
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
