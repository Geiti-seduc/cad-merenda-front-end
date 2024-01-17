import React, { useState, useRef, useEffect } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import { getUserData } from '../../../utils/userData';
import { validateEmail } from '../../../utils/DataParser';
import leftOrnament from '../../../assets/LeftOrnament.svg';
import rightOrnament from '../../../assets/RightOrnament.svg';
import { getLatestCycle } from '../../../api/cyclesRequests';
import { HTTP_STATUS } from '../../../utils/constants';
import { useToast } from '../../../contexts/ToastContextProvider';
import CadMerenda from '../../../components/CadMerenda/CadMerenda';

function Login() {
  const { VITE_API_URL } = import.meta.env;
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sing, setSing] = useState('ENTRAR');
  const successPass = useRef(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');

  const sendToErrorPage = (message) => {
    navigate('/erro', {
      state: {
        title: 'Tivemos um problema...',
        message,
      },
    });
  };

  useEffect(() => {
    if (success && !successPass.current) {
      showToast('success', 'Feito!', 'Senha alterada com sucesso');
      successPass.current = true;
    }
  }, [success]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    setSing(
      <CircularProgress
        style={{ width: '25px', height: '25px', color: 'white' }}
      />,
    );
    event.preventDefault();
    const emailTest = document.querySelector('input[type="email"]').value;
    const passwordTest = document.querySelector('input[type="password"]').value;

    if (emailTest === '' || passwordTest === '') {
      showToast('error', 'Erro', 'Preencha todos os campos');
      setSing('ENTRAR');
      return;
    }
    try {
      const values = { email: emailTest, password: passwordTest };
      const response = await fetch(`${VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.error) {
        setSing('ENTRAR');
        if (HTTP_STATUS.UNAUTHORIZED === response.status) {
          showToast('error', 'Erro', 'Email ou senha incorretos');
        } else if (HTTP_STATUS.NOT_FOUND === response.status) {
          showToast('error', 'Erro', 'Usuário não encontrado');
        } else {
          showToast('error', 'Erro', 'Não foi possível fazer login');
        }
      } else {
        try {
          const cycle = await getLatestCycle(data.token);
          localStorage.setItem('cycle', cycle.id);
        } catch (err) {
          sendToErrorPage(err.message);
        }

        signIn({
          token: data.token,
          expiresIn: 180,
          tokenType: 'Bearer',
          authState: {
            email: emailTest,
            role: data.role,
            token: data.token,
          },
        });

        getUserData(navigate);
        setSing(
          <CircularProgress
            style={{ width: '25px', height: '25px', color: 'white' }}
          />,
        );
      }
    } catch (err) {
      setSing('ENTRAR');
      showToast('error', 'Erro', 'Não foi possível fazer login');
    }
  };

  const handleEmailError = (e) => {
    try {
      validateEmail(e.target.value);
    } catch (error) {
      setEmailError(error.message);
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center
      login w-screen h-screen bg-blue overflow-auto
      gap-20 relative"
    >
      <img
        src={leftOrnament}
        alt=""
        className="absolute right-0 h-full hidden lg:block"
      />
      <img
        src={rightOrnament}
        alt=""
        className="absolute left-0 h-full hidden lg:block"
      />
      <div className="flex justify-center text-white">
        {/* Nomes da página */}
        <div className="flex flex-col gap-2 text-center">
          <CadMerenda color="white" />
          <p className="font-medium text-lg xl:text-md subtitle">
            Sistema de Gestão de Merenda Escolar
          </p>
        </div>
      </div>
      <div className="rounded-3xl p-4 w-5/6 sm:w-96 bg-white input-div">
        {/* Formulário de Login */}
        <form className="h-full w-full p-6">
          <div className="flex flex-col items-center gap-3">
            {emailError && (
              <p className="place-self-start text-red text-sm">
                {emailError}
              </p>
            )}
            <InputText
              className="w-full"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailError}
            />
            <InputText
              className="w-full"
              type="password"
              autoComplete="off"
              placeholder="Senha"
            />
          </div>
          <div className="m-4 mb-8 text-right text-md place-self-end">
            <button
              onClick={() => navigate('/esqueci-senha')}
              type="button"
              className="text-concrete hover:text-blue hover:cursor-pointer"
            >
              Esqueceu a senha?
            </button>
          </div>
          <div className="container flex justify-center">
            <Button
              className="w-full flex justify-center items-center"
              type="submit"
              onClick={handleSubmit}
              disabled={sing !== 'ENTRAR'}
            >
              {sing}
            </Button>
          </div>
          <button
            type="button"
            className="w-full rounded-md hover:ring-1 hover:ring-blue py-2
            transition-all flex items-center justify-center mt-5 text-concrete
            hover:text-blue hover:cursor-pointer"
            onClick={() => navigate('/cadastro')}
          >
            <p
              to="/cadastro"
              className="text-lg select-none"
            >
              Não tem conta?
              {' '}
              <u className="underline underline-offset-4">Cadastre-se</u>
            </p>
          </button>
        </form>
      </div>
      <img src={logo} alt="" className="h-20 xl:h-34" />
    </div>
  );
}

export default Login;
