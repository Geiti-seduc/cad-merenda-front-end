import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthUser } from 'react-auth-kit';
import { Edit } from '@mui/icons-material';
import { Button } from 'primereact/button';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';
import BlueButton from '../../../components/Buttons/BlueButton';
import { fetchUsers } from '../../../api/userRequests';
import { fetchSchools } from '../../../api/schoolRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function Users() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [filters, setFilters] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [targetUser, setTargetUser] = useState({});
  const [emptyMessage, setEmptyMessage] = useState('Carregando...');
  const { showToast } = useToast();
  const [schoolList, setSchoolList] = useState([]);

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
    const getUsers = async () => {
      try {
        const response = await fetchUsers(userToken);
        setUserList(response);
        setEmptyMessage('Nenhum usuário encontrado');
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de usuários');
      }
    };

    const getSchools = async () => {
      try {
        const response = await fetchSchools(userToken);
        if (response) setSchoolList(response);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de escolas');
      }
    };

    getUsers();
    getSchools();
  }, [userToken]);

  const parseRole = (user) => {
    switch (user.role) {
      case 'admin-nutri':
        return {
          admin: true,
          nutri: true,
          school: false,
          supplier: false,
        };
      case 'admin':
        return {
          admin: true,
          nutri: false,
          school: false,
          supplier: false,
        };
      case 'nutricionista':
        return {
          admin: false,
          nutri: true,
          school: false,
          supplier: false,
        };
      case 'gestor':
        return {
          admin: false,
          nutri: false,
          school: true,
          supplier: false,
        };
      case 'fornecedor':
        return {
          admin: false,
          nutri: false,
          school: false,
          supplier: true,
        };
      default:
        return {
          admin: false,
          nutri: false,
          school: false,
          supplier: false,
        };
    }
  };

  const checkAdminTemplate = (user) => (
    <Checkbox
      inputId={user.id}
      value="admin"
      readOnly
      disabled
      checked={parseRole(user).admin}
    />
  );

  const checkNutriTemplate = (user) => (
    <Checkbox
      inputId={user.id}
      value="admin"
      readOnly
      disabled
      checked={parseRole(user).nutri}
    />
  );

  const checkSchoolTemplate = (user) => (
    <Checkbox
      inputId={user.id}
      value="gestor"
      readOnly
      disabled
      checked={parseRole(user).school}
    />
  );

  const checkSupplierTemplate = (user) => (
    <Checkbox
      inputId={user.id}
      value="fornecedor"
      readOnly
      disabled
      checked={parseRole(user).supplier}
    />
  );

  const editIcons = (user) => (
    <Button
      rounded
      text
      icon={<Edit style={{ color: '#005CA9', pointerEvents: 'none' }} />}
      size="small"
      id={`${user.id}edit`}
      onClick={() => {
        setTargetUser(user);
        setVisibleEdit(true);
      }}
    />
  );

  return (
    <div className="flex mx-auto w-full flex-col items-center pt-12 gap-10">
      <EditUser
        visible={visibleEdit}
        setVisible={setVisibleEdit}
        user={targetUser}
        schoolList={schoolList}
      />
      <CreateUser
        visible={visibleCreate}
        schoolList={schoolList}
        setVisible={setVisibleCreate}
      />

      <div className="flex w-10/12 justify-between">
        <p className="text-blue font-black text-2xl">USUÁRIOS</p>
        <BlueButton onClick={() => setVisibleCreate(true)} />
      </div>
      <span className="p-input-icon-left w-10/12 text-silver">
        <SearchIcon
          className="-translate-y-1"
          style={{ color: '#95A5A6' }}
        />
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
          value={userList}
          globalFilter={globalFilterValue}
          sortField="name"
          sortOrder={1}
          dataKey="id"
          scrollable
          scrollHeight="650px"
          tableStyle={{ width: '100%' }}
          className="text-[14px] text-[--midnight] divide-y user-table"
          emptyMessage={emptyMessage}
          filters={filters}
          globalFilterFields={['name', 'id', 'email']}
        >
          <Column
            field="id"
            header="CPF"
            style={{ width: '14rem' }}
            headerTooltip="CPF do usuário"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="NOME"
            sortable
            field="name"
            headerTooltip="Nome do usuário"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="EMAIL"
            field="email"
            sortable
            headerTooltip="Email do usuário"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="G"
            body={checkSchoolTemplate}
            headerTooltip="Gestor de escola"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="F"
            body={checkSupplierTemplate}
            headerTooltip="Fornecedor"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="NUTRI"
            body={checkNutriTemplate}
            headerTooltip="Nutricionista"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="ADM"
            body={checkAdminTemplate}
            headerTooltip="Administrador"
            headerTooltipOptions={{ position: 'mouse' }}
          />
          <Column
            header="AÇÕES"
            style={{ width: '8rem' }}
            body={editIcons}
            headerTooltip="Editar usuário"
            headerTooltipOptions={{ position: 'mouse' }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default Users;
