import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;


export const getCycles = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/cycle`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCycleById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/cycle/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLatestCycle = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/cycle/last/desc`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postCycles = async (cycle, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/cycle/create`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cycle),
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error('Não foi possível criar o ciclo');
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const updateCycles = async (cycle, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/cycle/${cycle.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cycle),
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error('Não foi possível atualizar o ciclo');
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
