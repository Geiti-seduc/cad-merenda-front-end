import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAuthUser } from 'react-auth-kit';
import { Button } from 'primereact/button';
import PrintIcon from '@mui/icons-material/Print';
import { fetchOffersByInep, downloadReport } from '../../../api/schoolRequests';
import { decryptUser } from '../../../utils/encryptId';
import { getUserById } from '../../../api/userRequests';
import { useToast } from '../../../contexts/ToastContextProvider';
import { useCycle } from '../../../contexts/CycleContextProvider';

function BestSuppliers() {
  const authUser = useAuthUser();
  const { cycle, id } = useCycle();
  const userToken = authUser().token;
  const [offers, setOffers] = useState([]);
  const [schoolInep, setSchoolInep] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const cycleId = localStorage.getItem('cycle');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const userData = await getUserById(decryptUser(), userToken);
        const inep = (userData.school_user[0].school_inep);
        setSchoolInep(inep);
        const params = {
          inep,
          id,
        };
        const responseOffers = await fetchOffersByInep(params, userToken);
        console.log(responseOffers);
        setOffers(responseOffers);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };

    fetchSuppliers();
  }, []);

  const handleRowClick = (row) => {
    const offer = row.data;
    navigate(`/escola/oferta/${offer.supplier_id}`);
  };

  const handleReportClick = () => {
    downloadReport(schoolInep, userToken, cycleId);
  };

  return (
    <main className="w-full flex flex-col items-center justify-center pt-12 gap-14">
      <div className="flex w-10/12 justify-between">
        <h1 className="text-blue text-2xl font-extrabold">
          MELHORES FORNECEDORES
        </h1>
        <div className="flex items-center gap-4">
          <p>{cycle.date && `PRAZO FINAL: ${cycle.date}`}</p>
        </div>
      </div>
      <DataTable
        value={offers}
        scrollable
        scrollHeight="50vh"
        selectionMode="single"
        onRowSelect={handleRowClick}
        className="w-10/12"
        emptyMessage="Nenhuma oferta encontrada"
      >
        <Column
          field="supplier"
          header="FORNECEDOR"
          sortable
          style={{ width: '50%' }}
        />
        <Column
          field="total_price"
          header="ORÇAMENTO"
          sortable
          style={{ width: '50%' }}
          body={(rowData) => (rowData.total_price
            ? `R$ ${rowData.total_price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`
            : '')}
        />
      </DataTable>
      <Button
        icon={<PrintIcon className="mr-4" />}
        label="GERAR RELATÓRIO"
        rounded
        onClick={() => { handleReportClick(); }}
      />
    </main>
  );
}

export default BestSuppliers;
