/* eslint-disable react/prop-types */

import React, { useState, useEffect, useRef } from 'react';
import { useAuthUser } from 'react-auth-kit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ReplyIcon from '@mui/icons-material/Reply';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import PropTypes from 'prop-types';
import InputContainer from './InputContainer';
import DeleteFood from './DeleteFood';
import SaveButton from '../../../../components/Buttons/SaveButton';
import { editFood } from '../../../../api/foodRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';
import { measures } from '../../../../utils/constants';

function EditFood({
  rowData, visible, setVisible,
}) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { showToast } = useToast();

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
    setIsFormChanged(true);
  };

  const name = useRef();
  const description = useRef();
  const nmc = useRef();
  const category = useRef();

  const ms = 1000;

  useEffect(() => {
    if (rowData) {
      setSelectedUnit(rowData.measure);
    }
  }, [rowData]);

  const handleBackButtonClick = () => {
    setVisible(false);
  };

  const handleSubmit = (event) => {
    setDisableButton(true);
    event.preventDefault();
    const food = {
      name: name.current.value,
      measure: selectedUnit,
      description: description.current.value,
      category: category.current.value,
      nmc: parseInt(nmc.current.value, 10),
    };

    if (!isFormChanged) {
      showToast('info', 'OK', 'Não houve alterações no formulário');
      setDisableButton(false);
      setVisible(false);
      return;
    }

    if (food.name === ''
      || food.measure === ''
      || food.description === ''
      || food.category === ''
      || food.nmc === '') {
      showToast('error', 'ERRO', 'Os campos não podem estar vazios');
      setDisableButton(false);
      return;
    }

    if (food.nmc.toString().length !== 8) {
      showToast('error', 'ERRO', 'O NMC deve ter 8 dígitos');
      setDisableButton(false);
      return;
    }

    if (rowData && rowData.id) {
      try {
        editFood(rowData.id, food, userToken);
        showToast('success', 'Pronto!', 'Alimento editado com sucesso');
        setTimeout(() => {
          setVisible(false);
        }, ms);
        window.location.reload();
      } catch (error) {
        setDisableButton(false);
        showToast('error', 'ERRO', 'Não foi possível editar o alimento');
      }
    }
  };

  return (
    <Dialog
      header="EDITAR ALIMENTO"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={() => setVisible(false)}
    >
      <DeleteFood
        rowData={rowData}
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        setMainVisible={setVisible}
      />
      <div className="flex flex-col gap-2 mb-10">
        <hr />
        <p className="text-concrete text-center font-light text-lg">
          ALTERE OS DADOS NECESSÁRIOS
        </p>
        <hr />
      </div>
      <InputContainer title="name" classes="grow mb-6">
        <InputText
          className="w-full"
          type="text"
          name="nome"
          ref={name}
          defaultValue={rowData ? rowData.name : ''}
          onChange={() => setIsFormChanged(true)}
        />
      </InputContainer>
      <div className="flex gap-6">
        <InputContainer title="CATEGORIA" classes="grow">
          <InputText
            type="text"
            className="w-full"
            ref={category}
            defaultValue={rowData ? rowData.category : ''}
            onChange={() => setIsFormChanged(true)}
          />
        </InputContainer>
        <InputContainer title="UNIDADE DE MEDIDA" classes="basis-1/5">
          <Dropdown
            className="w-full"
            value={selectedUnit}
            name="medida"
            options={measures}
            onChange={handleUnitChange}
          />
        </InputContainer>
        <InputContainer title="NMC" classes="basis-1/5">
          <InputText
            className="w-full"
            type="number"
            ref={nmc}
            defaultValue={rowData ? rowData.nmc : ''}
            onChange={() => setIsFormChanged(true)}
          />
        </InputContainer>
      </div>
      <InputContainer title="DESCRIÇÃO" classes="mb-16 mt-6">
        <InputTextarea
          className="w-full font-light"
          rows={4}
          ref={description}
          defaultValue={rowData ? rowData.description : ''}
          onChange={() => setIsFormChanged(true)}
        />
      </InputContainer>
      <div className="flex justify-center gap-16 my-5">
        <SaveButton
          onClick={handleSubmit}
          isDisabled={disableButton}
        />
        <Button
          icon={<DeleteForeverIcon className="mr-4" />}
          label="REMOVER"
          disabled={disableButton}
          severity="danger"
          onClick={() => setDeleteVisible(true)}
          onChange={() => setIsFormChanged(true)}
        />
        <Button
          label="VOLTAR"
          severity="info"
          icon={<ReplyIcon className="mr-4" />}
          onClick={handleBackButtonClick}
          onChange={() => setIsFormChanged(true)}
        />
      </div>
    </Dialog>
  );
}

EditFood.propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    nmc: PropTypes.number,
  }),
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default EditFood;
