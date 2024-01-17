import React from 'react';
import { Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import { roles } from '../../utils/roles';
import PrivateRoute from '../components/PrivateRoute';
import BaseLayout from '../../layouts/BaseLayout';
import FoodTable from '../../pages/Nutritionist/FoodTable/FoodTable';
import RegisterSchool from '../../pages/Admin/RegisterSchool/RegisterSchool';
import NutritionistSchools from '../../pages/Nutritionist/NutritionistSchools/NutritionistSchools';
import NutriHome from '../../pages/Nutritionist/NutritionistHome/NutriHome';
import GeneralList from '../../pages/Nutritionist/GeneralList/GeneralList';
import ViewSchool from '../../pages/Admin/School/components/ViewSchool';

function NutriRoutes() {
  const routes = [
    {
      path: '/nutricionista/cadastrar-escola',
      component: RegisterSchool,
      roles: [roles.nutricionista, roles.admin_nutri],
    },
    {
      path: '/nutricionista/escolas',
      component: <NutritionistSchools />,
      roles: [roles.nutricionista, roles.admin_nutri],
    },
    {
      path: '/nutricionista/alimentos',
      component: <FoodTable />,
      roles: [roles.nutricionista, roles.admin_nutri],
    },
    {
      path: '/nutricionista',
      component: <NutriHome />,
      roles: [roles.nutricionista, roles.admin_nutri],
    },
    {
      path: '/nutricionista/pautas',
      component: <GeneralList />,
      roles: [roles.nutricionista, roles.admin_nutri],
    },
    {
      path: 'nutricionista/visualizar-escola/:schoolId',
      component: <ViewSchool />,
      roles: [roles.admin_nutri, roles.nutricionista],
    },
  ];

  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={(
        <RequireAuth loginPath="/login">
          <BaseLayout thisUserType="nutricionista">
            <PrivateRoute roles={route.roles}>
              {route.component}
            </PrivateRoute>
          </BaseLayout>
        </RequireAuth>
      )}
    />
  ));
}

export default NutriRoutes;
