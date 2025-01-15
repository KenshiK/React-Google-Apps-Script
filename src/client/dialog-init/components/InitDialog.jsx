/* import React, { useEffect } from 'react';
import { Typography } from '@mui/material'; */
// import TextInput from './TextInput';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const InitDialog = () => {
  const startInit = async () => {
    try {
      response = await serverFunctions.init();
    } catch (error) {
      alert(error);
    }
  };

  startInit();
  
  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Initialisation de la page
      </Typography>
    </div>
  );
};

export default InitDialog;
