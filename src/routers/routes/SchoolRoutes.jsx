import React from 'react';
import { Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import { roles } from '../../utils/roles';
import PrivateRoute from '../components/PrivateRoute';
import BaseLayout from '../../layouts/BaseLayout';
import SuppliersOffer from '../../pages/School/SuppliersOffer/SuppliersOffer';
import SchoolCycleHandler from '../../pages/School/Handler/SchoolCycleHandler';

function SchoolRoutes() {
  const routes = [
    {
      path: '/escola',
      component: <SchoolCycleHandler />,
      roles: [roles.gestor, roles.nutricionista],
    },
    {
      path: '/escola/oferta/:id',
      component: <SuppliersOffer />,
      roles: [roles.gestor, roles.nutricionista],
    },
  ];

  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={(
        <RequireAuth loginPath="/login">
          <BaseLayout thisUserType="school">
            <PrivateRoute roles={route.roles}>
              {route.component}
            </PrivateRoute>
          </BaseLayout>
        </RequireAuth>
        )}
    />
  ));
}

export default SchoolRoutes;
