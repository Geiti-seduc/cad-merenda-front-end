/* eslint-disable react/jsx-max-depth */

import './landing.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import brasao from '../../../assets/images/alagoasbrasaoazul.svg';
import CadMerenda from '../../../components/CadMerenda/CadMerenda';

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center h-screen">
      {/* left screen: enter and register */}
      <div
        className="flex flex-col items-center
        justify-center w-full lg:w-2/5 bg-white h-full gap-10 lg:gap-5"
      >
        {/* title and subtitle div */}
        <div className="flex flex-col gap-2">
          <CadMerenda size="small" type="button" />
          <p
            className="text-silver
            text-center text-md xl:text-lg subtitle-text"
          >
            Sistema de Gestão de Merenda Escolar
          </p>
        </div>
        {/* enter and register form */}

        <div
          className="flex flex-col items-center w-full md:w-3/5
          xl:w-3/5 p-10 gap-4 lg:gap-6"
        >
          <Button
            className="bg-blue p-3 w-full text-white font-bold
              hover:bg-[--hoverblue] transition-all ease-in-out"
            onClick={() => { navigate('/login'); }}
            label="ENTRAR"
          />
          <hr className="w-full border-silver mt-5" />
          <div className="flex flex-col items-center w-full gap-4">
            <p
              className="text-concrete font-normal text-lg"
            >
              Primeira vez aqui?
            </p>
            <Button
              className="bg-blue text-white font-bold p-3 h-12 w-full
                hover:bg-[--hoverblue] transition-all ease-in-out"
              onClick={() => { navigate('/cadastro'); }}
              label="CADASTRE-SE"
            />
          </div>
        </div>
        <img src={brasao} alt="" className="h-16 lg:hidden" />
      </div>
      {/* right screen: about the system */}
      <div
        className="hidden lg:flex flex-col items-center
        justify-center w-3/5 landing bg-blue h-full"
      >
        <p
          className="text-white text-center
          text-2xl lg:text-3xl font-bold select-none"
        >
          SOBRE O SISTEMA

        </p>
        <div
          className="lg:w-full xl:w-4/5 2xl:w-3/5 p-10 text-white
          text-justify info font-regular text-md flex flex-col gap-5"
        >
          <p>
            Bem-vindo ao CadMerenda, o coração pulsante por trás da
            gestão eficiente do programa de merenda escolar da
            Secretaria de Estado da Educação de Alagoas.
            Nós somos o alicerce que sustenta a alimentação
            nutritiva e saudável de milhares de estudantes em toda a
            região, garantindo que eles recebam o melhor da nossa terra todos os dias.
          </p>
          <p>
            O CadMerenda é a nossa resposta inovadora ao desafio de fornecer
            uma merenda escolar equitativa, saudável e econômica. Nosso sistema é
            embasado em editais criteriosamente elaborados, que permitem aos fornecedores
            registrados apresentarem suas ofertas com base nas necessidades específicas
            de cada escola.
          </p>

          <p>
            Este sistema simplifica e otimiza todo o processo de compra de
            alimentos para as escolas. Fornecedores qualificados
            têm a oportunidade de participar de licitações de forma
            justa e competitiva, garantindo que as escolas possam
            escolher produtos de qualidade a preços acessíveis.
          </p>
        </div>
        <img src={logo} alt="" className="h-[10%]" />
      </div>
    </div>
  );
}

export default Landing;
