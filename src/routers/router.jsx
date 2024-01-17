import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/Main/NotFound/NotFound';

import NutriRoutes from './routes/NutriRoutes';
import AdminRoutes from './routes/AdminRoutes';
import SupplierRoutes from './routes/SupplierRoutes';
import SchoolRoutes from './routes/SchoolRoutes';
import MainRoutes from './routes/MainRoutes';

export default function Router() {
  return (
    <Routes>
      { NutriRoutes() }
      { SupplierRoutes() }
      { SchoolRoutes() }
      { AdminRoutes() }
      { MainRoutes() }
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
