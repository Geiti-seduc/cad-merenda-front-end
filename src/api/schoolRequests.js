/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const fetchSchools = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter as escolas');
  } catch (error) {
    throw new Error(error);
  }
};

export const createSchool = async (school, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school/`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(school),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível criar a escola');
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchSchoolAccess = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/user-access`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter as escolas');
  } catch (error) {
    throw new Error(error);
  }
};

export const getSchoolById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error('Não foi possível obter a escola');
  } catch (error) {
    throw new Error(error);
  }
};

export const getFullSchoolInfo = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school/SchoolInfo/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter a escola');
  } catch (error) {
    throw new Error(error);
  }
};

export const getSchoolByCity = async (city, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school/city/${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter a escola');
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchOffers = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school-offer`, {
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

export const fetchOffersByInep = async (params, token) => {
  const { inep, id: cycleId } = params;
  try {
    const res = await fetch(`${VITE_API_URL}/offer/school/${inep}/${cycleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return await res.json();
    throw new Error('Não foi possível obter as ofertas');
  } catch (error) {
    throw new Error(error);
  }
};

export const getGeeById = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/gee/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return await res.json();
    throw new Error('Não foi possível obter a GEE');
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCountOffersByInep = async (params, token) => {
  const { inep, id: cycleId } = params;
  try {
    const res = await fetch(`${VITE_API_URL}/offer/school/count/${inep}/${cycleId}/total`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return await res.json();
    throw new Error('Não foi possível obter as ofertas');
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchAllModalities = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/modality`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter as modalidades');
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrderBySchool = async (id, token) => {
  const cycle = localStorage.getItem('cycle');
  try {
    const res = await fetch(`${VITE_API_URL}/order/school/${id}/${cycle}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const resOrder = await res.json();
      const returnOrder = [];
      resOrder.map((item) => {
        if (item.requested_products.length > 0) {
          item.requested_products.map((product) => {
            product.food.order_id = item.id;
            product.food.food_id = product.food.id;
            product.food.quantity = product.quantity;
            product.food.modality = item.general_list.modality.name;
            product.food.frequency = product.frequency;
            returnOrder.push(product.food);
          });
        }
      });
      return returnOrder;
    }
    throw new Error('Não foi possível obter o pedido');
  } catch (error) {
    throw new Error(error);
  }
};

export const getGeeList = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/gee`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return await res.json();
    throw new Error('Não foi possível obter a lista de GEE');
  } catch (error) {
    throw new Error(error);
  }
};

export const getModalityByInep = async (inep, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school_modality/school/${inep}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const { modality } = await res.json();
      const returnValues = [];
      modality.map((item) => {
        returnValues.push({ label: item.modality.name, value: item.modality.name });
      });
      return returnValues;
    }
    throw new Error('Não foi possível obter as modalidades desta escola');
  } catch (error) {
    throw new Error(error);
  }
};

export const downloadReport = async (inep, token, cycleId) => {
  try {
    const res = await fetch(`${VITE_API_URL}/download/report/${inep}/${cycleId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      res.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'melhores_fornecedores.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllGees = async (token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/gee`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível obter os GEEs');
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSchool = async (school, token) => {
  try {
    console.log(school);
    const res = await fetch(`${VITE_API_URL}/school/${school.inep}`, {
      method: 'PUT',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(school),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível atualizar a escola');
  } catch (error) {
    throw new Error(error);
  }
};

export const addModality = async (data, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school_modality/create`, {
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
    throw new Error('Não foi possível adicionar a modalidade');
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteModality = async (data, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/school_modality`, {
      method: 'DELETE',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Não foi possível remover a modalidade');
  } catch (error) {
    throw new Error(error);
  }
};
