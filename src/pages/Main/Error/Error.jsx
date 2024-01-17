import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';

function Error({
  title = 'Página de erro',
  message = 'Parece que você encontrou nossa página de erro, e foi da melhor forma possível!',
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      role="alert"
      className="w-screen h-screen gap-12 px-5
    flex flex-col justify-center items-center"
    >
      <p className="text-blue text-3xl lg:text-6xl font-bold">{location.state.title || title}</p>
      <div className="border-border border border-rounded overflow-x-auto text-center p-5 w-10/12 lg:w-fit h-fit rounded">
        <pre className="text-concrete break-normal">{location.state.message || message}</pre>
      </div>
      <div className="flex flex-col lg:flex-row text-center gap-5 w-10/12 justify-center lg:gap-10">
        <Button
          type="button"
          outlined
          className="justify-center"
          onClick={handleClick}
        >
          Ir para a página inicial
        </Button>
      </div>
      <p className="text-blue">
        Se o botão acima não funcionar, tente novamente mais tarde.
      </p>
      <div className="flex flex-col items-center gap-5">
        <p
          className="text-blue font-black text-center text-2xl
                  xl:text-3xl"
        >
          cad
          <span className="text-orange">Merenda</span>
        </p>
      </div>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Error;
