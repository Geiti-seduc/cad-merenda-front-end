import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const fetchOffers = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/offer/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter as ofertas');
  } catch (error) {
    throw new Error(error);
  }
};

export const getOfferById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school-offer/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter a oferta');
  } catch (error) {
    throw new Error(error);
  }
};

export const getOffersBySupplier = async (id, token, cycleId) => {
  try {
    const res = await fetch(`${VITE_API_URL}/offer/supplier/${id}/${cycleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter as ofertas');
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchOrderBySchool = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/order/school/${id}`, {
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

export const createGeneralList = async (data, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list/create`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível criar a lista');
  } catch (error) {
    throw new Error(error);
  }
};

export const updateGeneralList = async (data, token) => {
  const res = await fetch(`${VITE_API_URL}/general_list/update/${data.list_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': application,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Não foi possível atualizar a lista');
};

export const getGeneralLists = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter a lista');
  } catch (error) {
    throw new Error(error);
  }
};

export const getGeneralListsByCycle = async (cycleId, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list/cycle/${cycleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter a lista');
  } catch (error) {
    throw new Error(error);
  }
};

export const getGeneralListFood = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list_food/${id}`, {
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

export const getOrderByInep = async (inep, cycle, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/order/school/${inep}/cycle/${cycle}`, {
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

export const getGeneralListsByInep = async (inep, cycle, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list/school/${inep}/cycle/${cycle}`, {
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

export const updateOrder = async (order, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/order/${order.order_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível editar o pedido');
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const createOrder = async (order, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    if (res.ok) {
      return 'Pedido salvo com sucesso';
    }
    throw new Error('Não foi possível criar o pedido');
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
