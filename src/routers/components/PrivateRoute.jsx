import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthUser } from 'react-auth-kit';
import { useCycle } from '../../contexts/CycleContextProvider';
import Closed from '../../pages/Main/Closed/Closed';

function PrivateRoute({ children, roles, restricted = false }) {
  const { cycle } = useCycle();
  const navigate = useNavigate();
  const authUser = useAuthUser();

  const roleRoutes = {
    admin: '/admin',
    admin_nutri: '/nutricionista',
    nutricionista: '/nutricionista',
    gestor: '/escola',
    fornecedor: '/fornecedor',
  };

  useEffect(() => {
    if (roles && !roles.includes(authUser().role)) {
      navigate(roleRoutes[authUser().role]);
    }
  }, [navigate, roles, authUser]);

  if (authUser().role === 'fornecedor' && restricted) {
    if (!cycle || cycle.supplier !== 'OPEN') {
      return <Closed />;
    }
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
  roles: PropTypes.arrayOf(PropTypes.string),
  restricted: PropTypes.bool,
};

export default PrivateRoute;
