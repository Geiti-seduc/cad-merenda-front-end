import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { FilterMatchMode } from 'primereact/api';
import { getOffersBySupplier } from '../../../api/foodListRequests';
import { decryptUser } from '../../../utils/encryptId';
import { formatPrice } from '../../../utils/formatPrice';
import { useToast } from '../../../contexts/ToastContextProvider';

function Proposals() {
  const authUser = useAuthUser();
  const { showToast } = useToast();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const userToken = authUser().token;
  const [listSchool, setListSchool] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState();
  const cycleId = localStorage.getItem('cycle');

  const onGlobalFilterChange = (e) => {
    const { value } = e.target;
    const newFilter = { ...filters };

    newFilter.global.value = value;

    setFilters(newFilter);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue('');
  };

  useEffect(() => {
    const getAllSchools = async () => {
      try {
        const response = await getOffersBySupplier(decryptUser(), userToken, cycleId);
        console.log(response);
        setListSchool(response);
      } catch (error) {
        showToast('error', 'Erro', 'Não foi possível carregar as propostas.');
      }
    };
    initFilters();
    getAllSchools();
  }, []);

  const templatePrice = (rowData) => (
    <div className="text-start">
      {formatPrice(rowData.total_price)}
    </div>
  );

  return (
    <div className="flex flex-col items-center pt-12 gap-6 w-full">
      <div className="flex flex-col lg:flex-row w-10/12">
        <p className="place-self-start text-blue font-black text-2xl">
          PROPOSTAS
        </p>
      </div>
      <div className="p-input-icon-left w-10/12">
        <Search />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar"
          className="w-full border rounded-lg appearance-none h-11 mt-2 pl-[35px] border-concrete"
        />
      </div>
      <div className="w-10/12">
        <DataTable
          value={listSchool}
          globalFilter={globalFilterValue}
          onRowClick={(e) => navigate(`/fornecedor/propostas/${e.data.school.inep}`)}
          scrollable
          dataKey="inep"
          scrollHeight="550px"
          tableStyle={{ width: '100%' }}
          selectionMode="single"
          className="divide-y"
          emptyMessage="Não há propostas disponíveis"
          size="large"
          filters={filters}
          globalFilterFields={['name']}
        >
          <Column
            key="id"
            field="school.name"
            header="ESCOLA"
            sortable
          />
          <Column
            key="id"
            field="total_price"
            header="TOTAL"
            sortable
            body={templatePrice}
            style={{ width: '15%' }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default Proposals;
