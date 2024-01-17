import React from 'react';
import { useNavigate } from 'react-router-dom';

function CadMerenda() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      type="button"
      className="text-center md:mt-8 py-8 md:py-0 select-none"
    >
      <p className="font-black text-white text-3xl md:text-4xl">
        cad
        <span className="text-[#FF9842] text-3xl sm:text-4xl">Merenda</span>
      </p>
    </button>
  );
}

export default CadMerenda;
