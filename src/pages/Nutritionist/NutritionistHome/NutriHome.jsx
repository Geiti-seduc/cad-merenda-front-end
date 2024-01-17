/* eslint-disable no-param-reassign */
import {
  React, useState, useEffect,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { useAuthUser } from 'react-auth-kit';
import { Column } from 'primereact/column';
import SearchIcon from '@mui/icons-material/Search';
import { FilterMatchMode } from 'primereact/api';
import { fetchSchoolAccess } from '../../../api/schoolRequests';
import ProcessBlock from './components/ProcessBlock';
import DateBlock from './components/DateBlock';
import { useCycle } from '../../../contexts/CycleContextProvider';
import { useToast } from '../../../contexts/ToastContextProvider';

function NutriHome() {
  const authUser = useAuthUser();
  const { cycle } = useCycle();
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const userToken = authUser().token;
  const [schoolList, setSchoolList] = useState([]);
  const [filters, setFilters] = useState();
  const [endDate, setEndDate] = useState('');
  const [cycleMessage, setCycleMessage] = useState('Não há nenhum ciclo ativo no momento.');
  const { showToast } = useToast();

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
    const fetchData = async () => {
      try {
        const dataSchool = await fetchSchoolAccess(userToken);
        const updatedSchoolList = dataSchool.map((school) => {
          if (school.lastAccessDate === null) {
            return { ...school, lastAccessDate: 'Nunca' };
          }
          return school;
        });

        setSchoolList(updatedSchoolList);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de escolas');
      }
    };

    fetchData();

    if (cycle) {
      if (cycle.soon) {
        setCycleMessage('Ciclo iniciará em breve.');
      }
      if (!cycle.ended && !cycle.soon) {
        setEndDate(cycle.date);
      }
    }
  }, [cycle]);

  return (
    <main
      className="flex flex-col w-full items-center gap-12 lg:gap-0 pt-8 lg:pt-0"
    >
      {/*

          TOP

      */}

      {cycle && !(cycle.soon || cycle.ended) && (
        <div className="flex flex-col lg:flex-row basis-1/2 w-10/12 gap-12">
          <div className="flex flex-col justify-between w-full mt-3 lg:w-1/2 lg:p-5">
            <p
              className="font-black
              text-blue text-2xl whitespace-nowrap sm:mr-2"
            >
              CICLO ATUAL
            </p>
            <ProcessBlock cycleData={cycle.data} />
          </div>
          <div
            className="flex flex-col w-full lg:w-1/2 lg:p-5
        text-blue"
          >
            <DateBlock endDate={endDate} />
          </div>
        </div>
      )}

      {endDate === '' && (
        <div className="flex flex-col lg:flex-row basis-1/2 w-10/12 gap-12">
          <div className="flex flex-col justify-between w-full mt-3 lg:w-1/2 lg:p-5">
            <p
              className="font-medium
              text-blue text-2xl whitespace-nowrap sm:mr-2"
            >
              {cycleMessage}
            </p>
          </div>
        </div>

      )}

      {/*

        BOTTOM

      */}

      <div className="flex container-table w-10/12 flex-col grow lg:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center pb-3">
          <p
            className="flex items-center font-black text-blue
            text-center sm:text-start sm:text-2xl align-middle
            sm:whitespace-nowrap sm:mr-2"
          >
            MONITORAMENTO DE ACESSO
          </p>
          <p className="font-thin text-silver text-3xl hidden sm:block"> | </p>
          <p
            className="font-regular text-concrete
          text-start text-sm lg:text-base sm:ml-2"
          >
            Escolas há mais tempo sem acessar.
          </p>
        </div>
        <div className="p-input-icon-left w-full">
          <SearchIcon className="-translate-y-1" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar"
            className="w-full"
          />
        </div>
        <DataTable
          value={schoolList}
          className="w-full text-sm"
          sortField="lastAccessDate"
          sortOrder={-1}
          globalFilter={globalFilterValue}
          emptyMessage="Escola não cadastrada"
          filters={filters}
          globalFilterFields={['inep', 'name']}
        >
          <Column field="inep" header="INEP" />
          <Column field="name" header="Escola" />
          <Column field="lastAccessDate" header="Último Acesso" />

        </DataTable>
      </div>
    </main>
  );
}

export default NutriHome;
