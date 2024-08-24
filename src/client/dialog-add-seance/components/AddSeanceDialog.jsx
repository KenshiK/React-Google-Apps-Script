import React, { FormEvent, useEffect } from 'react';
import { Typography } from '@mui/material';
import SeanceSelector from './SeanceSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const AddSeanceDialog = () => {
  const submitNewMovieHour = async (newMovie, newHour) => {
    try {
      const response = await serverFunctions.addMovieHour(newMovie, newHour);
    } catch (error) {
      alert(error);
    }
  };

  const [movieList, setMovieList] = React.useState([]);

  useEffect(() => {
    var temp = getMovieList().then((arr) => setMovieList(arr))
    console.log("movie list promise : ")
    console.log(temp)
  }, [])
  
  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Ajout de séance
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        Ajoutez une séance à un film déjà enregistré
      </Typography>
      <SeanceSelector
        movieList={movieList}
        submitNewMovieHour = {submitNewMovieHour}
      />
    </div>
  );
};

export default AddSeanceDialog;

async function getMovieList() {
  try {
    const response = (await serverFunctions.getMovies());
    console.log("MovieList")
    console.log(response)
    return response;
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(error);
  }
  return [];
};

