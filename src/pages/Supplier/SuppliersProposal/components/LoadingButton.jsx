import { CircularProgress } from '@mui/material';
import React from 'react';

function LoadingButton() {
  return (
    <CircularProgress
      style={{ width: '25px', height: '25px', color: 'white' }}
    />
  );
}

export default LoadingButton;
