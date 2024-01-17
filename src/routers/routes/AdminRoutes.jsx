import React from 'react';
import { Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import { roles } from '../../utils/roles';
import BaseLayout from '../../layouts/BaseLayout';
import Home from '../../pages/Admin/Home/Home';
import Cycles from '../../pages/Admin/Cycles/Cycles';
import Suppliers from '../../pages/Admin/Suppliers/Suppliers';
import Users from '../../pages/Admin/Users/Users';
import ViewSupplier from '../../pages/Admin/Suppliers/components/ViewSupplier';
import PrivateRoute from '../components/PrivateRoute';
import ManageCertificates from '../../pages/Admin/Certificates/ManageCertificates';
import AdminSchools from '../../pages/Admin/School/AdminSchools';
import RegisterSchool from '../../pages/Admin/RegisterSchool/RegisterSchool';
import ViewSchool from '../../pages/Admin/School/components/ViewSchool';
import EditSchool from '../../pages/Admin/School/components/EditSchool';

function AdminRoutes() {
  const routes = [
    {
      path: '/admin',
      component: <Home />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/ciclo',
      component: <Cycles />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/fornecedores',
      component: <Suppliers />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/usuarios',
      component: <Users />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/visualizar-fornecedor/:supplierId',
      component: <ViewSupplier />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/certidoes',
      component: <ManageCertificates />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/escolas',
      component: <AdminSchools />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/cadastrar-escola',
      component: <RegisterSchool />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/visualizar-escola/:schoolId',
      component: <ViewSchool />,
      roles: [roles.admin, roles.admin_nutri],
    },
    {
      path: '/admin/editar-escola/:schoolId',
      component: <EditSchool />,
      roles: [roles.admin, roles.admin_nutri],
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

export default AdminRoutes;
