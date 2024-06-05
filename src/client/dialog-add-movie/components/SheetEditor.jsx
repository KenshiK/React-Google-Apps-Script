import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

import FormInput from './FormInput';
import TextInput from './TextInput';
import SheetTable from './SheetTable';


// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    serverFunctions.getSheetsData().then(setDates).catch(alert);
  }, []);

  const deleteDate = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setDates).catch(alert);
  };

  const submitNewSheet = async (newSheetDate) => {
    try {
      const response = await serverFunctions.addSheet(newSheetDate);
      setDates(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  const submitNewMovie = async (newMovie) => {
    try {
      const response = await serverFunctions.addMovie(newMovie);
      setDates(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };


  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        ☀️ Ajout de film ! ☀️
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        This is a sample app that uses the <code>mui</code> library
        to help us build a simple React app. Enter a date for a new sheet, hit
        enter and the new sheet will be created. Click the red button next to the sheet date to
        delete it.
      </Typography>
      <TextInput 
        label="Votre film!" 
        caption="Enter the name for your new movie. If you dare"
        submitNewMovie={submitNewMovie} 
        />
    </div>
  );
};

export default SheetEditor;
