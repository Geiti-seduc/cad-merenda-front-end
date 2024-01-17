/* eslint-disable react/jsx-max-depth */
import './login.scss';
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import { getDataUser } from '../../../utils/getDataUser';

function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const toast = useRef(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sing, setSing] = useState('ENTRAR');

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailTest = document.querySelector('input[type="email"]').value;
    const passwordTest = document.querySelector('input[type="password"]').value;

    if (emailTest === '' || passwordTest === '') {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos',
        life: 8000,
      });
      return;
    }
    toast.current.clear();
    try {
      const values = { email: emailTest, password: passwordTest };
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.error) {
        toast.current.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Email ou senha incorretos',
          life: 8000,
        });
      } else {
        signIn({
          token: data.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: {
            email: emailTest,
            role: data.role,
            token: data.token,
          },
        });
        getDataUser(navigate);
        setSing(
          <CircularProgress
            style={ { width: '25px', height: '25px', color: 'white' } }
          />,
        );
      }
    } catch (err) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Problemas com o servidor, tente novamente mais tarde',
        life: 8000,
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center
      login w-screen h-screen bg-[--blue] overflow-auto
      gap-20"
    >
      <Toast ref={ toast } />
      <div className="flex justify-center text-white">
        {/* Nomes da página */}
        <div className="text-center">
          <p className="font-black text-2xl xl:text-4xl title">
            cad
            <span className="text-[#FF9842]">Merenda</span>
          </p>
          <p className="font-medium text-lg xl:text-lg subtitle">
            Sistema de Gestão de Merenda Escolar
          </p>
        </div>
      </div>
      <div
        className="rounded-3xl p-4 w-5/6 sm:w-96 bg-[#FFFFFF] input-div"
      >
        {/* Formulário de login */}
        <form className="h-full w-full p-6">
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex flex-col rounded-xl px-4 text-2xl pt-2 pb-2 w-full border"
            >
              <input
                className="box-shadow-none outline-none border-none text-lg grow input"
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
            <div
              className="flex flex-col rounded-xl px-4 text-2xl pt-2 pb-2 w-full border"
            >
              <input
                className="box-shadow-none outline-none border-none text-lg input grow"
                type="password"
                autoComplete="off"
                placeholder="Senha"
              />
            </div>
          </div>
          <div className="m-4 mb-8 text-right text-nd place-self-end">
            <a
              href="www.google.com.br"
              className="password-style text-[--concrete]"
            >
              Esqueceu a senha?
            </a>
          </div>
          <div className="container flex justify-center">
            <button
              className="bg-gradient-to-r from-[--blue] to-[--hoverblue] text-white
              rounded-2xl text-xl border w-screen font-bold
              h-12 flex justify-center items-center"
              type="submit"
              onClick={ handleSubmit }
              disabled={ sing !== 'ENTRAR' }
            >
              { sing }
            </button>
          </div>
        </form>
      </div>
      <img src={ logo } alt="" className="h-20" />
    </div>
  );
}

export default Login;
