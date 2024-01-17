import {
  React, useEffect, useState,
} from 'react';
import { ArrowForward } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import Fields from './components/Fields';
import School from '../../../utils/models/School';
import { getGeeList } from '../../../api/schoolRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function RegisterSchool() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [geeList, setGeeList] = useState([]);
  const [selectedGee, setSelectedGee] = useState();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchGee = async () => {
      try {
        const res = await getGeeList(userToken);
        setGeeList(res);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };
    fetchGee();
  }, []);

  const handleClick = async () => {
    let school = null;
    try {
      school = new School();
      const inep = school.getInep();
      navigate(`/admin/visualizar-escola/${inep}?new=true`);
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }

    school.setGeeId(selectedGee.id);
    if (selectedModalities.length === 0) {
      showToast('error', 'Erro', 'Selecione ao menos uma modalidade');
      return;
    }
    school.setModalities(selectedModalities);
    try {
      await school.POST(userToken);
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }
  };

  return (
    <div
      className="h-fit md:h-screen lg:h-fit flex gap-10 flex-col
      mt-0 text-md md:text-sm pt-12 gap-6"
    >
      <div
        className="flex flex-col justify-center gap-6 content-center
        h-fit w-full rounded-xl self-center xl:w-[80%]"
      >

        <div className="flex justify-between">
          <button
            type="button"
            className="text-concrete flex items-center gap-2 text-xl pt-[1px] pl-2 font-bold"
            onClick={() => { navigate('/admin/escolas'); }}
          >
            <ReplyIcon />
            VOLTAR
          </button>
          <div className="flex justify-end">
            <span className="text-blue font-black text-2xl">DADOS GERAIS</span>
            <div className="pl-3"><p className="bg-concrete h-8 w-[1px]" /></div>
            <span className="text-concrete text-xl pt-[1px] pl-2">
              CADASTRAR ESCOLA
            </span>
          </div>
        </div>
        <Fields
          modalitySetter={setSelectedModalities}
          modalityGetter={selectedModalities}
          geeList={geeList}
          geeFunc={setSelectedGee}
        />
        <div className="mt-3 md:mt-5 md:mb-5 flex justify-center">
          <Button
            label="CADASTRAR"
            icon={<ArrowForward className="p p-button-icon-right" />}
            onClick={handleClick}
            iconPos="right"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;
