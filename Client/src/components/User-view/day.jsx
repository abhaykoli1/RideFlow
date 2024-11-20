import React, { useEffect, useState } from "react";

const DayCompo = ({ dayCss, setDay, day }) => {
  const [selectedDays, setSelectedDays] = useState(day || "");

  // Load selected days from sessionStorage or parent state when the component mounts
  useEffect(() => {
    const storedSelectedDays = sessionStorage.getItem("selectedDays");
    if (storedSelectedDays) {
      setSelectedDays(storedSelectedDays); // Set the state from sessionStorage
      setDay(storedSelectedDays); // Sync with parent component
    }
  }, [setDay]);

  // Update sessionStorage and parent state whenever selectedDays changes
  useEffect(() => {
    if (selectedDays) {
      sessionStorage.setItem("selectedDays", selectedDays);
      setDay(selectedDays); // Sync with parent component
    }
  }, [selectedDays, setDay]);

  // Handle change in the dropdown and set the selected days
  const handleChange = (event) => {
    setSelectedDays(event.target.value);
  };

  return (
    <div>
      <select
        id="day-select"
        className={`${dayCss} text-white bg-transparent h-10 text-sm !px-0 focus:outline-none`}
        value={selectedDays}
        onChange={handleChange}
      >
        <option value="">Choose..</option>
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
        <option value="4">4 days</option>
        <option value="5">5 days</option>
      </select>
    </div>
  );
};

export default DayCompo;
