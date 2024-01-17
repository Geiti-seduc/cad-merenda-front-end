import React, { useState, useEffect, useRef } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import SaveButton from '../../../components/Buttons/SaveButton';
import Table from './components/Table';
import { decryptUser } from '../../../utils/encryptId';
import { getUserById } from '../../../api/userRequests';
import { useToast } from '../../../contexts/ToastContextProvider';
import Order from '../../../utils/models/Order';

function SchoolOrder() {
  const [isDisabled, setIsDisabled] = useState(false);
  const orderRef = useRef(new Order());
  const [values, setValues] = useState(null);
  const { showToast } = useToast();
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [data, setData] = useState([]);
  const [modalityOptions, setModalityOptions] = useState([]);
  const [selectedModality, setSelectedModality] = useState(null);

  useEffect(() => {
    const initOrder = async () => {
      try {
        const id = decryptUser(authUser().id);
        const res = await getUserById(id, userToken);
        const inep = res.school_user[0].school_inep;
        await orderRef.current.init(inep, userToken);
        const modalities = orderRef.current.getData();
        const initValues = orderRef.current.getValuesByModality(modalities[0].label);

        setModalityOptions(modalities);
        setSelectedModality(modalities[0].label);
        setValues(initValues);
        setData(modalities[0].unified);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };

    initOrder();
  }, []);

  const handleModalityChange = async (label) => {
    orderRef.current.updateValues(selectedModality, values);
    setSelectedModality(label);
    const newValues = orderRef.current.getValuesByModality(label);
    setValues(newValues);
    setData(orderRef.current.getValuesByModality(label).unified);
  };

  const send = async () => {
    orderRef.current.updateValues(selectedModality, values);
    setIsDisabled(true);
    try {
      orderRef.current.checkEmptyValues();
      await orderRef.current.sendOrder(userToken);
      showToast('success', 'Pronto!', 'Pedido enviado com sucesso');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }
    setIsDisabled(false);
  };

  const nextModality = () => {
    const index = modalityOptions.findIndex((item) => item.label === selectedModality);
    if (index < modalityOptions.length - 1) {
      handleModalityChange(modalityOptions[index + 1].label);
    }
  };

  const previousModality = () => {
    const index = modalityOptions.findIndex((item) => item.label === selectedModality);
    if (index > 0) {
      handleModalityChange(modalityOptions[index - 1].label);
    }
  };

  return (
    <div className="flex flex-col items-center pt-12 w-full gap-12">
      <div className="flex w-10/12 justify-between items-center">
        <h1 className="text-blue text-2xl font-black">
          PEDIDOS
        </h1>
        <div className="flex w-fit items-center justify-end gap-10">
          <div className="w-1/2 text-right">
            <p className="text-blue text-sm">
              Para remover um item do pedido, defina sua quantidade como 0 e remova a periodicidade.
            </p>
          </div>
          <SaveButton onClick={send} isDisabled={isDisabled} />
        </div>
      </div>
      <div className="flex flex-col w-10/12">
        <div className="flex w-full h-fit items-center gap-3 border-b pb-6 border-border">
          <div className="pr-2 text-blue font-bold flex items-center">MODALIDADE:</div>
          <Dropdown
            value={selectedModality}
            options={modalityOptions}
            optionLabel="label"
            optionValue="label"
            onChange={(e) => {
              handleModalityChange(e.value);
            }}
            className="grow"
            emptyMessage="Nenhuma modalidade encontrada"
          />
          <Button className="h-full" icon={<ArrowBack />} onClick={previousModality} />
          <Button className="h-full" icon={<ArrowForward />} onClick={nextModality} />
        </div>
        <Table data={data} setter={setValues} values={values} />
      </div>
    </div>
  );
}

export default SchoolOrder;
