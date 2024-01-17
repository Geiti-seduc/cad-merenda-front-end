/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './food.scss';
import './responsive.scss';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TableFood from '../../../components/tableFood/TableFood';

export default function Food() {
  return (
    <div className="food_page min-h-screen">
      <div className="wrapper w-[80vw] mx-auto">
        <SearchBar />
        <TableFood />
      </div>
    </div>
  );
}
