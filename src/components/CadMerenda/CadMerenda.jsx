import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function CadMerenda({ size = 'large', type = 'none', color = 'blue' }) {
  const navigate = useNavigate();
  if (size === 'small' && type === 'button') {
    return (
      <button
        onClick={() => navigate('/')}
        type="button"
        className="text-center md:mt-8 py-8 md:py-0 select-none"
      >
        <p className={`font-black text-${color} text-3xl md:text-4xl`}>
          cad
          <span className="text-[#FF9842] text-3xl sm:text-4xl">Merenda</span>
        </p>
      </button>
    );
  }
  if (size === 'small') {
    return (
      <p className={`font-black text-${color} text-3xl md:text-4xl`}>
        cad
        <span className="text-[#FF9842] text-3xl sm:text-4xl">Merenda</span>
      </p>
    );
  }
  if (size === 'smaller') {
    return (
      <p className="text-orange font-black text-2xl">
        cad
        <span className={`text-${color} font-black text-2xl`}>Merenda</span>
      </p>
    );
  }
  return (
    <p className={`font-black text-2xl lg:text-5xl text-${color}`}>
      cad
      <span className="text-[#FF9842]">Merenda</span>
    </p>
  );
}

CadMerenda.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
};

export default CadMerenda;
