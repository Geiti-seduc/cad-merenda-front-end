import { criptografarEArmazenarUsuarioId } from './encryptId';

// eslint-disable-next-line
export async function getDataUser(navigate) {
  const navegar = () => {
    // eslint-disable-next-line max-len
    if ((localStorage.getItem('role').toLowerCase() === 'nutricionista') || (localStorage.getItem('role').toLowerCase() === 'admin')) {
      navigate('/nutricionista/home');
    } else if (localStorage.getItem('role').toLowerCase() === 'gestor') {
      navigate('/escola/home');
    } else if (localStorage.getItem('role').toLowerCase() === 'fornecedor') {
      navigate('/fornecedor/home');
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
        const response = await fetch(`http://localhost:3001/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        criptografarEArmazenarUsuarioId(data.id);
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
