/* eslint-disable no-plusplus */

import { checkCnae } from '../api/external/cnaeRequests';

/* eslint-disable no-magic-numbers */
const validateName = (name) => {
  if (!name) throw new Error('Nome inválido');
};

const validateStateRegistration = (stateRegistration) => {
  if (!stateRegistration) throw new Error('Inscrição estadual inválida');
};

const validateEmail = (email) => {
  if (!email) throw new Error('Email inválido');
  const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) throw new Error('Email inválido');
};

const validatePassword = (password) => {
  if (!password) throw new Error('Senha inválida');
  const regex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
  if (!regex.test(password)) throw new Error('Sua senha deve conter no mínimo 6 caracteres, uma letra maiúscula e um número');
};

const validateCpf = (rawCpf) => {
  if (!rawCpf) throw new Error('CPF inválido');
  const cpf = rawCpf.replace(/[^\d]+/g, '');
  const regex = /^\d{11}$/;
  if (!regex.test(cpf)) throw new Error('CPF inválido');
};

const validateRole = (role) => {
  if (!role) throw new Error('Função inválida');
  if (role !== 'admin'
  && role !== 'nutricionista'
  && role !== 'admin-nutri'
  && role !== 'gestor'
  && role !== 'fornecedor') throw new Error('Função inválida');
};

const formatCpf = (cpf) => {
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  if (!cpf.replace(regex, '$1.$2.$3-$4')) throw new Error('CPF inválido');
};

const validateInep = (inep) => {
  if (!inep) throw new Error('INEP inválido');
  const regex = /^\d{8}$/;
  if (!regex.test(inep)) throw new Error('INEP inválido');
};

const validateCnae = async (cnae) => {
  if (!cnae) throw new Error('CNAE inválido');
  if (!checkCnae(cnae)) throw new Error('CNAE inválido');
};

// eslint-disable-next-line complexity
const validateCnpj = (rawCnpj) => {
  if (!rawCnpj) throw new Error('CNPJ inválido');
  const cnpj = rawCnpj.replace(/[^\d]+/g, '');
  if (cnpj === '') throw new Error('CNPJ inválido');
  if (cnpj.length !== 14) throw new Error('CNPJ inválido');
  // Elimina CNPJs invalidos conhecidos
  if (cnpj === '00000000000000'
    || cnpj === '11111111111111'
    || cnpj === '22222222222222'
    || cnpj === '33333333333333'
    || cnpj === '44444444444444'
    || cnpj === '55555555555555'
    || cnpj === '66666666666666'
    || cnpj === '77777777777777'
    || cnpj === '88888888888888'
    || cnpj === '99999999999999') throw new Error('CNPJ inválido');
  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = (soma % 11) < 2 ? 0 : (11 - (soma % 11));
  if (resultado !== Number(digitos.charAt(0))) throw new Error('CNPJ inválido');
  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = ((soma % 11) < 2) ? 0 : (11 - (soma % 11));
  if (resultado !== Number(digitos.charAt(1))) throw new Error('CNPJ inválido');
};

const validatePhone = (tel) => {
  if (!tel) throw new Error('CNPJ inválido');
  const regex = /^\d{10,11}$/;
  if (!regex.test(tel)) throw new Error('Telefone inválido');
};

const handleCep = async (e, showToast = null) => {
  e.preventDefault();
  const cepValue = e.target.value.replace(/\D/g, '');
  const url = `https://viacep.com.br/ws/${cepValue}/json/`;
  const cepPattern = /^[0-9]{8}$/;

  if (cepPattern.test(cepValue)) {
    const data = await fetch(url);
    const endereco = await data.json();

    if (endereco.erro) {
      if (showToast) showToast('error', 'ERRO', 'CEP não encontrado');
      throw new Error('CEP não encontrado');
    } else {
      document.getElementById('street').value = endereco.logradouro;
      document.getElementById('district').value = endereco.bairro;
      document.getElementById('city').value = endereco.localidade;
      document.getElementById('state').value = endereco.uf;
      document.getElementById('number').focus();
      document.getElementById('zip').value = endereco.cep;
    }
  }
};

const parseDate = (raw) => {
  if (!raw) return '00/00/0000';
  const day = String(new Date(raw).getDate()).padStart(2, '0');
  const month = String(new Date(raw).getMonth() + 1).padStart(2, '0');
  const year = new Date(raw).getFullYear();
  return `${day}/${month}/${year}`;
};

const adjustStartTime = (raw) => {
  const date = new Date(raw);
  date.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
  return date.toISOString();
};

const adjustEndTime = (raw) => {
  const date = new Date(raw);
  date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
  return date.toISOString();
};

const matchPassword = (password, passwordConfirmation) => {
  if (password === '' || passwordConfirmation === '') throw new Error('Preencha todos os campos');
  if (password !== passwordConfirmation) throw new Error('As senhas não são iguais');
};

export {
  validateName,
  validateEmail,
  validatePassword,
  validateCpf,
  validateRole,
  formatCpf,
  validateCnpj,
  validatePhone,
  validateInep,
  handleCep,
  validateCnae,
  validateStateRegistration,
  parseDate,
  adjustStartTime,
  adjustEndTime,
  matchPassword,
};
