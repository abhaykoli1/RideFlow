// import React, { useState } from "react";
// import axios from "axios";

// // Default coordinates for calculation (e.g., Jal Mahal, Jaipur)
// const defaultCoordinates = {
//   lat: 26.9187,
//   lng: 75.8201,
// };

// // Function to calculate the distance between two coordinates
// const calculateDistance = (lat1, lng1, lat2, lng2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) *
//       Math.cos(toRad(lat2)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// };

// const LocationChargeCalculator = () => {
//   const [address, setAddress] = useState("");
//   const [deliveryCharge, setDeliveryCharge] = useState(null);
//   const [distanceInKm, setDistanceInKm] = useState(null);
//   const [error, setError] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const calculateDeliveryCharge = async () => {
//     if (!address) {
//       setError("Please enter a valid address.");
//       return;
//     }
//     setError(null);

//     try {
//       const apiKey = "55892785a2b44c9c83056f9392539772"; // Replace with your OpenCage API key
//       const response = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//           address
//         )}&key=${apiKey}`
//       );

//       if (
//         response.data &&
//         response.data.results &&
//         response.data.results.length > 0
//       ) {
//         const { lat, lng } = response.data.results[0].geometry;
//         setLatitude(lat);
//         setLongitude(lng);

//         // Calculate the distance and delivery charge
//         const distance = calculateDistance(
//           defaultCoordinates.lat,
//           defaultCoordinates.lng,
//           lat,
//           lng
//         );
//         const chargePerKm = 10; // Example charge per kilometer
//         const charge = distance * chargePerKm;

//         setDistanceInKm(distance.toFixed(2)); // Round to 2 decimal places
//         setDeliveryCharge(charge.toFixed(2)); // Round to 2 decimal places
//       } else {
//         setError("Unable to fetch location. Please check the address.");
//       }
//     } catch (err) {
//       console.error("Error fetching location:", err);
//       setError("Failed to fetch location. Please try again.");
//     }
//   };

//   return (
//     <div className="mt-20 h-screen p-6">
//       <h1 className="text-center text-xl font-bold mb-4">
//         Delivery Charge Calculator
//       </h1>
//       <div className="flex flex-col items-center">
//         <input
//           type="text"
//           placeholder="Enter your address"
//           value={address}
//           onChange={handleAddressChange}
//           className="w-80 p-2 border border-gray-300 rounded mb-4"
//         />
//         <button
//           onClick={calculateDeliveryCharge}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Calculate Delivery Charge
//         </button>
//       </div>

//       <div className="text-center mt-4">
//         {error && <p className="text-red-500">{error}</p>}
//         {deliveryCharge && (
//           <p className="text-lg font-semibold">
//             Delivery Charge: ₹{deliveryCharge}
//           </p>
//         )}
//         {distanceInKm && (
//           <p className="text-lg font-semibold">Distance: {distanceInKm} km</p>
//         )}
//         {latitude && longitude && (
//           <p className="text-lg font-semibold">
//             Coordinates: Latitude: {latitude}, Longitude: {longitude}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LocationChargeCalculator;

// import React, { useState } from "react";
// import axios from "axios";

// // Default coordinates for calculation (e.g., Jal Mahal, Jaipur)
// const defaultCoordinates = {
//   lat: 26.9187,
//   lng: 75.8201,
// };

// // Function to calculate the distance between two coordinates
// const calculateDistance = (lat1, lng1, lat2, lng2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) *
//       Math.cos(toRad(lat2)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// };

// const LocationChargeCalculator = ({ address, setAddress }) => {
//   const [deliveryCharge, setDeliveryCharge] = useState(null);
//   const [distanceInKm, setDistanceInKm] = useState(null);
//   const [error, setError] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const calculateDeliveryCharge = async () => {
//     if (!address) {
//       setError("Please enter a valid address.");
//       return;
//     }
//     setError(null);

//     try {
//       const apiKey = "pk.7cc7ac95f6782aee9d21d6979faca0a9"; // Replace with your LocationIQ API key
//       const response = await axios.get(
//         `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
//           address
//         )}&format=json`
//       );

