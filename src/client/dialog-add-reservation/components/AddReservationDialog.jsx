import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import ReservationSelector from './ReservationSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const AddReservationDialog = () => {
  function submitReservation(movie,
    seance,
    structureType,
    structureName,
    nbrParticipants,
    nbrExos,
    klass) {
    try {
      const response = serverFunctions.addReservation(movie, seance, structureType, structureName, nbrParticipants, nbrExos, klass);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }


  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Nouvelle réservation
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        Ajoutez une nouvelle réservation
      </Typography>
      <ReservationSelector submitReservation={submitReservation}
      />
    </div>
  );
};

export default AddReservationDialog;

export function submitReservationEx(movie,
    seance,
    structureType,
    structureName,
    nbrParticipants,
    nbrExos,
    klass) {
    try {
      const response = serverFunctions.addReservation(movie, seance, structureType, structureName, nbrParticipants, nbrExos, klass);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }
