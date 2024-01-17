import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useCycle } from '../../../contexts/CycleContextProvider';
import { getUserById } from '../../../api/userRequests';
import { decryptUser } from '../../../utils/encryptId';
import { useToast } from '../../../contexts/ToastContextProvider';
import { fetchCountOffersByInep } from '../../../api/schoolRequests';

function SoonToView() {
  const { id } = useCycle();
  const [offers, setOffers] = useState(0);
  const authUser = useAuthUser();
  const { showToast } = useToast();
  const fetchData = async () => {
    try {
      const userData = await getUserById(decryptUser(), authUser().token);
      const inep = (userData.school_user[0].school_inep);
      const params = {
        inep,
        id,
      };
      const res = await fetchCountOffersByInep(params, authUser().token);
      setOffers(parseInt(res, 10));
    } catch (error) {
      showToast('error', 'Erro', 'Não foi possível obter as ofertas');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[80vh] gap-16">
      <h2 className="text-2xl font-bold text-midnight">
        SUA ESCOLA RECEBEU
      </h2>
      <h1 className="text-blue text-6xl font-extrabold">
        { offers }
      </h1>
      <h2 className="text-3xl font-bold text-midnight">
        { (offers && offers === 1) ? 'OFERTA' : 'OFERTAS'}
      </h2>
      <div className="border-b border-border w-2/3 lg:w-1/6" />
      <div className="w-2/3 lg:w-1/6">
        <p className="text-blue text-center font-semibold text-lg">A VISUALIZAÇÃO DAS PROPOSTAS INICIARÁ EM BREVE</p>
      </div>
    </div>
  );
}

export default SoonToView;
