import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Fallback({ error = null, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    resetErrorBoundary();
  };

  return (
    <div
      role="alert"
      className="w-screen h-screen gap-12 px-5
    flex flex-col justify-center items-center"
    >
      <p className="text-blue text-3xl lg:text-6xl font-bold">Algo deu errado!</p>
      <div className="flex flex-col lg:flex-row text-center gap-5 w-10/12 justify-center lg:gap-10">
        <Button
          type="button"
          className="justify-center"
          onClick={resetErrorBoundary}
        >
          Tentar novamente
        </Button>
        <Button
          type="button"
          outlined
          className="justify-center"
          onClick={handleClick}
        >
          Ir para a página inicial
        </Button>
      </div>
      {error && (
      <div className="border-border border border-rounded overflow-x-auto text-center p-5 w-10/12 lg:w-fit h-fit rounded">
        <pre className="text-concrete break-normal">{error.message}</pre>
      </div>
      )}
      <div className="flex flex-col items-center gap-5">
        <hr className="border-b border-orange w-full" />
        <div className="flex flex-col items-center text-center text-midnight gap-4">
          <p>
            Nos envie uma mensagem relatando o erro para que possamos corrigí-lo.
          </p>
          <address>suporte@educ.al.gov.br</address>
        </div>
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

Fallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default Fallback;
