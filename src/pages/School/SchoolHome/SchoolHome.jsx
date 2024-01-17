/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { fetchCountOffersByInep } from '../../../api/schoolRequests';
import { decryptUser } from '../../../utils/encryptId';
import { getUserById } from '../../../api/userRequests';
import { useToast } from '../../../contexts/ToastContextProvider';
import { useCycle } from '../../../contexts/CycleContextProvider';

function SchoolHome() {
  const [offerData, setOfferData] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const authUser = useAuthUser();
  const { token } = authUser();
  const { cycle, id } = useCycle();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(decryptUser(), token);
        const inep = (userData.school_user[0].school_inep);
        const params = {
          inep,
          id,
        };
        const res = await fetchCountOffersByInep(params, token);
        setOfferData(parseInt(res, 10));
      } catch (error) {
        showToast('error', 'Erro', 'Não foi possível obter as ofertas');
      }
    };

    if (cycle) {
      setEndDate(cycle.date);
      setDays(cycle.daysToClose);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen mt-20 lg:mt-[25vh] gap-16">
      <div className="flex flex-col lg:flex-row w-screen md:w-2/5 justify-between h-fit gap-16">
        <div className="flex flex-col justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-midnight">
            SUA ESCOLA RECEBEU
          </h2>
          <h1 className="text-blue text-6xl font-extrabold">
            { offerData }
          </h1>
          <h2 className="text-3xl font-bold text-midnight">
            { (offerData && offerData === 1) ? 'OFERTA' : 'OFERTAS'}
          </h2>
        </div>
        <div className="border-l border-border hidden lg:block" />
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex items-center">
            <AccessAlarmIcon className="text-concrete mr-2" />
            <h3 className="text-xl text-concrete">OFERTAS ENCERRAM EM:</h3>
          </div>
          <div
            className="h-36 w-64 flex justify-center items-center rounded-xl"
          >
            <h1 className="text-5xl font-extrabold text-blue">
              { days + (days === 1 ? ' DIA' : ' DIAS')}
            </h1>
          </div>
          <span className="text-xl text-concrete">
            {
              endDate ? `DATA PREVISTA: ${endDate}` : ''
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default SchoolHome;
