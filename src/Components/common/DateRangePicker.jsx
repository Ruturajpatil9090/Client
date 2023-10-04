import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, onChange }) => {
  // const minDate = new Date(2023, 3, 1); 
  // const maxDate = new Date(2024, 2, 31); 

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className="form-control"
      autoComplete="off"
      // minDate={minDate}
      // maxDate={maxDate}
      required
    />
  );
};

export default CustomDatePicker;


