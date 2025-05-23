import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const DateCompo = ({ dateCss, setDate, date, Calendar }) => {
  const [pickUpDate, setPickUpDate] = useState(new Date());

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
        dateFormat="dd-MM-yyyy   hh:mm a"
        showTimeSelect
        placeholderText="Select a date "
        className={`${dateCss} custom-date-picker focus:outline-none text-sm !px-0`}
        calendarClassName={` ${Calendar} custom-calendar z-50 absolute lg:-left-28 md:-left-28 sm:-left-28 -left-[105px]`}
        todayButton="Today"
        minDate={new Date()}
      />
    </div>
  );
};

export default DateCompo;
