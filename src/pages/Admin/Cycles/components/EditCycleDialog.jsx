import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import SaveButton from '../../../../components/Buttons/SaveButton';
import { adjustEndTime, adjustStartTime } from '../../../../utils/DataParser';

function EditCycleDialog({
  visible, setVisible, handleSaveChanges, cycleData,
}) {
  const [dates, setDates] = useState({});

  useEffect(() => {
    if (cycleData) {
      const parsedDates = {};
      cycleData.data.forEach((piece) => {
        parsedDates[piece.title] = [new Date(piece.start), new Date(piece.end)];
      });
      setDates(parsedDates);
    }
  }, [cycleData]);

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
    handleSaveChanges(datesBody);
    setVisible(false);
  };

  return (
    <Dialog
      header="EDITAR CICLO ATUAL"
      visible={visible}
      style={{ width: '35vw' }}
      onHide={() => setVisible(false)}
    >
      <div className="border-b border-border h-[1px] w-full mb-10" />
      <div className="flex flex-col items-center gap-8">
        {cycleData && cycleData.data.map((piece) => (
          <div
            key={piece.title}
            className="flex w-full justify-between items-center gap-2"
          >
            <div className="w-[20rem]">
              <p className="font-bold text-lg text-midnight">{piece.title}</p>
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
        <SaveButton label="SALVAR ALTERAÇÕES" onClick={handleSave} />
      </div>
    </Dialog>
  );
}

EditCycleDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  cycleData: PropTypes.object,
};

export default EditCycleDialog;
