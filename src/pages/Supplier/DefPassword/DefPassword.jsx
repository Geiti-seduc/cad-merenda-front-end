/* eslint-disable */
import './DefPassword.scss';
import React, {useState}  from 'react';
import logo from '../../../assets/images/seducalagoaslogo.svg';

function DefPassword() {
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  function validatePassword() {
    var passTest = document.getElementById("password");
    var passConfirmation = document.getElementById("passwordConfirmation");

    if (passTest.value == '') {
        setPasswordError("Por favor, insira uma senha.");
    } else if(passConfirmation.value == '') {
        setPasswordConfirmationError("Por favor, confirme sua senha.");
    } else if(passTest.value != passConfirmation.value) {
        setPasswordConfirmationError("As senhas não são iguais.");
    } else {
        passTest.value = '';
        passConfirmation.value = '';
        setPasswordError("");
        setPasswordConfirmationError("");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[--blue] overflow-auto gap-10 pb-10">
      <div className="container flex justify-center text-white">
        {/* Nomes da página */}
        <div className="text-center">
        <p className="font-black text-white text-3xl md:text-4xl">
          cad
          <span className="text-[#FF9842] text-3xl sm:text-4xl">Merenda</span>
        </p>
        </div>
      </div>
      <div
        className="container
          rounded-3xl w-5/6 sm:w-96 bg-[#FFFFFF]"
      >
        {/* new password form */}
        <div className="container p-10">
            <div className='flex justify-center'>
                <p className='text-[#005CA9] font-bold text-2xl pb-4'>Qual será sua senha?</p>
            </div>
            <div className='flex justify-center'>
                <p className='text-[--concrete] text-center font-normal pb-6'>Lembre-se de anotá-la em um local seguro.</p>
            </div>
          <div className="rounded-xl px-4 text-2xl pt-2 pb-2 w-70 border">
            <input
              className="box-shadow-none outline-none border-none text-lg input"
              type="password"
              id='password'
              required
              placeholder="Senha"
            />
          </div>
            {passwordError && (
                <p className="text-red-500 text-sm mt-2 pl-2">{passwordError}</p>
            )}
          <div className="m-auto rounded-xl px-4 pb-2 text-2xl pt-2 mt-8 w-70 border">
            <input
              className="box-shadow-none outline-none border-none text-lg input"
              id='passwordConfirmation'
              type="password"
              required
              placeholder="Confirmar senha"
            />
          </div>
            {passwordConfirmationError && (
                <p className="text-red-500 text-sm mt-2 pl-2">{passwordConfirmationError}</p>
            )}
          <div className="container flex justify-center">
            <button
              className="bg-gradient-to-r from-[--blue] to-[--hoverblue] text-white
              rounded-3xl text-xl border w-screen items-center font-bold
              h-14 mt-8"
              onClick= {validatePassword}
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <img src={ logo } alt="" className='h-4/5'/>
        </div>
      </div>
    </div>
  );
}

export default DefPassword;
