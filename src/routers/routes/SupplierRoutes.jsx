import React from 'react';
import { Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import { roles } from '../../utils/roles';
import PrivateRoute from '../components/PrivateRoute';
import BaseLayout from '../../layouts/BaseLayout';
import SuppliersHome from '../../pages/Supplier/SuppliersHome/SuppliersHome';
import SuppliersProposal from '../../pages/Supplier/SuppliersProposal/SuppliersProposal';
import UpdateCertificates from '../../pages/Supplier/UpdateCertificates/UpdateCertificates';
import SupplierSchools from '../../pages/Supplier/SupplierSchools/SupplierSchools';
import Proposals from '../../pages/Supplier/Proposals/Proposals';

function SupplierRoutes() {
  const routes = [
    {
      path: '/fornecedor',
      component: <SuppliersHome />,
      roles: [roles.fornecedor],
    },
    {
      path: '/fornecedor/propostas/:inep',
      component: <SuppliersProposal />,
      roles: [roles.fornecedor],
      restricted: true,
    },
    {
      path: '/fornecedor/escolas',
      component: <SupplierSchools />,
      roles: [roles.fornecedor],
      restricted: true,

    },
    {
      path: '/fornecedor/certidoes',
      component: <UpdateCertificates />,
      roles: [roles.fornecedor],
    },
    {
      path: '/fornecedor/propostas',
      component: <Proposals />,
      roles: [roles.fornecedor],
      restricted: true,
    },
  ];

  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={(
        <RequireAuth loginPath="/login">
          <BaseLayout thisUserType="supplier">
            <PrivateRoute restricted={route.restricted} roles={route.roles}>
              {route.component}
            </PrivateRoute>
          </BaseLayout>
        </RequireAuth>
      )}
    />
  ));
}

export default SupplierRoutes;
