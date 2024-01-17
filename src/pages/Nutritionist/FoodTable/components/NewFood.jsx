/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useAuthUser } from 'react-auth-kit';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { createFood } from '../../../../api/foodRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';
import InputContainer from './InputContainer';
import { measures } from '../../../../utils/constants';


function NewFood({ visible, setVisible }) {
  const { showToast } = useToast();
  const [disableButton, setDisableButton] = useState(false);
  const authUser = useAuthUser();
  const userToken = authUser().token;

  const [selectedUnit, setSelectedUnit] = useState(null);
  const name = useRef();
  const description = useRef();
  const category = useRef();
  const nmc = useRef();
  const handleBackButtonClick = () => {
    setVisible(false);
  };

  const send = async () => {
    setDisableButton(true);
    const food = {
      name: name.current.value,
      measure: selectedUnit,
      description: description.current.value,
      category: category.current.value,
      nmc: parseInt(nmc.current.value, 10),
    };

    if (food.name === ''
      || food.measure === ''
      || food.description === ''
      || food.category === ''
      || food.nmc === '') {
      showToast('error', 'ERRO', 'Preencha todos os campos');
      setDisableButton(false);
      return;
    }

    if (food.nmc.toString().length !== 8) {
      showToast('error', 'ERRO', 'O NMC deve ter 8 dígitos');
      setDisableButton(false);
      return;
    }

    try {
      await createFood(food, userToken);
      showToast('success', 'Pronto!', 'Alimento cadastrado com sucesso');
      setTimeout(() => {
        setVisible(false);
      }, 1000);
      window.location.reload();
      setDisableButton(false);
      setVisible(false);
    } catch (error) {
      setDisableButton(false);
      showToast('error', 'ERRO', 'Não foi possível cadastrar o alimento');
    }
  };

  return (
    <Dialog
      header="CADASTRAR ALIMENTO"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={() => setVisible(false)}
    >
      <InputContainer title="NOME" classes="grow mb-6">
        <InputText
          className="w-full"
          type="text"
          ref={name}
        />
      </InputContainer>
      <div className="flex gap-6">
        <InputContainer title="CATEGORIA" classes="grow">
          <InputText
            type="text"
            className="w-full"
            ref={category}
          />
        </InputContainer>
        <InputContainer title="UNIDADE DE MEDIDA" classes="basis-1/5">
          <Dropdown
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full"
            options={measures}
          />
        </InputContainer>
        <InputContainer title="NMC" classes="basis-1/5">
          <InputText
            className="w-full"
            type="number"
            maxLength={8}
            minLength={8}
            ref={nmc}
          />
        </InputContainer>
      </div>
      <InputContainer title="DESCRIÇÃO" classes="mb-16 mt-6">
        <InputTextarea
          className="w-full font-light"
          rows={4}
          ref={description}
        />
      </InputContainer>
      <div className="flex justify-center gap-16 my-5">
        <Button
          icon={<SaveIcon className="mr-4" />}
          label="SALVAR"
          disabled={disableButton}
          onClick={send}
        />
        <Button
          label="VOLTAR"
          severity="info"
          icon={<ReplyIcon className="mr-4" />}
          onClick={handleBackButtonClick}
        />
      </div>
    </Dialog>
  );
}

NewFood.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default NewFood;
