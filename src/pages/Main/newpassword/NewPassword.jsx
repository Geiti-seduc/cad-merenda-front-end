/* eslint-disable */
import './newpassword.scss';
import React, {useState}  from 'react';
import logo from '../../../assets/images/seducalagoaslogo.svg';

function NewPassword() {
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
      <div
        className="container
          rounded-3xl p-4 m-auto w-5/6 sm:w-96 bg-[#FFFFFF] mt-8 input-div"
      >
        {/* new password form */}
        <div className="container p-6">
            <div className='flex justify-center'>
                <h1 className='text-[#005CA9] font-bold text-2xl pb-4'>Redefinir Senha</h1>
            </div>
            <div className='flex justify-center'>
                <h2 className='text-[#95A5A6] font-normal pb-6'>Digite sua nova senha.</h2>
            </div>
          <div className="m-auto rounded-xl px-4 text-2xl pt-2  pb-2 w-70 border">
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
      <div className="container flex justify-center m-auto mt-7">
        <div>
          <img src={ logo } alt="" />
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