//       if (response.data && response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         setLatitude(lat);
//         setLongitude(lon);

//         // Calculate the distance and delivery charge
//         const distance = calculateDistance(
//           defaultCoordinates.lat,
//           defaultCoordinates.lng,
//           lat,
//           lon
//         );
//         const chargePerKm = 10; // Example charge per kilometer
//         const charge = distance * chargePerKm;

//         setDistanceInKm(distance.toFixed(2)); // Round to 2 decimal places
//         setDeliveryCharge(charge.toFixed(2)); // Round to 2 decimal places
//       } else {
//         setError("Unable to fetch location. Please check the address.");
//       }
//     } catch (err) {
//       console.error("Error fetching location:", err);
//       setError("Failed to fetch location. Please try again.");
//     }
//   };

//   return (
//     <div className="mt-20 h-screen p-6">
//       <h1 className="text-center text-xl font-bold mb-4">
//         Delivery Charge Calculator
//       </h1>
//       <div className="flex flex-col items-center">
//         <input
//           type="text"
//           placeholder="Enter your address"
//           value={address}
//           onChange={handleAddressChange}
//           className="w-80 p-2 border border-gray-300 rounded mb-4"
//         />
//         <button
//           onClick={calculateDeliveryCharge}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Calculate Delivery Charge
//         </button>
//       </div>

//       <div className="text-center mt-4">
//         {error && <p className="text-red-500">{error}</p>}
//         {deliveryCharge && (
//           <p className="text-lg font-semibold">
//             Delivery Charge: ₹{deliveryCharge}
//           </p>
//         )}
//         {distanceInKm && (
//           <p className="text-lg font-semibold">Distance: {distanceInKm} km</p>
//         )}
//         {latitude && longitude && (
//           <p className="text-lg font-semibold">
//             Coordinates: Latitude: {latitude}, Longitude: {longitude}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LocationChargeCalculator;

import React, { useEffect, useState } from "react";
import axios from "axios";

// Default coordinates for calculation (e.g., Jal Mahal, Jaipur)
const defaultCoordinates = {
  lat: 26.9187,
  lng: 75.8201,
};

// Function to calculate the distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const HomeDeliveryChargesCalculator = ({
  address,
  setAddress,
  setDeliveryCharge,
  deliveryCharge,
}) => {
  const [distanceInKm, setDistanceInKm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) {
      setDeliveryCharge(null);
      setDistanceInKm(null);
      setError(null);
      return;
    }

    const fetchLocationData = async () => {
      try {
        const apiKey = "pk.7cc7ac95f6782aee9d21d6979faca0a9";
        const response = await axios.get(
          `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
            address
          )}&format=json`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];

          // Calculate the distance and delivery charge
          const distance = calculateDistance(
            defaultCoordinates.lat,
            defaultCoordinates.lng,
            parseFloat(lat),
            parseFloat(lon)
          );
          const chargePerKm = 10;
          const charge = distance * chargePerKm;

          setDistanceInKm(distance.toFixed(2)); // Round to 2 decimal places
          setDeliveryCharge(charge.toFixed(2)); // Round to 2 decimal places
        } else {
          setError("Unable to fetch location. Please check the address.");
        }
      } catch (err) {
        console.error("Error fetching location:", err);
        setError("Failed to fetch location. Please try again.");
      }
    };

    fetchLocationData();
  }, [address]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setDeliveryCharge(null);
    setDistanceInKm(null);
    setError(null);
  };

  return (
    <div className=" ">
      {/* <h1 className="text-center text-xl font-bold mb-4">
        Delivery Charge Calculator
      </h1> */}
      {/* <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={handleAddressChange}
          className="w-80 p-2 border border-gray-300 rounded mb-4"
        />
      </div> */}

      {/* <div className="text-center mt-4">
        {deliveryCharge && (
          <p className="text-lg font-semibold">
            Delivery Charge: ₹{deliveryCharge}
          </p>
        )}
        {distanceInKm && (
          <p className="text-lg font-semibold">Distance: {distanceInKm} km</p>
        )}
      </div> */}
    </div>
  );
};

export default HomeDeliveryChargesCalculator;
