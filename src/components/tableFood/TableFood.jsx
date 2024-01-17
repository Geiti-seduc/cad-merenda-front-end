/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useAuthUser } from 'react-auth-kit';
import pencil from '../../assets/images/Edit_fill.svg';

import './tableFood.scss';

import EditFood from '../editFood/editFood';

function TableFood() {
  const authUser = useAuthUser();
  const userToken = authUser().token;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState(null);

  const [products, setProducts] = useState([]);

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchFoods = async () => {
      const url = 'http://localhost:3001/food/';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados dos alimentos.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoods();
  }, []);

  // Função para criar o template do botão de edição na tabela
  const optionsBodyTemplate = (rowData) => (
    <div className="flex justify-center">
      <button onClick={() => openModal(rowData)}>
        <img
          // eslint-disable-next-line react/jsx-curly-spacing
          src={pencil}
          alt=""
          className="mx-2 drop-shadow-md"
        />
      </button>
    </div>
  );

  // Renderização da componente TableFood
  return (
    <div className="container-table w-full">
      <div className="card">
        {isModalOpen ? (
          <EditFood
            rowData={selectedRowData}
            closeModal={closeModal}
          />
        ) : null}

        {/* Componente InputText do PrimeReact com ícone de busca */}
        <div className="p-input-icon-left w-full">
          <i className="pi pi-search text-[#BDC3C7] pl-3 pt-1" />
          <InputText
            value={globalFilterValue}
            onChange={(e) => setGlobalFilterValue(e.target.value)}
            placeholder="Buscar"
            className="w-full border rounded-lg appearance-none h-11 mt-2 pl-[35px] border-[#BDC3C7]"
          />
        </div>

        {/* Componente DataTable do PrimeReact que exibe a tabela de alimentos */}
        <DataTable
          value={products}
          scrollable
          removableSort
          scrollHeight="550px"
          tableStyle={{ minWidth: '30rem' }}
          globalFilter={globalFilterValue}
          emptyMessage="Alimento não cadastrado"
        >
          {/* Coluna que exibe o nome do alimento */}
          <Column
            field="name"
            header="ITEM"
            sortable
            style={{ width: '25%' }}
          />

          {/* Coluna que exibe a descrição do alimento */}
          <Column
            field="description"
            header="DESCRIÇÃO"
            sortable
            style={{ Width: '55%', maxWidth: '300px' }}
            className="description-column"
          />

          {/* Coluna que exibe a unidade de medida do alimento */}
          <Column
            field="measure"
            header="UNIDADE"
            sortable
            style={{ width: '10%' }}
          />

          {/* Coluna que exibe o botão de edição */}
          <Column
            body={optionsBodyTemplate}
            style={{ width: '10%' }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default TableFood;
