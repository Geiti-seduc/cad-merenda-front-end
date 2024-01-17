/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useAuthUser } from 'react-auth-kit';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '../button/Button';

function Delete({ rowData, closeModalDelete }) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const alimento = rowData.name.toUpperCase();
  const toast = useRef(null);
  const milesegundos = 1000;
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      detail: 'REMOVIDO COM SUCESSO',
      life: 3000,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/food/${rowData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao remover o alimento.');
      }

      showSuccess();
      setTimeout(() => {
        window.location.reload();
      }, milesegundos);
    } catch (error) {
      console.error('Erro ao remover o alimento:', error);
    }
  };

  return (
    <div className="modal z-10 ">
      <Toast ref={ toast } />
      <div className="modal-content w-[35rem] pb-4 justify-center">
        <div className="flex mt-5 ml-5">
          <span className="text-[#005CA9] text-xl font-black">REMOVER ALIMENTO</span>
        </div>
        <hr className="mt-5 mb-5" />
        <div className="flex justify-center mt-10 mb-5">
          <div className="flex w-4/5 justify-center mb-10">
            <div className="flex justify-center">
              <p className="text-[#000000] text-xl">
                VOCÊ TEM CERTEZA QUE DESEJA REMOVER
                {' '}
                {alimento}
                {' '}
                DO SISTEMA?
              </p>
            </div>
          </div>
        </div>
        <form className="flex justify-center flex-row-reverse content-center">
          <Button
            icon={ <DeleteForeverIcon /> }
            content="REMOVER"
            color="--white"
            background="--red"
            active="--white"
            border="border-[1px]"
            borderColor="--red"
            radius="rounded-2xl"
            onClick={ handleDelete }
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
            classes="mr-3"
            onClick={ closeModalDelete }
          />
        </form>
      </div>
    </div>
  );
}

export default Delete;
