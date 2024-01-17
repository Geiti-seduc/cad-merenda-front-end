import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const getAddressById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/address/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter o endereço');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAddress = async (address) => {
  try {
    const res = await fetch(`${VITE_API_URL}/address`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
      },
      body: JSON.stringify(address),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    throw new Error('Não foi possível realizar o cadastro.');
  }
  return null;
};

export const updateAddress = async (address, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/address/${address.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error('Não foi possível atualizar o endereço');
  } catch (error) {
    throw new Error(error.message);
  }
};
