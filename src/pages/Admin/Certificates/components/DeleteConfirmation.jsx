import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { useAuthUser } from 'react-auth-kit';
import { Button } from 'primereact/button';
import { deleteRequiredCertificate } from '../../../../api/certificateRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function DeleteConfirmation({
  visible, setVisible, certificate,
}) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { showToast } = useToast();

  const handleDelete = async () => {
    try {
      deleteRequiredCertificate(certificate.id, userToken);
      setVisible(false);
      window.location.reload();
    } catch (error) {
      showToast('error', 'ERRO', error.message);
    }
  };
  return (
    <Dialog
      header="DELETAR CERTIDÃO"
      visible={visible}
      style={{ width: '35vw' }}
      onHide={() => setVisible(false)}
    >
      <div className="flex flex-col items-center w-full gap-5 py-4">
        <p className="text-lg">
          {`Tem certeza de que deseja apagar ${(certificate.name)}?`}
        </p>
        <div className="flex justify-between gap-5 mt-6">
          <Button
            label="NÃO"
            className="w-32"
            onClick={() => setVisible(false)}
          />
          <Button
            label="SIM"
            outlined
            severity="danger"
            className="w-32"
            onClick={handleDelete}
          />
        </div>
      </div>

    </Dialog>
  );
}

DeleteConfirmation.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  certificate: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DeleteConfirmation;
