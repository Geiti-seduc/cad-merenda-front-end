/* eslint-disable */
import './newpassword.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import { matchPassword, validatePassword } from '../../../utils/DataParser';
import { InputText } from 'primereact/inputtext';
import { useToast } from '../../../contexts/ToastContextProvider';

function NewPassword() {
  const { VITE_API_URL } = import.meta.env;
  const [passwordError, setPasswordError] = useState('');
  const { showToast } = useToast();
  const [id, setId] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        window.location.href = '/esqueci-senha';
        return;
      }

      try {
        const res = await fetch(
          `http://${VITE_API_URL}/forgot-password/newPassword/${token}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await res.json();

        if (data.error) {
          window.location.href = '/esqueci-senha?error=token';
        }
        setId(data.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  async function handleClick() {
    document.getElementById('Buttons').disabled = true;
    var password = document.getElementById('password').value;
    var passwordConfirmation = document.getElementById('passwordConfirmation').value;

    try {
      matchPassword(password, passwordConfirmation);
      validatePassword(password);
    } catch (error) {
      showToast('error', 'Erro', error.message);
      document.getElementById('Buttons').disabled = false;
      return;
    }

      const res = await fetch(
        `http://${VITE_API_URL}:3001/forgot-password/updateUser/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (data.error) {
        setPasswordError(data.error);
        document.getElementById('Buttons').disabled = false;
      } else {
        window.location.href = '/login?success=password';
      }
  }

  return (
    <div className="login w-screen h-screen bg-blue overflow-auto">
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
        rounded-3xl P-4 m-auto w-5/6 sm:w-96 bg-[#FFFFFF] mt-8 input-div"
      >
        {/* new password form */}
        <div className="container p-6">
          <div className="flex justify-center">
            <h1 className="text-blue font-bold text-2xl pb-4">Redefinir Senha</h1>
          </div>
          <div className="flex justify-center">
            <h2 className="text-[#95A5A6] font-normal pb-6">Digite sua nova senha.</h2>
          </div>
          <div className="m-auto rounded-xl px-4 text-2xl pt-2  pb-2 w-70 border">
            <InputText
              className='w-full'
              type="password"
              id="password"
              required
              placeholder="Senha"
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-2 pl-2">{passwordError}</p>
          )}
          <div className="m-auto rounded-xl px-4 pb-2 text-2xl pt-2 mt-8 w-70 border">
            <InputText
              className="w-full"
              id="passwordConfirmation"
              type="password"
              required
              placeholder="Confirmar senha"
            />
          </div>
          <div className="container flex justify-center">
            <button
              className="bg-gradient-to-r from-blue to-[--hoverblue] text-white
              rounded-3xl text-xl border w-screen items-center font-bold
              h-14 mt-8"
              onClick={handleClick}
              id="button"
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
      <div className="container flex justify-center m-auto mt-7">
        <div>
          <img
            src={logo}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
