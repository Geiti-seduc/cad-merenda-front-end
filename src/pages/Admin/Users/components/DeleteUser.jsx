/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { useAuthUser } from 'react-auth-kit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ReplyIcon from '@mui/icons-material/Reply';
import { deleteUser } from '../../../../api/userRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function Delete({
  user, visible, setVisible,
}) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const name = user.name.toUpperCase();
  const { showToast } = useToast();

  const handleDelete = async () => {
    const id = user.id.replace(/\D/g, '');
    try {
      await deleteUser(id, userToken);
      window.location.reload();
    } catch (error) {
      showToast('error', 'ERRO', 'Erro ao remover o usuário');
    }
  };

  return (
    <Dialog
      header="REMOVER USUÁRIO"
      visible={visible}
      style={{ width: '30vw' }}
      onHide={() => setVisible(false)}
    >
      <p className="text-lg text-center">
        {`VOCÊ TEM CERTEZA QUE DESEJA REMOVER ${name} DO SISTEMA?`}
      </p>
      <div className="mt-10 flex justify-center gap-10 content-center">
        <Button
          icon={<DeleteForeverIcon className="mr-4" />}
          severity="danger"
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

export default Delete;
