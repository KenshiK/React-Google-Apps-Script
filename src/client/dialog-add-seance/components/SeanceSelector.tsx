import React, { FormEvent, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DateTimePickerCustom from './DateTimePickerCustom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export default function SeanceSelector({ movieList, submitNewMovie  }: 
  { movieList: Array<String>, submitNewMovie:Function  }) {
  
  const [dateValue, setDate] = React.useState<Dayjs | null>(dayjs());
  const [time, setTime] = React.useState<Dayjs | null>(dayjs());
  const [movie, setMovie] = React.useState<String>('');

  const handleChange = (event: SelectChangeEvent) => {
    setMovie(event.target.value as string);
  }; 

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateValue == null) return;
    if (movie == '') return;
    submitNewMovie(dateValue);
  };

  return (
      <form
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">movie</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={movie}
            label="movie"
            onChange={handleChange}
          >
            {movieList.map((movie, index) => <MenuItem value={index}>{movie}</MenuItem>)}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={dateValue} onChange={(newDate) => setDate(newDate)}/>
          <TimePicker
            label="Controlled picker"
            value={time}
            onChange={(newTime) => setTime(newTime)}
          />
        </LocalizationProvider>
            {/* <DateTimePickerCustom
            // label="Basic date picker" 
            // value={dateValue}
            // onChange={(newValue) => setDate(newValue)}
            /> */}
        <Button variant="contained" type="submit">
            Submit
          </Button>
      </form>
  );
}

