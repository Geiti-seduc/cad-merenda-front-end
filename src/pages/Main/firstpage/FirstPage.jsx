/* eslint-disable react/jsx-max-depth */

import './firstpage.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import brasao from '../../../assets/images/alagoasbrasaoazul.svg';

function FirstPage() {
  return (
    <div className="flex items-center h-screen">
      {/* left screen: enter and register */}
      <div
        className="flex flex-col items-center
        justify-center w-full lg:w-2/5 bg-white h-full gap-10 lg:gap-5"
      >
        {/* title and subtitle div */}
        <div className="flex flex-col gap-2">
          <p
            className="text-[--blue] font-black text-center text-xl
            md:text-4xl lg:text-3xl xl:text-5xl title"
          >
            cad
            <span className="text-[--orange]">Merenda</span>
          </p>
          <p
            className="text-[--silver]
            text-center text-md xl:text-lg subtitle-text"
          >
            Sistema de Gestão de Merenda Escolar
          </p>
        </div>
        {/* enter and register form */}

        <div
          className="flex flex-col items-center w-full md:w-3/5
          xl:w-4/5 p-10 gap-4 lg:gap-6"
        >
          <Link to="/login" className="contents">
            <button
              className="bg-[--blue] p-3 rounded-2xl h-12 w-full text-white font-bold
              hover:bg-[--hoverblue] transition-all ease-in-out"
            >
              ENTRAR
            </button>
          </Link>
          <hr className="w-full border-[--silver] mt-5" />
          <div className="flex flex-col items-center w-full gap-2">
            <p
              className="text-[--concrete] font-normal text-lg"
            >
              Primeira vez aqui?
            </p>
            <Link to="/cadastro" className="contents">
              <button
                className="bg-[--blue] text-white font-bold p-3 rounded-2xl h-12 w-full
                hover:bg-[--hoverblue] transition-all ease-in-out"
              >
                CADASTRE-SE
              </button>
            </Link>
          </div>
        </div>
        <img src={ brasao } alt="" className="h-16 lg:hidden" />
      </div>
      {/* right screen: about the system */}
      <div
        className="hidden lg:flex flex-col items-center
        justify-center w-3/5 landing bg-[--blue] h-full"
      >
        <p
          className="text-white text-center
          text-2xl lg:text-3xl font-bold"
        >
          SOBRE O SISTEMA

        </p>
        <div className="lg:w-full xl:w-4/5 2xl:w-3/5 p-10">
          <p className="text-white text-justify info font-regular text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate,
            nisi semper eleifend fringilla, libero risus porta erat,
            id tincidunt leo sapien ornare massa. Nunc non lacus accumsan ipsum
            consectetur ornare. Nulla vel mi eros. Donec lobortis vel mauris a volutpat.
            Cras a fringilla felis, ac tempor lacus. Quisque et elit eros. Praesent eu
            viverra eros. Vestibulum eu ligula porttitor, vulputate metus placerat,
            dictum quam.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate,
            nisi semper eleifend fringilla, libero risus porta erat,
            id tincidunt leo sapien ornare massa. Nunc non lacus accumsan ipsum
            consectetur ornare. Nulla vel mi eros. Donec lobortis vel mauris a volutpat.
            Cras a fringilla felis, ac tempor lacus. Quisque et elit eros. Praesent eu
            viverra eros. Vestibulum eu ligula porttitor, vulputate metus placerat,
            dictum quam.
          </p>
        </div>
        <img src={ logo } alt="" className="h-[10%]" />
      </div>
    </div>
  );
}

export default FirstPage;
