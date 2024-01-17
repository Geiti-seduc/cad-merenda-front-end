/* eslint-disable */
import './passwordcode.scss';
import React, { useState } from 'react';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import gobackicon from '../../../assets/images/Back_light.svg';

function PasswordRedefConf() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const codeTest = document.querySelector('input[type="text"]').value;
    if (codeTest === '') {
      alert('Por favor, preencha todos os campos');
    } else {
      alert('Você será redirecionado para definir sua nova senha.');
      document.querySelector('input[type="text"]').value = '';
    }
  };

  return (
    <div className="login w-screen h-screen bg-[#005CA9] overflow-auto">
      <div className="container flex justify-center text-white m-auto">
        {/* Nomes da página */}
        <div className="text-center mt-16">
          <h1 className="font-black text-4xl sm:text-6xl md:text-7xl title">
            cad
            <span className="text-[#FF9842]">Merenda</span>
          </h1>
          <h2 className="font-medium sm:text-lg md:text-2xl subtitle">
            Sistema de Gestão de Merenda Escolar
          </h2>
        </div>
      </div>
    <div className="container rounded-3xl p-4 m-auto w-5/6 sm:w-96 bg-[#FFFFFF] mt-8 input-div">
        {/* main area */}
        <div className="container p-6">
            <div className='flex justify-center mb-5'>
                <h1 className='text-[#005CA9] font-bold text-2xl'>Redefinir Senha</h1>
            </div>
            <div className='mb-8 mt-10'>
                <h2 className='text-[#95A5A6] text-lg'>Digite o código enviado por e-mail.</h2>
            </div>
          {/* input area */}
          <div className="m-auto rounded-xl px-4 text-2xl pt-2  pb-2 w-70 border mb-10">
            <input
              className="box-shadow-none outline-none border-none text-lg input"
              type="text"
              required
              placeholder="Código"
            />
          </div>
          {/* send button */}
          <div className="container flex justify-center">
          <button
              className="bg-gradient-to-r from-[--blue] to-[--hoverblue] text-white
              rounded-3xl text-xl border w-screen items-center font-bold
              h-14 mt-8"
              onClick= {handleSubmit}
            >
              ENVIAR
            </button>
          </div>
          {/* go back button */}
          <div className='inline-block mt-10'>
            <a href='#'><span className='text-[#95A5A6] text-xl font-normal'><img src={gobackicon} alt='Voltar' className='inline-block pr-2'/>Voltar</span></a>
          </div>
        </div>
      </div>
      {/* gov logo */}
      <div className="container flex justify-center m-auto mt-7">
        <div>
          <img src={ logo } alt="" />
        </div>
      </div>
    </div>
  );
}

export default PasswordRedefConf;
