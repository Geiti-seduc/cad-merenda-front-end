import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import WarningIcon from '@mui/icons-material/Warning';
import SaveButton from '../../../../components/Buttons/SaveButton';
import { adjustEndTime, adjustStartTime } from '../../../../utils/DataParser';

function CreateCycleDialog({ visible, setVisible, handleCreate }) {
  const [dates, setDates] = useState({
    PAUTAS: null,
    PEDIDOS: null,
    PROPOSTAS: null,
    VISUALIZAÇÃO: null,
  });

  const cyclePieces = [
    {
      title: 'PAUTAS',
      role: 'NUTRICIONISTA',
      description: 'Definir os itens disponíveis para pedidos.',
    },
    {
      title: 'PEDIDOS',
      role: 'ESCOLA',
      description: 'Selecionar itens disponíveis na pauta de compra.',
    },
    {
      title: 'PROPOSTAS',
      role: 'FORNECEDOR',
      description: 'Selecionar escolas e definir os preços dos produtos.',
    },
    {
      title: 'VISUALIZAÇÃO',
      role: 'ESCOLA',
      description: 'Visualizar orçamentos propostos pelos fornecedores.',
    },
  ];

  const handleSave = () => {
    const datesBody = {
      startNutri: adjustStartTime(dates.PAUTAS[0]),
      deadlineNutri: adjustEndTime(dates.PAUTAS[1]),
      startSchool: adjustStartTime(dates.PEDIDOS[0]),
      deadlineSchool: adjustEndTime(dates.PEDIDOS[1]),
      startSupplier: adjustStartTime(dates.PROPOSTAS[0]),
      deadlineSupplier: adjustEndTime(dates.PROPOSTAS[1]),
      initSelectSupplier: adjustStartTime(dates.VISUALIZAÇÃO[0]),
      deadlineSelectSupplier: adjustEndTime(dates.VISUALIZAÇÃO[1]),
    };
    handleCreate(datesBody);
    setVisible(false);
  };

  return (
    <Dialog
      header="CRIAR NOVO CICLO"
      visible={visible}
      style={{ width: '35vw' }}
      onHide={() => setVisible(false)}
    >
      <div className="border-b border-border h-[1px] w-full mb-10" />
      <div className="flex flex-col items-center gap-8">
        {cyclePieces.map((piece) => (
          <div
            key={piece.title}
            className="flex w-full justify-between items-center gap-2"
          >
            <div className="w-[20rem]">
              <p className="font-bold text-lg text-midnight">{piece.title.toUpperCase()}</p>
              <p className="text-xs text-concrete mt-2">{piece.description}</p>
            </div>
            <Calendar
              value={dates[piece.title]}
              onChange={(e) => setDates(
                { ...dates, [piece.title]: [e.value[0], e.value[1]] },
              )}
              selectionMode="range"
              readOnlyInput
              showIcon
              dateFormat="dd/mm/yy"
            />
          </div>
        ))}
        <div className="border-b border-border h-[1px] w-full" />
        <div className="flex items-center gap-5">
          <WarningIcon className="text-red mx-5" />
          <div>
            <p className="text-justify text-sm text-red font-bold text-midnight">
              Como administrador, você tem total liberdade de definição de datas.
              Verifique se preencheu todos os campos corretamente. O prenchimento
              incorreto pode acarretar erros inesperados.
            </p>
          </div>
        </div>
        <div className="border-b border-border h-[1px] w-full" />
        <SaveButton label="CRIAR CICLO" onClick={handleSave} />
      </div>
    </Dialog>
  );
}

CreateCycleDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default CreateCycleDialog;
