import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const fetchFood = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/food/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    } throw new Error('Não foi possível obter os alimentos');
  } catch (error) {
    throw new Error(error);
  }
};

export const getFoodById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/food/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    } throw new Error('Não foi possível obter o alimento');
  } catch (error) {
    throw new Error(error);
  }
};

export const createFood = async (food, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/food`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(food),
    });
    if (!res.ok) throw new Error('Não foi possível cadastrar o alimento');
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFood = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/food/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Não foi possível remover o alimento');
  } catch (error) {
    throw new Error(error);
  }
};

export const editFood = async (id, food, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(food),
    });
    if (!res.ok) throw new Error('Não foi possível editar o alimento');
  } catch (error) {
    throw new Error(error);
  }
};
