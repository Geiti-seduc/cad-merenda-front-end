/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useAuthUser } from 'react-auth-kit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import Delete from '../delete/delete';
import './editFood.scss';
import exitIcon from '../../assets/images/Close_round_duotone.svg';
import verticalLineIcon from '../../assets/images/Line 22.svg';
import Button from '../button/Button';
import '../../index.scss';

function EditFood({ rowData, closeModal }) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useRef(null);
  const [selectedUnit, setSelectedUnit] = useState('');
  const unidades = ['KG', 'LITRO', 'GRAMA', 'ML'];
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
    setIsFormChanged(true);
  };

  const nome = useRef();
  const medida = useRef();
  const descricao = useRef();
  const category = useRef();

  const milesegundos = 1000;

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      detail: 'ATUALIZADO COM SUCESSO',
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error',
      detail: 'NÃO FORAM FEITAS ALTERAÇÕES',
      life: 3000,
    });
  };

  useEffect(() => {
    if (rowData) {
      setSelectedUnit(rowData.measure);
    }
  }, [rowData]);

  const handleBackButtonClick = () => {
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {
      name: nome.current.value,
      measure: medida.current.value,
      description: descricao.current.value,
      category: category.current.value,
    };

    if (!isFormChanged) {
      showError();
      return;
    }

    if (rowData && rowData.id) {
      const url = `http://localhost:3001/food/${rowData.id}`;
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar o alimento.');
        }

        const responseData = await response.json();
        console.log('Alimento atualizado com sucesso:', responseData);
        showSuccess();
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, milesegundos);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  const closeModalDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal">
      <Toast ref={ toast } />
      {isModalOpen && (
        <Delete rowData={ rowData } closeModalDelete={ closeModalDelete } />
      )}

      <form className="w-[50rem] modal-content font-black">
        <div className="flex align-auto">
          <button
            className="w-[35px] h-[35px] ml-auto mt-2 mr-2 drop-shadow-lg"
            type="button"
            onClick={ handleBackButtonClick }
          >
            <img alt="exit" src={ exitIcon } />
          </button>
        </div>
        <div className="flex ml-10">
          <span className="text-[#005CA9] text-xl">EDITAR ALIMENTO</span>
          <img
            className="ml-2 mr-2"
            alt="separator"
            src={ verticalLineIcon }
          />
          <span className="text-[#95A5A6] font-medium text-xl">
            ALTERE OS DADOS NECESSÁRIOS
          </span>
        </div>

        <div className="w-5/6 m-auto mt-14">
          <div className="w-full flex justify-between">
            <div className="w-3/5">
              <span className="text-[#000000] font-medium text-xxs">NOME</span>
              <input
                className="border rounded-lg border-[#95A5A6] w-full h-[35px] font-light"
                type="text"
                name="nome"
                ref={ nome }
                defaultValue={ rowData ? rowData.name : '' }
                onChange={ () => setIsFormChanged(true) }
              />
            </div>
            <div className="w-1/6">
              <span className="text-[#000000] font-medium text-xxs">
                UNIDADE DE MEDIDA
              </span>
              <select
                className="border rounded-lg border-[#95A5A6] w-full h-[35px] font-light"
                value={ selectedUnit }
                name="medida"
                ref={ medida }
                onChange={ handleUnitChange }
              >
                {unidades.map((unidade, index) => (
                  <option key={ index } value={ unidade }>
                    {unidade}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/5">
              <span className="text-[#000000] font-medium text-xxs">CATEGORIA</span>
              <input
                className="border rounded-lg border-[#95A5A6] w-full h-[35px] font-light"
                type="text"
                ref={ category }
                onChange={ () => setIsFormChanged(true) }
              />
            </div>
          </div>
          <div className="mb-16 mt-2">
            <span className="text-[#000000] font-medium text-xxs">DESCRIÇÃO</span>
            <textarea
              className="w-full border rounded-lg border-[#95A5A6] mt-1 pl-1 font-light"
              rows={ 6 }
              name="descricao"
              ref={ descricao }
              defaultValue={ rowData ? rowData.description : '' }
              onChange={ () => setIsFormChanged(true) }
            />
          </div>

          <div className="flex justify-evenly mb-10">
            <Button
              icon={ <SaveIcon /> }
              content="SALVAR"
              color="--white"
              active="--white"
              border="border-[1px]"
              borderColor="--blue"
              background="--blue"
              radius="rounded-2xl"
              onClick={ handleSubmit }
            />
            <Button
              icon={ <DeleteForeverIcon /> }
              content="REMOVER"
              color="--white"
              background="--red"
              active="--white"
              border="border-[1px]"
              borderColor="--red"
              radius="rounded-2xl"
              onClick={ () => setIsModalOpen(true) }
            />
            <Button
              icon={ <ReplyIcon /> }
              content="VOLTAR"
              color="--white"
              active="--white"
              border="border-[1px]"
              borderColor="--silver"
              background="--silver"
              radius="rounded-2xl"
              onClick={ handleBackButtonClick }
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditFood;
