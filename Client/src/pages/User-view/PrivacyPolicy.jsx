import { fetchContactInfo } from "@/store/common/dashboard-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const { ContactInfo, isLoading } = useSelector((state) => state.dasboard);
  const dispatch = useDispatch();
  useState(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  return (
    <div className=" ListingBg ">
      <div className="container px-5 text-xl mx-auto py-8 lg:pt-28 md:pt-24 pt-20   ">
        <div className="titleHolder">
          <h1 className=" font-bold text-center mb-6 text-yellow">
            Privacy Policy
          </h1>
        </div>

        <p className="mb-6">
          Welcome to <span className="font-semibold">RideFlow</span>. Your
          privacy is critically important to us. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you
          visit our website or use our services.
        </p>
        <p className="mb-6">
          By accessing or using our services, you agree to the practices
          described in this Privacy Policy.
        </p>

        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c972]">
          1. Information We Collect
        </h6>
        <p className="mb-4">We collect the following types of information:</p>
        <h3 className="text-xl font-medium mb-2">a. Personal Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Address</li>
          <li>Driver’s License No.</li>
        </ul>
        <h3 className="text-xl font-medium mb-2">b. Payment Information</h3>
        <p className="mb-4">
          When you rent a bike, we collect payment information through secure
          third-party payment processors.
        </p>
        <h3 className="text-xl font-medium mb-2">c. Usage Information</h3>
        <p className="mb-4">We may collect information about:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Your interactions with the website (e.g., pages visited, time
            spent).
          </li>
          <li>
            Device details (e.g., browser type, IP address, operating system).
          </li>
        </ul>
        <h3 className="text-xl font-medium mb-2">d. Location Information</h3>
        <p className="mb-6">
          With your permission, we may collect your location to provide services
          like bike delivery or nearby rental availability.
        </p>

        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          2. How We Use Your Information
        </h6>
        <p className="mb-6">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>To provide, operate, and maintain our services.</li>
          <li>To verify your identity and eligibility to rent bikes.</li>
          <li>To process payments and prevent fraud.</li>
          <li>
            To communicate with you (e.g., updates, confirmations, or marketing
            emails).
          </li>
          <li>To improve our website and services.</li>
          <li>To comply with legal requirements.</li>
        </ul>

        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          3. Sharing Your Information
        </h6>
        <p className="mb-6">We may share your information with:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Service Providers:</strong> Third parties who assist in
            providing our services, such as payment processors or delivery
            services.
          </li>
          <li>
            <strong>Law Enforcement or Regulatory Authorities:</strong> If
            required by law or to protect our rights.
          </li>
          <li>
            <strong>Business Partners:</strong> For promotions or joint
            services, but only with your consent.
          </li>
        </ul>
        <p className="mb-6">
          We do not sell or rent your personal information to third parties.
        </p>

        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          4. Data Security
        </h6>
        <p className="mb-6">
          We use industry-standard encryption and secure storage to protect your
          data. While we strive to protect your information, no method of
          transmission over the Internet is 100% secure.
        </p>

        {/* <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          5. Your Rights
        </h6>
        <p className="mb-6">
          Depending on your location, you may have the following rights:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Access and Update:</strong> You can request access to the
            personal information we have about you.
          </li>
          <li>
            <strong>Delete:</strong> Request that we delete your data (subject
            to legal and contractual obligations).
          </li>
          <li>
            <strong>Opt-out:</strong> Unsubscribe from marketing communications.
          </li>
        </ul> */}
        {ContactInfo && ContactInfo.length > 0
          ? ContactInfo.map((content, index) => (
              <p className="mb-6">
                To exercise your rights, contact us at{" "}
                <strong className="underline text-yellow">
                  {content.email}.
                </strong>
              </p>
            ))
          : null}

        <h6 className="text-2xl font-semibold mt-8 mb-4 text-[#f4c76d]">
          5. Contact Us
        </h6>
        <p className="mb-6">
          If you have any questions or concerns about this Privacy Policy,
          please contact us:
        </p>

        {ContactInfo && ContactInfo.length > 0
          ? ContactInfo.map((content, index) => (
              <ul key={index} className="list-disc pl-4 mb-6">
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
          Thank you for trusting RideFlow with your information.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
