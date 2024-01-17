/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { measures } from '../../../../utils/constants';

function Table({ data, setter: setValues, values = {} }) {
  const [localFrequency, setLocalFrequency] = useState({});
  const [localQuantity, setLocalQuantity] = useState({});

  useEffect(() => {
    if (values) {
      const initialFrequency = {};
      const initialQuantity = {};
      data.forEach((item) => {
        initialFrequency[item.id] = values.frequencyList[item.id] || '';
        initialQuantity[item.id] = values.quantityList[item.id] || '';
      });
      setLocalFrequency(initialFrequency);
      setLocalQuantity(initialQuantity);
    }
  }, [data]);

  const handleFrequencyChange = (e) => {
    const newFrequencyList = { ...values.frequencyList, [`${e.target.id}`]: e.target.value };
    setLocalFrequency(newFrequencyList);
    const newValues = { ...values, frequencyList: newFrequencyList };
    setValues(newValues);
  };

  const handleQuantityChange = (e) => {
    const newQuantityList = { ...values.quantityList, [`${e.target.id}`]: e.target.value };
    setLocalQuantity(newQuantityList);
    const newValues = { ...values, quantityList: newQuantityList };
    setValues(newValues);
  };

  const selectTemplate = (rowData) => (

    <Dropdown
      id={`${rowData.id}`}
      value={rowData.measure}
      options={measures}
      disabled
      style={{ width: '100px' }}
    />
  );

  const qtyTemplate = (rowData) => (
    <InputText
      keyfilter="pnum"
      style={{ width: '100px' }}
      id={`${rowData.id}`}
      value={localQuantity[rowData.id] || ''}
      onChange={handleQuantityChange}
    />
  );

  const frequencyTemplate = (rowData) => (
    <Dropdown
      id={`${rowData.id}`}
      style={{ width: '190px' }}
      showClear
      value={localFrequency[rowData.id]}
      options={[
        { label: 'DIÁRIO', value: 'Diário' },
        { label: 'SEMANAL', value: 'Semanal' },
        { label: 'QUINZENAL', value: 'Quinzenal' },
        { label: 'MENSAL', value: 'Mensal' },
      ]}
      onChange={(e) => {
        handleFrequencyChange(e);
      }}
    />
  );

  return (
    <div>
      <DataTable
        emptyMessage="Nenhum item selecionado."
        id="datatable"
        value={data}
        scrollable
        scrollHeight="550px"
      >
        <Column
          key="id"
          field="fullname"
          header="PRODUTO"
          style={{ width: '55%' }}
        />
        <Column
          key="id"
          field="frequency"
          header="PERIODICIDADE"
          body={frequencyTemplate}
        />
        <Column
          key="id"
          header="QTD"
          body={qtyTemplate}
        />
        <Column
          key="id"
          header="UNIDADE"
          className="w-28"
          body={selectTemplate}
        />
      </DataTable>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setter: PropTypes.func.isRequired,
  values: PropTypes.PropTypes.objectOf(PropTypes.any),
};

export default Table;
