/* eslint-disable camelcase */
import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const createSupplier = async (supplier) => {
  try {
    const res = await fetch(`${VITE_API_URL}/signup/create`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
      },
      body: JSON.stringify(supplier),
    });
    if (res.status === HTTP_STATUS.CONFLICT) {
      throw new Error('CNPJ já cadastrado');
    } if (res.status === HTTP_STATUS.BAD_REQUEST) {
      throw new Error('Erro ao cadastrar fornecedor');
    } if (res.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      throw new Error('Erro interno do servidor');
    }

    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOfferedSchools = async (id, token, cycleId) => {
  try {
    const res = await fetch(`${VITE_API_URL}/offer/supplier/${id}/schools/${cycleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter as escolas');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchSuppliers = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/supplier/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter os fornecedores');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSupplierByUserId = async (user_id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/supplier/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter o fornecedor');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSupplierById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/supplier/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter o fornecedor');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOfferByInepAndSupplier = async (school_inep, supplier_id, cycle_id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/offer/school/${school_inep}/${supplier_id}/${cycle_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter a oferta');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTotalOrder = async (school_inep, cycle_id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/order/school/${school_inep}/${cycle_id}/total`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter o total');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createOffer = async (
  total_price,
  supplier_id,
  cycle_id,
  offered_products,
  totalOrdersIds,
  token,
) => {
  try {
    const res = await fetch(`${VITE_API_URL}/offer/create`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        total_price,
        supplier_id,
        cycle_id,
        offered_products,
        totalOrdersIds,
      }),
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível criar a oferta');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOffer = async (
  id,
  total_price,
  supplier_id,
  offered_products,
  cycle_id,
  token,
) => {
  try {
    const res = await fetch(`${VITE_API_URL}/offer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        total_price,
        supplier_id,
        cycle_id,
        offered_products,
      }),
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível atualizar a oferta');
  } catch (error) {
    return { error: error.message };
  }
};
