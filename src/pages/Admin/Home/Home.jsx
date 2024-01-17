import React from 'react';
import image from '../../../assets/images/ADMIN ILLUSTRATION.svg';

function Home() {
  return (
    <div className="h-[90vh] flex justify-center items-center gap-14">
      <img src={image} draggable={false} alt="" className="w-[35vw]" />
      <div className="flex flex-col gap-3 select-none">
        <p className="text-4xl text-orange">MODO ADMINISTRADOR</p>
        <p className="text-blue font-bold">Utilize o cabeçalho para navegação</p>
      </div>
    </div>
  );
}

export default Home;
