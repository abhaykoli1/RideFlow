import { Map, MapPinCheck } from "lucide-react";
import React from "react";

const RentalLocation = () => {
  return (
    <div className="flex-col gap-3 flex w-full ">
      <div className=" Rounded p-3   rounded-md bg-gradient-to- car from-[#eafffd]  to-white ">
        <span className="font-semibold mb-2 flex items-end gap-2 text-md ">
          <MapPinCheck color="tomato" /> Pick-Up Location
        </span>
        <p>Chandpol Location</p>
      </div>
      <iframe
        className=" w-full h-[40vh] Border rounded-md shadow-lg"
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441864.7609061763!2d73.9077571317999!3d26.92538802533424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cfc83d73f3a53%3A0x7f2b248d2b1284b8!2sChandpol%2C%20Jaipur%2C%20Rajasthan%20400200%2C%20India!5e0!3m2!1sen!2sus!4v1634035243653!5m2!1sen!2sus"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default RentalLocation;
