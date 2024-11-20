// src/hooks/useDeviceType.js
import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
      if (/tablet/.test(userAgent) || /ipad/.test(userAgent)) {
        setDeviceType("tablet");
      } else {
        setDeviceType("mobile");
      }
    } else {
      setDeviceType("desktop");
    }
  }, []);

  // console.log("DeviceType:", deviceType);
  return deviceType;
};

export default useDeviceType;
