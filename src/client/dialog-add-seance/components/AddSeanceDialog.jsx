import React, { FormEvent, useEffect } from 'react';
import { Typography } from '@mui/material';
import SeanceSelector from './SeanceSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const AddSeanceDialog = () => {
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
        Ajout de séance
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        Ajoutez une séance à un film déjà enregistré
      </Typography>
      <SeanceSelector
        movieList={['madmax', 'harry potter']}
        submitNewMovie= {submitNewMovie}
      />
    </div>
  );
};

export default AddSeanceDialog;
