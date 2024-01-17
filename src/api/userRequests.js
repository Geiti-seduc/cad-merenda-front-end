/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const fetchUsers = async (token) => {
  try {
      const res = await fetch(`${VITE_API_URL}/user-and-school/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    } throw new Error('Não foi possível obter os usuários');
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    } throw new Error('Não foi possível obter o usuário');
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (user, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Não foi possível criar o usuário');
  } catch (error) {
    throw new Error(error);
  }
};

export const checkExistingUser = async (email) => {
  try {
    const res = await fetch(`${VITE_API_URL}/supplier/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
      },
      body: JSON.stringify(email),
    });
    if (res.status === 200) throw new Error('Usuário já cadastrado');
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    } throw new Error('Não foi possível deletar o usuário');
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyUser = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    } throw new Error('Não foi possível verificar o usuário');
  } catch (error) {
    throw new Error(error);
  }
};

export const editUser = async (id, user, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Não foi possível editar o usuário');
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    const res = await fetch(`${VITE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      return res.json();
    } if (res.status === 401) {
      throw new Error('Email ou senha inválidos');
    }
  } catch (error) {
    throw new Error(error);
  }
  return null;
};

export const sendEmail = async (email) => {
  try {
    const res = await fetch(`${VITE_API_URL}/forgot-password/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.status === 500) {
      throw new Error('Não foi possível enviar o email de criação de senha');
    }
    throw new Error('E-mail de criação de senha enviado com sucesso');
  } catch (error) {
    throw new Error('Não foi possível enviar o email');
  }
};

export const requestPasswordChange = async (email) => {
  try {
    const res = await fetch(`${VITE_API_URL}/forgot-password/token`, {
      method: 'POST',
      headers: { 'Content-Type': application },
      body: JSON.stringify({ email }),
    });
    if (res.status === 500) {
      throw new Error('Não foi possível alterar a senha');
    }
    throw new Error('Senha alterada com sucesso');
  } catch (error) {
    throw new Error('Não foi possível alterar a senha');
  }
};
