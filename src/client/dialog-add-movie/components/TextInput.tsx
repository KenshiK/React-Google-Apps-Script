import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function TextInput({ label,caption,submitNewMovie }: { label: String, caption: String, submitNewMovie:Function  }) {
  const [newMovie, setNewMovie] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewMovie(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMovie.length === 0) return;
    submitNewMovie(newMovie);
    setNewMovie('');
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            id="movie-name"
            label={label}
            variant="outlined"
            value={newMovie}
            onChange={handleChange}
            name="newMovie"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
      <Typography variant="caption" gutterBottom>
        {caption} 
      </Typography>
      <br />
      <Typography variant="caption" gutterBottom sx={{ fontStyle: 'italic' }}>
        TODO: Penser à pouvoir modifier le film plus tard
      </Typography>
    </form>
  );
}
