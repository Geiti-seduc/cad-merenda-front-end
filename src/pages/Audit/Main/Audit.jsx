import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Search } from '@mui/icons-material';
import { FilterMatchMode } from 'primereact/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Audit() {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState();

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
  }, []);

  return (
    <div className="mx-auto w-10/12 pt-12 gap-10 flex flex-col">
      <h1 className="text-blue text-2xl font-black">
        AUDITORIA
      </h1>
      <div className="w-full flex gap-5">
        <div className="flex gap-5">
          <Dropdown optionLabel="name" optionValue="id" options={[]} placeholder="Grupo de dados" />
          <Dropdown optionLabel="name" optionValue="id" options={[]} placeholder="Categoria" />
          <Dropdown optionLabel="name" optionValue="id" options={[]} placeholder="Subcategoria" />
        </div>
        <Button label="FILTRAR DADOS" icon={<FilterAltIcon className="mr-3" />} />
      </div>
      <div className="p-input-icon-left w-full">
        <Search />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar"
          className="w-full border rounded-lg
              appearance-none h-11 mt-2 pl-[35px] border-[#BDC3C7]"
        />
      </div>
      <div className="w-full">
        <div className="w-full border-t border-border" />
        <DataTable
          value={[]}
          globalFilter={globalFilterValue}
        >
          <Column field="name" header="Campo 1" />
          <Column field="email" header="Campo 2" />
          <Column field="role" header="Campo 3" />
          <Column field="ETC" header="Campo 4" />
          <Column field="school" header="AÇÕES" style={{ width: '10%' }} />
        </DataTable>
      </div>
    </div>
  );
}

export default Audit;
