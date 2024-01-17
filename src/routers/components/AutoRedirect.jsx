import { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function AutoRedirect() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      const role = localStorage.getItem('role') === 'admin-nutri' ? 'admin_nutri' : localStorage.getItem('role');

      const roleRoutes = {
        admin: '/admin',
        admin_nutri: '/admin',
        nutricionista: '/nutricionista',
        gestor: '/escola',
        fornecedor: '/fornecedor',
      };

      if (role in roleRoutes) {
        navigate(roleRoutes[role]);
      }
    }
  }, []);

  return null;
}

export default AutoRedirect;
