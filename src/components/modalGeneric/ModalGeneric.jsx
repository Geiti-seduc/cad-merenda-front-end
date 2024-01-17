/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import './modalGeneric.scss';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import Button from '../button/Button';

export function ModalGeneric({ visible, onHide, food }) {
  const [valorUni, setValorUni] = useState(
    `R$ ${food.valorUni.toFixed(2).replace('.', ',')}`,
  ); // Inicialize como uma string formatada

  // eslint-disable-next-line no-shadow
  function calculateTotalValue(valorUni, qtdMax) {
    const numericValue = parseFloat(valorUni.replace('R$', '').replace(',', '.')); // Remova 'R$' e substitua ',' por '.'
    const total = numericValue * qtdMax;
    return total.toFixed(2).replace('.', ','); // Format: 0.000,00
  }

  const [totalValue, setTotalValue] = useState(
    calculateTotalValue(valorUni, food.qtdMax),
  );
  useEffect(() => {
    setTotalValue(calculateTotalValue(valorUni, food.qtdMax));
  }, [valorUni, food.qtdMax]);

  function handleValorUniChange(event) {
    setValorUni(event.target.value);
  }

  return (
    <div className="modalGeneric">
      <div className="modal-background flex justify-content-center">
        <Dialog
          visible={ visible }
          onHide={ onHide }
          style={ { width: '90vw', background: 'var(--white)', padding: '20px' } }
          className="rounded-lg"
        >
          <form className="flex flex-col items-center">
            <label htmlFor="itemName" className="w-full">ITEM:</label>
            <input
              type="text"
              id="itemName"
              className="border w-full"
              value={ food.nome }
              disabled
            />
            <label htmlFor="medida" className="w-full">MEDIDA:</label>
            <input
              type="text"
              id="medida"
              className="border w-full"
              value={ food.medida }
              disabled
            />
            <label htmlFor="descricao" className="w-full">DESCRIÇÃO:</label>
            <textarea
              type="text"
              id="descricao"
              className="border w-full"
              value={ food.descricao }
              disabled
            />
            <label htmlFor="periodicidade" className="w-full">PERIODICIDADE:</label>
            <input
              type="text"
              id="periodicidade"
              className="border w-full"
              value={ food.periodicidade }
              disabled
            />
            <label htmlFor="qtdMax" className="w-full">QUANTIDADE MÁX:</label>
            <input
              type="text"
              id="qtdMax"
              className="border w-full"
              value={ food.qtdMax }
              disabled
            />
            <label htmlFor="qtdMax" className="w-full">PREÇO UNITARIO:</label>
            <input
              type="text"
              id="valorUni"
              className="border w-full"
              placeholder={ `R$ ${food.valorUni}` }
              onChange={ handleValorUniChange }
            />
            <label htmlFor="marca" className="w-full">MARCA:</label>
            <input
              type="text"
              id="marca"
              className="border w-full"
              placeholder={ food.marca }
            />
            <div className="flex justify-between w-full pt-3 pb-2">
              <span className="text-base text-[--concrete] font-bold">VALOR TOTAL:</span>
              <span className="text-[--blue] text-lg font-bold">
                R$
                {' '}
                { totalValue }
              </span>
            </div>
            <Button
              icon={ <SaveIcon /> }
              content="SALVAR"
              color="--white"
              active="--white"
              border="border-[1px]"
              borderColor="--blue"
              background="--blue"
              radius="rounded-2xl"
              classes="w-full"
            />
          </form>
        </Dialog>
      </div>
    </div>
  );
}

ModalGeneric.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  food: PropTypes.object.isRequired,
};
