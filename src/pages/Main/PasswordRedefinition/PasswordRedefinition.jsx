/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import { useToast } from '../../../contexts/ToastContextProvider';
import { requestPasswordChange } from '../../../api/userRequests';
import { validateEmail } from '../../../utils/DataParser';

function PasswordRedef() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const errorToken = useRef(false);
  const location = useLocation();
  const { showToast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get('error');
  const navigate = useNavigate();

  useEffect(() => {
    if (error && !errorToken.current) {
      showToast('error', 'Erro', 'Token inválido');
      errorToken.current = true;
    }
  }, [error]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmail = () => {
    try {
      validateEmail(email);
      setEmailError('');
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleEmail();
    const emailTest = document.querySelector('input[type="email"]').value;
    document.getElementById('Buttons').disabled = true;
    if (emailTest === '') {
      showToast('error', 'Erro', 'Preencha todos os campos');
    } else if (emailError !== '') {
      showToast('error', 'Erro', 'Preencha todos os campos');
    } else {
      try {
        const res = await requestPasswordChange(email);
        if (res.status === 200) showToast('success', 'Feito!', 'E-mail enviado com sucesso');
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    }
  };

  return (
    <div className="login w-screen flex flex-col gap-10 items-center pt-[10vh] h-screen bg-blue overflow-auto">
      <div className="flex flex-col text-white gap-2 text-center">
        <p className="font-black text-2xl lg:text-5xl title">
          cad
          <span className="text-orange">Merenda</span>
        </p>
        <p className="font-medium text-lg xl:text-md subtitle">
          Sistema de Gestão de Merenda Escolar
        </p>
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-12 w-5/6 sm:w-96 ">
        <div className="flex flex-col gap-4 text-center mb-6">
          <h1 className="text-blue font-extrabold text-xl">REDEFINIR SENHA</h1>
          <div className="text-justify flex flex-col gap-4 text-midnight">
            <p>Informe o e-mail utilizado em seu cadastro.</p>
            <p>Enviaremos uma mensagem com as instruções de recuperação.</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <InputText
            type="email"
            required
            className="w-full"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmail}
          />
          <div className='flex flex-col w-full gap-3'>
            <Button
                className="bg-gradient-to-r from-blue to-[--hoverblue] flex justify-center items-center"
                type="submit"
                onClick={handleSubmit}
              >
                ENVIAR
              </Button>
              <Button text label='VOLTAR' onClick={() => {navigate('/login')}}/>
          </div>
        </div>
        <div className="container flex justify-center" />
      </div>
      <img
        src={logo}
        alt=""
        className="h-20 xl:h-34"
      />
    </div>
  );
}

export default PasswordRedef;
