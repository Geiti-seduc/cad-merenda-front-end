import React from 'react';
import { Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import BaseLayout from '../../layouts/BaseLayout';
import PrivateRoute from '../components/PrivateRoute';
import Audit from '../../pages/Audit/Main/Audit';
import { roles } from '../../utils/roles';

function AuditRoutes() {
  const routes = [
    {
      path: '/auditoria',
      component: <Audit />,
      roles: roles.admin,
    },
  ];

  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={(
        <RequireAuth loginPath="/login">
          <BaseLayout thisUserType="admin">
            <PrivateRoute roles={route.roles}>
              {route.component}
            </PrivateRoute>
          </BaseLayout>
        </RequireAuth>
      )}
    />
  ));
}

export default AuditRoutes;
