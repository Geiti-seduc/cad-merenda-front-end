import React from 'react';
import { ArrowForward } from '@mui/icons-material';
import PropTypes from 'prop-types';

function Button({ func }) {
  return (
    <button
      type="button"
      onClick={ func }
      className="flex items-center gap-2 justify-center bg-[#005CA9] h-[55px]
              w-[200px] font-bold text-white rounded-xl
              text-xl hover:bg-[#3B9DEF] transition"
    >
      <p>AVANÇAR</p>
      <ArrowForward />
    </button>
  );
}

Button.propTypes = {
  func: PropTypes.func.isRequired,
};

export default Button;
