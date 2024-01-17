import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAuthUser } from 'react-auth-kit';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { fetchSuppliers } from '../../../api/supplierRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function Suppliers() {
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [listSupplier, setListSupplier] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState();
  const {showToast} = useToast();
  
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
    try {
      fetchSuppliers(userToken).then((response) => {
        setListSupplier(response);
      });
    } catch (error) {
      showToast('error', 'ERRO', 'Não foi possível obter a lista de fornecedores');
    }
  }, []);

  const viewIcons = (supplier) => (
    <Button
      rounded
      text
      icon={(
        <VisibilityOutlinedIcon
          style={{ color: '#005CA9', pointerEvents: 'none' }}
        />
    )}
      onClick={() => navigate(`/admin/visualizar-fornecedor/${supplier.id}`)}
      size="small"
      id={`${supplier.id}view`}
    />
  );

  return (
    <div className="flex flex-col items-center pt-12 gap-10">
      <div className="px-2 w-full md:px-0 md:w-10/12">
        <p className="place-self-start text-blue font-black text-2xl">FORNECEDORES</p>
      </div>
      <span className="p-input-icon-left w-10/12 text-silver">
        <SearchIcon className="-translate-y-1" style={{ color: '#95A5A6' }} />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar"
          className="w-full border rounded-xl
          appearance-none h-11 pl-[35px] border-silver "
        />
      </span>
      <div className="w-10/12 text-md">
        <DataTable
          value={listSupplier}
          globalFilter={globalFilterValue}
          dataKey="id"
          scrollable
          scrollHeight="800px"
          tableStyle={{ width: '100%' }}
          className="text-[14px] text-[--midnight] divide-y"
          emptyMessage="Ainda não há fornecedores cadastrados"
          filters={filters}
          globalFilterFields={['cnpj', 'trade_name']}
        >
          <Column
            key="id"
            field="cnpj"
            header="CNPJ"
            style={{ width: '14rem' }}
          />
          <Column
            key="cnpj"
            header="RAZÃO SOCIAL"
            field="trade_name"
          />
          <Column
            header="AÇÕES"
            body={viewIcons}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default Suppliers;
