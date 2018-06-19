import React, { Fragment, Component } from 'react';
import { DatePicker } from 'material-ui-pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const CustomDatePicker = ({
  value,
  returning,
  minDate,
  maxDate,
  handleDateChange
}) => (
    <DatePicker
      value={value}
      onChange={handleDateChange}
      animateYearScrolling={false}
      leftArrowIcon={<ArrowBackIcon/>}
      rightArrowIcon={<ArrowForwardIcon/>}
      placeholder={returning && 'opcional'}
      minDate={minDate}
      maxDate={maxDate}
      disablePast
      clearable
      InputProps={{ disableUnderline: true }}
    />
  ) //AÑADIR CLEAR LABEL, OK Y CANCEL LABEL PARA AMBOS IDIOMAS


export default CustomDatePicker;
