import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button as PrimeButton } from 'primereact/button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthUser } from 'react-auth-kit';
import DeleteConfirmation from './components/DeleteConfirmation';
import NewCertificate from './components/NewCertificate';
import BlueButton from '../../../components/Buttons/BlueButton';
import { fetchCertificates } from '../../../api/certificateRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function ManageCertificates() {
  const authUser = useAuthUser();
  const [certificateList, setCertificateList] = useState([]);
  const [activeCertificate, setActiveCertificate] = useState({});
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const getCertificates = async () => {
      try {
        const data = await fetchCertificates(authUser().token);
        setCertificateList(data);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de certidões');
      }
    };
    getCertificates();
  }, []);

  const deleteIcons = (certificate) => (
    <PrimeButton
      rounded
      text
      icon={(
        <DeleteIcon
          style={{ color: '#005CA9', pointerEvents: 'none' }}
        />
    )}
      onClick={() => { setVisibleDelete(true); setActiveCertificate(certificate); }}
      size="small"
      id={`${certificate.name}del`}
    />
  );
  return (
    <div className="flex flex-col items-center w-full pt-12 gap-10">
      <DeleteConfirmation
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        certificate={activeCertificate}
      />
      <NewCertificate
        visible={visibleCreate}
        setVisible={setVisibleCreate}
      />
      <div className="flex w-10/12 justify-between">
        <p className="text-blue font-black text-2xl">CERTIDÕES</p>
        <BlueButton onClick={() => setVisibleCreate(true)} />
      </div>
      <div className="w-10/12">
        <DataTable
          value={certificateList}
          dataKey="id"
          scrollable
          scrollHeight="700px"
          tableStyle={{ width: '100%' }}
          className="text-[14px] text-[--midnight] divide-y"
          emptyMessage="Ainda não há certidões cadastradas"
        >
          <Column
            key="name"
            field="name"
            header="NOME DA CERTIDÃO"
          />
          <Column
            header="AÇÕES"
            body={deleteIcons}
            style={{ width: '10%' }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default ManageCertificates;
