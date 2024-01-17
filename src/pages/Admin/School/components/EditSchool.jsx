import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Cancel } from '@mui/icons-material';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import {
  getGeeById, getGeeList, getSchoolById,
} from '../../../../api/schoolRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';
import EditFields from './EditFields';
import SaveButton from '../../../../components/Buttons/SaveButton';
import School from '../../../../utils/models/School';

function EditSchool() {
  const location = useLocation();
  const schoolId = location.pathname.split('/')[3];
  const main = location.pathname.split('/')[1];
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedGee, setSelectedGee] = useState(null);
  const [geeList, setGeeList] = useState([]);
  const [schoolData, setSchoolData] = useState({});
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { showToast } = useToast();
  const newUser = useRef(false);
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('new');
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
        const schoolRes = await getSchoolById(id, userToken);
        const gee = await getGeeById(schoolRes.geeId, userToken);
        const schoolWithGee = { ...schoolRes, gee: gee.name };
        setSchoolData(schoolWithGee);
        const modalities = [];
        schoolRes.modalities.forEach((mod) => {
          modalities.push(mod.modality.name);
        });
        setSelectedGee(schoolRes.geeId);
        setSelectedModalities(modalities);
      } catch (error) {
        showToast('error', 'ERRO', error.message);
      }
    };

    const fetchGee = async () => {
      try {
        const res = await getGeeList(userToken);
        setGeeList(res);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };
    setTimeout(() => {
      getSchool(schoolId);
      fetchGee();
    }, 1000);
  }, []);

  useEffect(() => {
    if (success && !newUser.current) {
      showToast('success', 'Feito!', 'Escola atualizada com sucesso');
      newUser.current = true;
    }
  }, [success]);

  const handleClick = async () => {
    if (!selectedModalities || selectedModalities.length === 0) {
      showToast('error', 'ERRO', 'Selecione ao menos uma modalidade');
      return;
    }

    let school = null;

    try {
      school = new School();
      school.setAddressId(schoolData.Address.id);
      school.setGeeId(selectedGee);
      school.setModalities(selectedModalities);
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }

    try {
      await school.PUT(schoolData.modalities, userToken);
      const inep = school.getInep();
      navigate(`/admin/visualizar-escola/${inep}?update=true`);
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }
  };

  const accept = () => {
    navigate(`/${main}/visualizar-escola/${schoolId}`);
  };

  const confirmCancel = () => {
    confirmDialog({
      message: 'Suas alterações serão descartadas. Deseja cancelar?',
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
      header: 'ATENÇÃO',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  return (
    <div className="w-full flex flex-col items-center pt-12">
      <div className="w-10/12 md:px-0 md:w-4/5 pb-5 lg:pb-0">
        <div className="w-full mb-6">
          <BreadCrumb model={items} home={home} />
        </div>
        <div className="flex justify-between items-center">
          <p className="place-self-start text-blue font-black text-2xl">
            EDITAR ESCOLA
          </p>
          <div className="flex gap-3">
            <Button
              label="CANCELAR"
              severity="info"
              size="small"
              icon={<Cancel className="mr-2" fontSize="small" />}
              onClick={confirmCancel}
            />
            <SaveButton label="SALVAR" small onClick={handleClick} />
          </div>
        </div>
      </div>
      <div className="w-4/5">
        <EditFields
          data={schoolData}
          modalitySetter={setSelectedModalities}
          modalityGetter={selectedModalities}
          geeList={geeList}
          geeFunc={setSelectedGee}
        />
      </div>
    </div>
  );
}

export default EditSchool;
