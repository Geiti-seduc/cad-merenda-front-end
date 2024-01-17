/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './styles/food.scss';
import './styles/responsive.scss';
import TableFood from './components/TableFood';
import BlueButton from '../../../components/Buttons/BlueButton';
import NewFood from './components/NewFood';

export default function FoodTable() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center pt-12 gap-10">
      <div className="flex w-10/12 justify-between">
        <h1 className="text-blue text-2xl font-black">
          ALIMENTOS
        </h1>
        <BlueButton onClick={() => { setVisible(true); }} />
      </div>
      <NewFood visible={visible} setVisible={setVisible} />
      <TableFood />
    </div>
  );
}
