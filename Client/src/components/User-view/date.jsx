import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const DateCompo = ({ dateCss, setDate, date }) => {
  const [pickUpDate, setPickUpDate] = useState(null);

  // // Load pick-up date from sessionStorage on component mount
  useEffect(() => {
    const storedPickUpDate = sessionStorage.getItem("pickUpDate");
    if (storedPickUpDate) {
      setPickUpDate(new Date(storedPickUpDate)); // Set state from sessionStorage
    }
  }, []);

  // // Update sessionStorage whenever pickUpDate changes
  useEffect(() => {
    if (pickUpDate) {
      sessionStorage.setItem("pickUpDate", pickUpDate.toISOString());
    }
  }, [pickUpDate]);

  useEffect(() => {
    if (pickUpDate) {
      const formattedDate = pickUpDate;
      setDate(formattedDate);
    }
  }, [pickUpDate]);

  return (
    <div>
      <DatePicker
        selected={pickUpDate}
        onChange={(date) => setPickUpDate(date)}
        dateFormat="dd-MM-yyyy    h:mm aa"
        showTimeSelect
        placeholderText="Select a date and time"
        className={`${dateCss} custom-date-picker focus:outline-none text-sm !px-0`}
        calendarClassName="custom-calendar absolute lg:-left-28 md:-left-28 sm:-left-28 -left-[220px]"
        todayButton="Today"
      />
    </div>
  );
};

export default DateCompo;
