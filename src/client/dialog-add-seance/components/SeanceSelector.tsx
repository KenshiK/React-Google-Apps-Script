import React, { FormEvent } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled'

export default function SeanceSelector({ movieList, submitNewMovieHour  }: 
  { movieList: Array<String>, submitNewMovieHour:Function  }) {
  
  const [movie, setMovie] = React.useState<String>('');
  const [dateTime, setDateTime] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target);
    console.log("movie from array :" + movieList[event.target.value]);
    setMovie(event.target.value as string);
    // setMovie(movieList[event.target.value]);
  }; 

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateTime == '') return;
    if (movie == '') return;
    var movieName = movieList[+movie];
    console.log("submitNewMovieHour movie :" + movieName + " hour : " + dateTime);
    submitNewMovieHour(movieName, dateTime);
  };

  // if(movieList == null || movieList as Array)

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

          <StyledInput type="datetime-local" value={dateTime} onChange={(ev) => setDateTime(ev.target.value)}/>
        </FormControl>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
  );
}

const StyledInput = styled("input")({
  display: 'block',
  marginTop : '20px',
});
