/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '../../pages/Supplier/SuppliersProposal/components/LoadingButton';
import { useToast } from '../../contexts/ToastContextProvider';

export function ModalGeneric({
  visible, onHide, food,
}) {
  const { showToast } = useToast();
  const [valorUni, setValorUni] = useState(food.product_price);
  const [marca, setMarca] = useState(food.brand);
  const [isDisabled, setIsDisabled] = useState(false);
  const [contentButton, setContentButton] = useState('SALVAR');
  // eslint-disable-next-line no-shadow
  function calculateTotalValue(valorUni, qtdMax) {
    const totalValue = valorUni * qtdMax;
    return totalValue;
  }

  function formatPrice(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  const send = () => {
    const allFilled = !(valorUni === 0 || valorUni === null || marca === '' || marca === null || marca === undefined || valorUni === undefined);
    if (!allFilled) {
      showToast('error', 'Erro', 'Preencha todos os campos');
    } else {
      setContentButton(<LoadingButton />);
      setIsDisabled(true);
      food.product_price = valorUni;
      food.brand = marca;
      setTimeout(() => {
        showToast('success', 'Feito!', 'Produto atualizado com sucesso');
        onHide();
      }, 1000);
    }
  };

  const updatePrecoUnitario = (event) => {
    setValorUni(event.value);
  };

  function onChangeMarca(e) {
    setMarca(e.target.value);
  }

  const [totalValue, setTotalValue] = useState(
    calculateTotalValue(valorUni, food.quantity),
  );
  useEffect(() => {
    setTotalValue(calculateTotalValue(valorUni, food.quantity));
  }, [valorUni]);

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      style={{ width: '100%', background: 'var(--white)', padding: '10px' }}
      className="rounded-lg"
    >
      <form className="flex flex-col items-center">
        <label htmlFor="itemName" className="w-full pl-[1px]">ITEM:</label>
        <InputText
          id="itemName"
          value={food.name}
          onChange={(e) => { food.nome = e.value; }}
          disabled
          className="border w-full rounded border-[#C4C4C4]"
        />
        <label htmlFor="medida" className="w-full">MEDIDA:</label>
        <InputText
          id="medida"
          value={food.measure}
          onChange={(e) => { food.medida = e.value; }}
          disabled
          className="border w-full rounded border-[#C4C4C4]"
        />
        <label htmlFor="descricao" className="w-full pl-[1px]">DESCRIÇÃO:</label>
        <InputTextarea
          id="descricao"
          value={food.description}
          className="border w-full rounded border-[#C4C4C4]"
          style={{ color: '#95a5a6' }}
          rows={2}
        />
        <label htmlFor="periodicidade" className="w-full pl-[1px]">PERIODICIDADE:</label>
        <InputText
          id="frequency"
          value={food.frequency}
          disabled
          className="border w-full rounded border-[#C4C4C4]"
        />
        <label htmlFor="qtdMax" className="w-full pl-[1px]">QUANTIDADE MÁX:</label>
        <InputText
          id="qtdMax"
          value={food.quantity}
          onChange={(e) => { food.qtdMax = e.value; }}
          disabled
          className="border w-full rounded border-[#C4C4C4]"
        />
        <label htmlFor="valorUni" className="w-full pl-[1px]">PREÇO UNITARIO:</label>
        <InputNumber
          id="valorUni"
          value={valorUni}
          onValueChange={(e) => updatePrecoUnitario(e)}
          min={0}
          mode="currency"
          className="w-full rounded"
          currency="BRL"
          locale="pt-BR"
        />
        <label htmlFor="marca" className="w-full pl-[1px]">MARCA:</label>
        <InputText
          id="marca"
          value={marca}
          onChange={(e) => onChangeMarca(e)}
          className="border w-full rounded border-[#C4C4C4]"
        />
        <div className="flex justify-between w-full pt-3 pb-2">
          <span className="text-base text-concrete font-bold">VALOR TOTAL:</span>
          <span className="text-blue text-lg font-bold">
            { formatPrice(totalValue) }
          </span>
        </div>
        <Button
          icon={<SaveIcon />}
          label={contentButton}
          className="w-[300px]"
          disabled={isDisabled}
          type="button"
          onClick={send}
        />
      </form>
    </Dialog>
  );
}

ModalGeneric.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};
