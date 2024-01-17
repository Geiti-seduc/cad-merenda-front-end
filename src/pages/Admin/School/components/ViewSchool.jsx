import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Edit } from '@mui/icons-material';
import Info from './Info';
import { getGeeById, getSchoolById } from '../../../../api/schoolRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function ViewSchool() {
  const location = useLocation();
  const schoolId = location.pathname.split('/')[3];
  const main = location.pathname.split('/')[1];
  const [school, setSchool] = useState({});
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { showToast } = useToast();
  const newUser = useRef(false);
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('new');
  const update = queryParams.get('update');
  const navigate = useNavigate();

  const items = [
    {
      label: 'Escolas',
      command: () => { navigate(`/${main}/escolas`); },
    },
    { label: 'Escola' },
  ];

  const home = { label: 'Página Inicial', command: () => { navigate(`/${main}`); } };

  useEffect(() => {
    const getSchool = async (id) => {
      try {
        const schoolData = await getSchoolById(id, userToken);
        const gee = await getGeeById(schoolData.geeId, userToken);
        const schoolWithGee = { ...schoolData, gee: gee.name };
        setSchool(schoolWithGee);
      } catch (error) {
        showToast('error', 'ERRO', error.message);
      }
    };
    setTimeout(() => {
      getSchool(schoolId);
    }, 1000);
  }, []);

  useEffect(() => {
    if (success && !newUser.current) {
      showToast('success', 'Feito!', 'Escola cadastrada com sucesso');
      newUser.current = true;
    }
    if (update && !newUser.current) {
      showToast('success', 'Feito!', 'Escola atualizada com sucesso');
      newUser.current = true;
    }
  }, [success]);

  return (
    <div className="w-full flex flex-col items-center pt-12">
      <div className="w-10/12 md:px-0 md:w-4/5 pb-5 lg:pb-0">
        <div className="w-full mb-6">
          <BreadCrumb model={items} home={home} />
        </div>
        <div className="flex justify-between">
          <p className="place-self-start text-blue font-black text-2xl">
            VISUALIZAR ESCOLA
          </p>
          <Button
            label="EDITAR"
            icon={<Edit className="mr-2" fontSize="small" />}
            size="small"
            onClick={
            () => navigate(`/${main}/editar-escola/${schoolId}`)
          }
          />
        </div>
      </div>
      <Info school={school} address={school.Address} />
    </div>
  );
}

export default ViewSchool;
