import React from 'react';

function Closed() {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[80vh] pt-12 md:pt-20 gap-10 lg:pt-12">
      <p className="font-black text-blue text-center text-xl md:text-3xl lg:text-4xl">
        <span className="font-medium">Opa! O </span>
        {' '}
        cad
        <span className="text-orange">Merenda</span>
        {' '}
        <span className="font-medium">
          está indisponível para isto no momento.
        </span>
      </p>
      <p className="font-black text-blue text-center text-xl md:text-xl lg:text-2xl">
        <span className="font-medium">Verifique as datas e prazos no edital deste ciclo.</span>
      </p>
    </div>
  );
}

export default Closed;
