/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useAuthUser } from 'react-auth-kit';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { FilterMatchMode } from 'primereact/api';

import { Button } from 'primereact/button';
import EditFood from './EditFood';
import { fetchFood } from '../../../../api/foodRequests';

function TableFood({ showToast }) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [editVisible, setEditVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState();

  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setEditVisible(true);
  };

  const onGlobalFilterChange = (e) => {
    const { value } = e.target;
    const newFilters = { ...filters };

    newFilters.global.value = value;

    setFilters(newFilters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue('');
  };

  useEffect(() => {
    initFilters();
    const getFood = async () => {
      try {
        const data = await fetchFood(userToken);
        setProducts(data);
      } catch (error) {
        showToast('error', 'ERRO', 'Erro ao carregar os alimentos');
      }
    };

    window.addEventListener('storage', getFood);
    if (products.length === 0) getFood();
    return () => {
      window.removeEventListener('storage', getFood);
    };
  }, []);

  const optionsBodyTemplate = (rowData) => (
    <Button icon={<EditIcon />} text rounded onClick={() => openModal(rowData)} />
  );

  return (
    <div className="flex flex-col justify-center w-10/12 gap-10">
      <EditFood
        rowData={selectedRowData}
        visible={editVisible}
        setVisible={setEditVisible}
      />

      <div className="p-input-icon-left w-full ">
        <SearchIcon className="text-[#BDC3C7]" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar"
          className="w-full border rounded-lg appearance-none
          h-11 mt-2 pl-[35px] border-[#BDC3C7]"
        />
      </div>

      <DataTable
        value={products}
        scrollable
        removableSort
        scrollHeight="550px"
        tableStyle={{ minWidth: '30rem' }}
        globalFilter={globalFilterValue}
        emptyMessage="Alimento não cadastrado"
        filters={filters}
        globalFilterFields={['nmc', 'name', 'description', 'measure', 'category']}
      >
        <Column
          field="nmc"
          header="NMC"
          sortable
          style={{ width: '10%' }}
        />
        <Column
          field="name"
          header="ITEM"
          sortable
          style={{ width: '25%' }}
        />
        <Column
          field="description"
          header="DESCRIÇÃO"
          sortable
          style={{ Width: '50%', maxWidth: '300px' }}
          className="description-column"
        />

        <Column
          field="measure"
          header="UNIDADE"
          sortable
          style={{ width: '10%' }}
        />
        <Column
          field="category"
          header="CATEGORIA"
          sortable
          style={{ width: '10%' }}
        />
        <Column
          body={optionsBodyTemplate}
          style={{ width: '5%' }}
        />
      </DataTable>
    </div>
  );
}

export default TableFood;
