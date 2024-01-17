/* eslint-disable max-len */
import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;


const message = 'Não foi possível obter as certidões.';

export const fetchCertificates = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/required-certificate/`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
      },
    });
    if (!res.ok) {
      throw new Error(message);
    }
    return await res.json();
  } catch (error) {
    throw new Error('Não foi possível carregar as certidões');
  }
};

export const getExpirationCertificates = async (id, token) => {
  try {
    const res = await fetch(
      `${VITE_API_URL}/required-certificate/expiration/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': application,
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.ok) {
      return await res.json();
    }
    throw new Error(message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createRequiredCertificate = async (certificate, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/required-certificate/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(certificate),
    });
    if (!res.ok) throw new Error('Não foi possível criar a certidão');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRequiredCertificate = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/required-certificate/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Não foi possível remover a certidão');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCertificatesBySupplier = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/certificate/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(message);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCertificate = async (certificate, token) => {
  try {
    const formData = new FormData();
    formData.append('pdf', certificate.file);
    formData.append('name', certificate.name);
    formData.append('expiration', certificate.expiration);
    formData.append('requiredId', certificate.requiredId);
    const res = await fetch(
      `${VITE_API_URL}/upload/update/${certificate.requiredId}/${certificate.name}/${certificate.userId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCertificate = async (certificate) => {
  try {
    const formData = new FormData();
    formData.append('pdf', certificate.file);
    formData.append('name', certificate.name);
    formData.append('expiration', certificate.expiration);
    formData.append('userId', certificate.userId);
    const res = await fetch(
      `${VITE_API_URL}/upload/create/${certificate.name}/${certificate.userId}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const data = await res.json();
    if (!data) throw new Error('Não foi possível criar a certidão');
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const downloadCertificate = async (id, token) => {
  try {
    const res = await fetch(`${VITE_API_URL}/download/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Não foi possível baixar a certidão');
    const data = await res.blob();
    if (!data) throw new Error('Não foi possível baixar a certidão');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
