import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { FilterMatchMode } from 'primereact/api';
import { fetchSchools, getAllGees } from '../../../api/schoolRequests';
import { getAllCities } from '../../../api/external/locationRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function NutritionistSchools() {
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [listCity, setListCity] = useState();
  const [selectedGEE, setSelectedGEE] = useState(null);
  const [listGEE, setListGEE] = useState();
  const [allSchools, setAllSchools] = useState([]);
  const userToken = authUser().token;
  const [listSchool, setListSchool] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState();
  const { showToast } = useToast();
  /*
    ======================
    Global filter handling
    ======================
  */

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

  /*
    =====================
    Initial data fetching
    =====================
  */

  useEffect(() => {
    initFilters();
    const fetchCities = async () => {
      const response = await getAllCities();
      response.push({ id: '-1', name: 'TODAS AS CIDADES' });
      await setListCity(response);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    initFilters();
    const fetchGEE = async () => {
      const res = await getAllGees(userToken);
      res.push({ id: '-1', name: 'TODAS AS GEES' });
      await setListGEE(res);
    };

    const getSchools = async () => {
      try {
        const res = await fetchSchools(userToken);
        await setListSchool(res);
        await setAllSchools(res);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de escolas');
      }
    };

    const fetchCities = async () => {
      try {
        const res = await getAllCities();
        res.push({ id: '-1', name: 'TODAS AS CIDADES' });
        await setListCity(res);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de cidades');
      }
    };

    fetchCities();
    getSchools();
    fetchGEE();
  }, []);

  const handleRowClick = (e) => {
    navigate(`/nutricionista/visualizar-escola/${e.data.inep}`);
  };

  /*
    ========================
    Dropdown filter handling
    ========================
  */

  const setSchoolByCity = async () => {
    const filteredByCity = allSchools.filter((school) => school.city === selectedCity.nome);
    if (selectedGEE && selectedGEE.id !== '-1') {
      const filteredSchools = filteredByCity.filter((school) => school.geeId === selectedGEE.id);
      setListSchool(filteredSchools);
    } else setListSchool(filteredByCity);
  };

  const fetchSchoolByGee = async () => {
    const filteredSchools = allSchools.filter((school) => school.geeId === selectedGEE.id);
    if (selectedCity && selectedCity.id !== '-1') {
      const filteredSchoolsByCity = filteredSchools.filter(
        (school) => school.city === selectedCity.nome,
      );
      setListSchool(filteredSchoolsByCity);
    } else setListSchool(filteredSchools);
  };

  // Watchdogs for selectedCity and selectedGEE

  useEffect(() => {
    if (selectedCity && selectedCity.id !== '-1') setSchoolByCity();
    else if (selectedGEE && selectedGEE.id !== '-1') fetchSchoolByGee();
    else setListSchool(allSchools);
  }, [selectedCity, userToken]);

  useEffect(() => {
    if (selectedGEE && selectedGEE.id !== '-1') fetchSchoolByGee();
    else if (selectedCity && selectedCity.id !== '-1') setSchoolByCity();
    else setListSchool(allSchools);
  }, [selectedGEE, userToken]);

  /*
    ======
    Render
    ======
  */

  return (
    <div className="flex flex-col items-center pt-12 gap-10 w-full">
      <div className="flex flex-col lg:flex-row w-10/12 justify-between gap-5">
        <div className="grow">
          <p className="text-blue font-black text-2xl">
            BUSCAR ESCOLAS
          </p>
        </div>
        {/* selecionar cidade div */}
        <div className="basis-2/3 flex justify-end">
          <div className="w-full flex gap-3 items-center flex-col md:flex-row justify-end">
            <Dropdown
              value={selectedGEE}
              onChange={(e) => setSelectedGEE(e.value)}
              options={listGEE}
              className="w-full lg:w-[150px]"
              placeholder="GEE"
              optionLabel="name"
              showClear
            />
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={listCity}
              filter
              placeholder="SELECIONAR CIDADE"
              optionLabel="nome"
              className="w-full lg:w-1/3"
              showClear
            />
          </div>
        </div>
      </div>
      <div className="p-input-icon-left w-10/12">
        <Search />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar"
          className="w-full border rounded-lg
              appearance-none h-11 mt-2 pl-[35px] border-[#BDC3C7]"
        />
      </div>
      <div className="w-10/12">
        <DataTable
          value={listSchool}
          globalFilter={globalFilterValue}
          scrollable
          dataKey="inep"
          scrollHeight="550px"
          tableStyle={{ width: '100%' }}
          selectionMode="single"
          className="divide-y"
          emptyMessage="Não há escolas cadastradas para está cidade"
          size="large"
          onRowSelect={handleRowClick}
          filters={filters}
          globalFilterFields={['name']}
        >
          <Column field="inep" header="INEP" />
          <Column
            key="inep"
            field="name"
            header="ESCOLA"
            sortable
            style={{ width: '90%' }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default NutritionistSchools;
