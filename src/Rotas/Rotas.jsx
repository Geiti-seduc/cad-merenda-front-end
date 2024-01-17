/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout'; 
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { ROLES } from './roles';

const PrivateRoute = ({ Component, roles, ...rest }) => {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userRole = authUser().role;

  if (!roles.includes(userRole)) {
    if(userRole === ROLES.nutricionista){
      return <Navigate to="/nutricionista/home" />;
    }else if(userRole === ROLES.admin){
      return <Navigate to="/nutricionista/home" />;
    }else if(userRole === ROLES.fornecedor){
      return <Navigate to="/fornecedor/home" />;
    }else if(userRole === ROLES.gestor){
      return <Navigate to="/escola/home" />;
    }
  }

  return <Component />;
};

import SupliersOffer from '../pages/School/SuppliersOffer/SupliersOffer';

// /* MAIN */

import Login from '../pages/Main/login/Login';
// import NewPassword from '../pages/Main/newpassword/NewPassword';
// import PasswordRedef from '../pages/Main/password-redefinition/PasswordRedef';
// import PasswordCode from '../pages/Main/password-redefition-code/PasswordCode';
import FirstPage from '../pages/Main/firstpage/FirstPage';

// /* NUTRITIONIST */

import Food from '../pages/Nutritionist/food/Food';
import RegisterSchool from '../pages/Nutritionist/RegisterSchool/RegisterSchool';
import NutriHome from '../pages/Nutritionist/NutritionistHome/NutriHome';
import Purchase from '../pages/Nutritionist/NutritionistPurchase/Purchase';
// /* SCHOOL */

import SchoolHome from '../pages/School/SchoolHome/SchoolHome';
import BestSuppliers from '../pages/School/BestSuppliers/BestSuppliers';
import SearchSchool from '../pages/School/SearchSchool/searchschool';

// /* SUPPLIER */

import SuppliersHome from '../pages/Supplier/SuppliersHome/SuppliersHome';
import SuppliersProposal from '../pages/Supplier/SuppliersProposal/SuppliersProposal';
import CertificatesUpdate from '../pages/Supplier/certificatesUpdate/CertificatesUpdate';
import Logout from '../pages/Main/Logout/Logout';
import SignUp from '../pages/Supplier/SignUp/SignUp';
// import Certificates from './pages/Supplier/Certificates/Certificates';
// import DefPassword from './pages/Supplier/DefPassword/DefPassword';

export default function Rotas() {
  return (
    <Routes>
      <Route
        path="/"
        element={<FirstPage />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<Logout />}
      />
      <Route
        path="/escola/home"
        element={
          <Layout thisUserType={'school'}> 
            <PrivateRoute
              Component={ SchoolHome }
              roles={[ROLES.gestor, ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />
      {/* <Route
        path="/password"
        element={<PrivateRoute Component={NewPassword} />}
      /> */}
      {/* <Route
        path="/password/1"
        Component={PasswordRedef}
      />
      <Route
        path="/password/2"
        Component={PasswordCode}
      /> */}

      <Route
        path="/nutricionista/cadastrar-escola"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={RegisterSchool}
              roles={[ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />
      <Route
        path="/nutricionista/alimentos"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={Food}
              roles={[ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />
      <Route
        path="/nutricionista/home"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={NutriHome}
              roles={[ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />

    <Route
        path="/escola/melhores-fornecedores"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={BestSuppliers}
              roles={[ROLES.gestor, ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />

      <Route
        path="/nutricionista/escolas"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={SearchSchool}
              roles={[ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />
      <Route 
        path="/nutricionista/pautas"
        element={
          <Layout thisUserType={'nutricionista'}>
            <PrivateRoute
              Component={Purchase}
              roles={[ROLES.nutricionista, ROLES.admin]}
            />
          </Layout>
        }
      />
      
      <Route
        path="/fornecedor/home"
        element={
          <Layout thisUserType={'supplier'}> 
            <PrivateRoute
              Component={SuppliersHome}
              roles={[ROLES.fornecedor, ROLES.admin]}
            />
          </Layout>
        }
      />

      <Route
        path="/fornecedor/propostas"
        element={
          <Layout thisUserType={'supplier'}> 
            <PrivateRoute
              Component={SuppliersProposal}
              roles={[ROLES.fornecedor, ROLES.admin]}
            />
          </Layout>
        }
      />

    <Route
        path="/fornecedor/certidoes"
        element={
          <Layout thisUserType={'supplier'}> 
            <PrivateRoute
              Component={CertificatesUpdate}
              roles={[ROLES.fornecedor, ROLES.admin]}
            />
          </Layout>
        }
      />

      <Route
        path="/cadastro"
        element={<SignUp />}
      />
      {/* <Route path="/cadastro/certidoes" Component={ Certificates } /> */}
      {/* <Route path="/cadastro/senha" Component={ DefPassword } /> */}
      <Route
        path="/escola/oferta"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={SupliersOffer}
              roles={[ROLES.nutricionista, ROLES.gestor, ROLES.admin]}
            />
          </Layout>
        }
      />
      <Route
        path="/nutricionista/oferta"
        element={
          <Layout thisUserType={'nutricionista'}> 
            <PrivateRoute
              Component={SupliersOffer}
              roles={[ROLES.nutricionista, ROLES.gestor, ROLES.admin]}
            />
          </Layout>
        }
      />
    </Routes>
  );
}
