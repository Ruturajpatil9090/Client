import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, onChange}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className="form-control "
      autoComplete="off"
     
     
     
    />
  );
};

export default CustomDatePicker;

