import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="ListingBg">
      <div className="container text-xl mx-auto py-8 lg:pt-28 md:pt-24 pt-20">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow">
          Terms and Conditions
        </h1>
        <p className="text-lg mb-4">
          <strong>Effective Date:</strong> [Insert Date]
        </p>
        <p className="mb-6">
          By using <span className="font-semibold">RideFlow</span>, you agree to
          these Terms and Conditions. Please read them carefully.
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
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Email:</strong> [Insert Email]
          </li>
          <li>
            <strong>Phone:</strong> [Insert Phone Number]
          </li>
          <li>
            <strong>Address:</strong> [Insert Address]
          </li>
        </ul>
        <p className="text-center font-semibold">
          Thank you for choosing RideFlow!
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
