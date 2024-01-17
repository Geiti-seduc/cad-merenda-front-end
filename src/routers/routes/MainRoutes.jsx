import React from 'react';
import { Route } from 'react-router-dom';
import AutoRedirect from '../components/AutoRedirect';
import Login from '../../pages/Main/Login/Login';
import NewPassword from '../../pages/Main/NewPassword/NewPassword';
import PasswordRedefinition from '../../pages/Main/PasswordRedefinition/PasswordRedefinition';
import Landing from '../../pages/Main/Landing/Landing';
import Logout from '../../pages/Main/Logout/Logout';
import SignUp from '../../pages/Supplier/SignUp/SignUp';
import Error from '../../pages/Main/Error/Error';
import Closed from '../../pages/Main/Closed/Closed';

function MainRoutes() {
  const routes = [
    {
      path: '/',
      component: <Landing />,
      redirect: true,
    },
    {
      path: '/login',
      component: <Login />,
      redirect: true,
    },
    {
      path: '/cadastro',
      component: <SignUp />,
      redirect: true,
    },
    {
      path: '/esqueci-senha',
      component: <PasswordRedefinition />,
      redirect: true,
    },
    {
      path: '/nova-senha',
      component: <NewPassword />,
    },
    {
      path: '/logout',
      component: <Logout />,
    },
    {
      path: '/erro',
      component: <Error />,
    },
    {
      path: '/indisponivel',
      component: <Closed />,
    },
  ];
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
            route.redirect ? (
              <>
                <AutoRedirect />
                { route.component }
              </>
            ) : route.component
          }
    />
  ));
}

export default MainRoutes;
