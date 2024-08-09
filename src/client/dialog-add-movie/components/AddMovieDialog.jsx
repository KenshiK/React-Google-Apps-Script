import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import TextInput from './TextInput';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const AddMovieDialog = () => {
  const submitNewMovie = async (newMovie) => {
    try {
      const response = await serverFunctions.addMovie(newMovie);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };


  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Ajout de film
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        Ajoutez un nouveau film à la liste des films diffusés
      </Typography>
      <TextInput 
        label="Votre film" 
        caption=""
        submitNewMovie={submitNewMovie} 
        />
    </div>
  );
};

export default AddMovieDialog;
