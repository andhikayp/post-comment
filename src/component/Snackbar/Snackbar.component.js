import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Snackbar = ({ message }) => (
  <Alert key="success" variant="success">
    {message}
  </Alert>
);

export default Snackbar;
