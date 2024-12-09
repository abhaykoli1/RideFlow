import { Map, MapPinCheck } from "lucide-react";
import React from "react";

const RentalLocation = () => {
  return (
    <div className="flex-col flex w-full ">
      <div className=" Rounded py-3   rounded-md bg-gradient-to- car from-[#eafffd]  to-white ">
        <span className="font-semibold mb-2 flex items-end gap-2 text-md ">
          <MapPinCheck color="tomato" /> Pick-Up Location
        </span>
        <p className="mt-2 pl-3">
          <strong>Sindhi Camp metro station</strong>
          <p>Civil Lines Metro Station, Elevated Ajmer Rd,</p>
          Kanti Nagar, Sindhi Camp, Jaipur, Rajasthan 302006
        </p>
      </div>

      <iframe
        className="w-full h-[60vh] border rounded-md shadow-lg"
        title="map"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCnB8fjIxUxle9dEmChHrcY0wnatLC5B8s&q=Sindicamp+Metro+Station,+Jaipur,+Rajasthan&zoom=16"
        allowFullScreen
        loading="fast"
      />
    </div>
  );
};

export default RentalLocation;
