import { encryptUser } from './encryptId';
const { VITE_API_URL } = import.meta.env;

// eslint-disable-next-line
export async function getUserData(navigate) {
  const navegar = () => {
    // eslint-disable-next-line max-len
    if ((localStorage.getItem('role').toLowerCase() === 'nutricionista')) {
      navigate('/nutricionista');
    } else if ((localStorage.getItem('role').toLowerCase() === 'admin')) {
      navigate('/admin');
    } else if ((localStorage.getItem('role').toLowerCase() === 'admin-nutri')) {
      navigate('/nutricionista');
    } else if (localStorage.getItem('role').toLowerCase() === 'gestor') {
      navigate('/escola');
    } else if (localStorage.getItem('role').toLowerCase() === 'fornecedor') {
      navigate('/fornecedor');
    }
  };
  const waitForCookie = () => new Promise((resolve) => {
    const checkCookie = () => {
      const { cookie } = document;
      if (cookie.includes('_auth=')) {
        resolve(cookie);
      } else { setTimeout(checkCookie, 100); }
    }; checkCookie();
  });
  try {
    const cookie = await waitForCookie();
    const fields = cookie.split(';');
    let token;
    for (let i = 0; i < fields.length; i += 1) {
      const aux = fields[i].replace(' ', '');
      if (aux.startsWith('_auth=')) {
        token = aux.replace('_auth=', '');
        break;
      }
    }
    const fetchToken = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/token/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        encryptUser(data.id);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        navegar();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchToken();
  } catch (error) {
    console.error('Error:', error);
  }
}
