import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Typography } from '@mui/material';

const FormInput = () => {
  const [newMovie, setNewMovie] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewMovie(event.target.value);

  return (
    <div>
          <TextField
            id="movie-name"
            label="Votre film"
            variant="outlined"
            value={setNewMovie}
            onChange={handleChange}
            name="newMovie"
            fullWidth
            size="small"
          />
      <Typography variant="caption" gutterBottom>
        Enter the name for your new movie.
      </Typography>
      <br />
      <Typography variant="caption" gutterBottom sx={{ fontStyle: 'italic' }}>
        TODO: Penser à pouvoir modifier le film plus tard
      </Typography>
    </div>
  );
};

export default FormInput;
