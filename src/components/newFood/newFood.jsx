/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useAuthUser } from 'react-auth-kit';
import './newFood.scss';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReplyIcon from '@mui/icons-material/Reply';
import exit from '../../assets/images/Close_round_duotone.svg';
import verticalLine from '../../assets/images/Line 22.svg';
import Button from '../button/Button';

function NewFood({ closeModal }) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const toast = useRef(null);
  const units = ['KG', 'LITRO', 'GRAMA',
    'ML'];

  const [selectedUnit, setSelectedUnit] = useState('');

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const name = useRef();
  const measure = useRef();
  const description = useRef();
  const category = useRef();
  const milesegundos = 1000;
  const handleBackButtonClick = () => {
    closeModal(); // Chamando a função de callback para fechar o modal
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      detail: 'CADASTRADO COM SUCESSO',
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: 'error',
      detail: 'PREENCHA TODOS OS CAMPOS',
      life: 3000,
    });
  };

  const send = async () => {
    try {
      const food = {
        name: name.current.value,
        measure: measure.current.value,
        description: description.current.value,
        category: category.current.value,
      };
      if (food.name === '' || food.description === '' || food.category === '') {
        showError();
        return;
      }
      const response = await fetch('http://localhost:3001/food/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(food),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }
      const data = await response.json();
      console.log('Resposta do servidor:', data);
      showSuccess();
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, milesegundos);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div className="modal">
      <Toast ref={ toast } />
      <form className="w-[50rem] modal-content font-black">
        <div className="flex align-auto">
          <button
            className="w-[35px] h-[35px] ml-auto mt-2 mr-2 drop-shadow-lg"
            type="button"
            onClick={ handleBackButtonClick }
          >
            <img alt="exit" src={ exit } />
          </button>
        </div>
        <div className="flex ml-10">
          <span className="text-[#005CA9] text-xl">CADASTRAR ALIMENTO</span>
          <img className="ml-2 mr-2" alt="separator" src={ verticalLine } />
          <span className="text-[#95A5A6] font-medium text-xl">
            INFORME OS DADOS NECESSÁRIOS
          </span>
        </div>
        <div className="w-5/6 m-auto mt-14">
          <div className="w-full flex justify-between">
            <div className="w-3/5">
              <span className="text-[#000000] font-medium text-xxs">NOME</span>
              <input
                className="border rounded-lg border-[#95A5A6] w-full h-[35px] font-light"
                type="text"
                ref={ name }
              />
            </div>
            <div className="w-1/6">
              <span className="text-[#000000] font-medium text-xxs">
                UNIDADE DE MEDIDA
              </span>
              <select
                className="border rounded-lg border-[#95A5A6] w-full h-[35px] font-light"
                value={ selectedUnit }
                onChange={ handleUnitChange }
                ref={ measure }
              >
                { units.map((unit, index) => (
                  <option key={ index }>
                    { unit }

                  </option>
                )) }
              </select>
            </div>
            <div className="w-1/5">
              <span className="text-[#000000] font-medium text-xxs">CATEGORIA</span>
              <input
                className="border rounded-lg border-[#95A5A6] w-full h-[35px] font-light"
                type="text"
                ref={ category }
              />
            </div>
          </div>
          <div className="mb-16 mt-2">
            <span className="text-[#000000] font-medium text-xxs">DESCRIÇÃO</span>
            <textarea
              className="w-full border rounded-lg border-[#95A5A6] mt-1 pl-1 font-light"
              rows={ 6 }
              ref={ description }
            />
          </div>
          <div className="flex justify-center mb-10 ">
            <Button
              icon={ <AddBoxIcon style={ { marginRight: '3px' } } /> }
              content="ADICIONAR"
              color="--white"
              active="--white"
              border="border-[1px]"
              borderColor="--blue"
              background="--blue"
              radius="rounded-2xl"
              classes="mr-2"
              onClick={ send }
            />
            <Button
              icon={ <ReplyIcon /> }
              content="VOLTAR"
              color="--white"
              active="--white"
              border="border-[1px]"
              borderColor="--white"
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

export default NewFood;
