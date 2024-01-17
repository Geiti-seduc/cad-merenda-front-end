/* eslint-disable */
import './password.scss';
import React, { useState } from 'react';

function PasswordRedef() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailTest = document.querySelector('input[type="email"]').value;
    if (emailTest === '') {
      alert('Por favor, preencha todos os campos.');
    } else if (emailError !== '') {
      alert('Por favor, insira um e-mail válido.');
    } else {
      alert('O email foi enviado com sucesso!');
      document.querySelector('input[type="email"]').value = '';
    }
  };

  function goBack() {
    history.back();
  };

  return (
    <div className="login w-screen h-screen bg-[#005CA9] overflow-auto">
      <div
        className="container
          rounded-3xl p-4 m-auto w-5/6 sm:w-[420px] bg-[#FFFFFF] mt-44 input-div"
      >
        {/* redefinition area */}
        <div className="container p-6">
            <div className='text-center text-3xl mb-6'>
                <h1 className='text-[#95A5A6] font-bold'>REDEFINIR SENHA</h1>
                <div className='mt-6 text-justify'>
                    <h2 className='text-base text-[#95A5A6] mb-2'>Informe o e-mail utilizado em seu cadastro.</h2>
                    <h2 className='text-base text-[#95A5A6]'>Enviaremos uma mensagem com as instruções de recuperação.</h2>
                </div>
            </div>
          <div className="m-auto rounded-xl px-4 text-2xl pt-2  pb-2 w-70 border">
            <input
              className="box-shadow-none outline-none border-none text-lg input"
              type="email"
              required
              placeholder="Email"
              value={ email }
              onChange={ handleEmailChange }
              onBlur={ validateEmail }
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>
          <div className="container flex justify-center mt-6">
          <button
              className="bg-gradient-to-r from-[--blue] to-[--hoverblue] text-white
              rounded-3xl text-xl border w-screen items-center font-bold
              h-14 mt-8"
              onClick= {handleSubmit}
            >
              ENVIAR
            </button>
          </div>
          <div className='container flex justify-center'>
          <button
              className="bg-[#95A5A6] text-white
              rounded-3xl text-2xl border w-screen items-center
              h-14"
              onClick={ goBack() }
            >
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordRedef;
