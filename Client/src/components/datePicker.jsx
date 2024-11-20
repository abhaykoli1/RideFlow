// CustomDatePicker.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="custom-date-picker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd    h:mm aa"
        showTimeSelect
        placeholderText="Select a date and time"
        className="date-input "
        calendarClassName="custom-calendar "
        todayButton="Today"
      />
    </div>
  );
};

export default CustomDatePicker;
