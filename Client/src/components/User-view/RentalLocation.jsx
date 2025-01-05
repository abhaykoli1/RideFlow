import { Map, MapPinCheck } from "lucide-react";
import React from "react";

const RentalLocation = () => {
  return (
    <div className="flex-col flex w-full ">
      <div className=" Rounded py-3   rounded-md bg-gradient-to- car from-[#eafffd]  to-white ">
        <span className="font-semibold mb-2 flex items-end gap-2 text-md ">
          <MapPinCheck color="tomato" /> Pick-Up Location
        </span>

        <div className="flex flex-col gap-3 mb-3 ml-5">
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
      </div>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1VlsZrWMDveAn6Ld-Mxygq_EZ_ASgmP4&ehbc=2E312F"
        allowFullScreen
        className="w-full h-[500px] border rounded-md shadow-lg"
        loading="lazy"
      />
    </div>
  );
};

export default RentalLocation;
