/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { useAuthUser } from 'react-auth-kit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ReplyIcon from '@mui/icons-material/Reply';
import { deleteFood } from '../../../../api/foodRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function DeleteFood({
  rowData, visible, setVisible, setMainVisible,
}) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const alimento = rowData.name.toUpperCase();
  const { showToast } = useToast();

  const handleDelete = () => {
    try {
      deleteFood(rowData.id, userToken);
      showToast('success', 'Feito!', 'Alimento removido com sucesso');
      setVisible(false);
      setMainVisible(false);
      window.location.reload();
    } catch (error) {
      showToast('error', 'ERRO', 'Erro ao remover o alimento');
    }
  };

  return (
    <Dialog
      header="REMOVER ALIMENTO"
      visible={visible}
      style={{ width: '30vw' }}
      onHide={() => setVisible(false)}
    >
      <p className="text-lg text-center">
        {`VOCÊ TEM CERTEZA QUE DESEJA REMOVER ${alimento} DO SISTEMA?`}
      </p>
      <div className="mt-10 flex justify-center gap-10 content-center">
        <Button
          icon={<DeleteForeverIcon className="mr-4" />}
          label="REMOVER"
          onClick={handleDelete}
        />
        <Button
          label="CANCELAR"
          severity="info"
          icon={<ReplyIcon className="mr-4" />}
          onClick={() => setVisible(false)}
        />
      </div>
    </Dialog>
  );
}

DeleteFood.propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setMainVisible: PropTypes.func.isRequired,
};

export default DeleteFood;
