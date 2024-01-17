import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import NotFoundSVG from '../../../assets/images/NOT FOUND ILLUSTRATION.svg';
import CadMerenda from '../../../components/CadMerenda/CadMerenda';

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div
      className="w-screen h-screen gap-12 px-10
      flex flex-col justify-center items-center"
    >
      <img
        src={NotFoundSVG}
        alt="Ilustração de página não encontrada"
        className="w-[150px] md:w-[250px]"
      />
      <p
        className="text-blue
            text-center text-2xl lg:text-3xl"
      >
        <span className="text-orange font-bold">Opa... </span>
        A página que você está procurando não existe.
      </p>
      <Button
        type="button"
        outlined
        onClick={handleClick}
      >
        Volte para a página inicial.
      </Button>
      <CadMerenda size="small" />
    </div>
  );
}

export default NotFound;
