import {
  React, useState, useEffect,
} from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import Stepper from './components/Stepper';
import Table from './components/Table';
import CreateCycleDialog from './components/CreateCycleDialog';
import EditCycleDialog from './components/EditCycleDialog';
import {
  getLatestCycle,
  postCycles,
  updateCycles,
} from '../../../api/cyclesRequests';
import { cycleParser } from '../../../utils/cycleUtils';
import { useToast } from '../../../contexts/ToastContextProvider';

function Cycles() {
  const authUser = useAuthUser();
  const [disableButtons, setDisableButtons] = useState(false);
  const [id, setId] = useState(null);
  const userToken = authUser().token;
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const { showToast } = useToast();
  const [cycleData, setCycleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestCycle(userToken);
        setId(data.id);
        const parsedCycle = cycleParser(data);
        setCycleData(parsedCycle);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de ciclos');
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (data) => {
    try {
      const res = await postCycles(data, userToken);
      if (res) {
        showToast('success', 'Pronto!', 'Novo ciclo criado com sucesso');
        localStorage.setItem('cycle', res.id);
        setId(res.id);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showToast('error', 'ERRO', 'Não foi possível criar um novo ciclo');
    }
  };

  const accept = () => {
    setEditVisible(true);
  };

  const confirmEdit = () => {
    confirmDialog({
      message:
  <p className="text-justify w-[400px]">
    <p className="font-bold text-center text-lg text-blue">O ciclo está em andamento.</p>
    <br />
    Alterações nas datas podem prejudicar alguns usuários
    e ocasionar perda de informações não salvas.
    {' '}
    <b className="text-blue">Deseja continuar?</b>
    <br />
    <br />
  </p>,
      header: 'ATENÇÃO',
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  const saveChanges = async (data) => {
    setDisableButtons(true);

    const body = {
      id,
      ...data,
    };

    try {
      const res = await updateCycles(body, userToken);
      if (res) {
        showToast('success', 'Pronto!', 'Alterações salvas com sucesso');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showToast('error', 'ERRO', 'Não foi possível salvar as alterações.');
    }
  };

  return (
    <div
      className="pt-12 flex
      flex-col items-center gap-20"
    >
      <div className="px-2 w-full md:px-0 md:w-10/12">
        <p className="place-self-start text-blue font-black text-2xl">CICLOS</p>
      </div>
      {cycleData && !cycleData.ended && (
      <div className="flex items-center justify-center px-2 w-full md:px-0 md:w-4/5">
        <Stepper dates={cycleData.data} />
      </div>
      )}
      {cycleData && cycleData.ended && (
      <p className="text-4xl font-medium text-blue">
        Não há ciclo ativo no momento.
      </p>
      )}
      <div className="flex gap-10">
        <Button
          label="CRIAR NOVO CICLO"
          disabled={disableButtons}
          outlined
          onClick={() => {
            setCreateVisible(true);
          }}
        />

        {cycleData && !cycleData.ended && (
          <Button
            label="EDITAR CICLO ATUAL"
            outlined
            disabled={disableButtons}
            onClick={() => {
              confirmEdit();
            }}
          />
        )}
      </div>
      {cycleData && !cycleData.ended && (
      <div className="flex px-2 w-full md:px-0 md:w-10/12">
        <Table dates={cycleData.data} />
      </div>
      )}
      <CreateCycleDialog
        visible={createVisible}
        setVisible={setCreateVisible}
        handleCreate={handleCreate}
      />
      <EditCycleDialog
        visible={editVisible}
        setVisible={setEditVisible}
        handleSaveChanges={saveChanges}
        cycleData={cycleData}
      />
    </div>
  );
}

export default Cycles;
