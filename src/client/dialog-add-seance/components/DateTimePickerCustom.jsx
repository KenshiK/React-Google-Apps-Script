import React, { useState, FormEvent, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';


// This is a wrapper for google.script.run that lets us use promises.
// import { serverFunctions } from '../../utils/serverFunctions';

const DateTimePickerCustom = () => {
  const [dateValue, setDate] = React.useState<Dayjs | null>(dayjs());

  return (
    // <div style={{ padding: '3px', overflowX: 'hidden' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <DateTimePicker 
            label="Basic date picker" 
            value={dateValue}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    // </div>
  );
};

export default DateTimePickerCustom;
