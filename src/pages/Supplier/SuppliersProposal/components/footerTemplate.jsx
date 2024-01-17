import React, { useState } from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function Footer(rowsInitials, product) {
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  let countData = rowsInitials;
  console.log(product);
  return (
    <button
      type="button"
      onClick={() => {
        countData += rowsInitials;
        const newIsAllDataLoaded = countData >= 1;
        setIsAllDataLoaded(newIsAllDataLoaded);
      }}
      className={`text-concrete ${isAllDataLoaded ? 'hidden' : ''}`}
    >
      <p>Carregar mais</p>
      <KeyboardDoubleArrowDownIcon />
    </button>
  );
}
