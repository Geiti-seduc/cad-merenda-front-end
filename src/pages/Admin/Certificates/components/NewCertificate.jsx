import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { useAuthUser } from 'react-auth-kit';
import InputField from '../../../../components/FormFields/InputField';
import SaveButton from '../../../../components/Buttons/SaveButton';
import { createRequiredCertificate } from '../../../../api/certificateRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function NewCertificate({ visible, setVisible }) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [nameValue, setNameValue] = useState('');
  const { showToast } = useToast();

  const handleCreate = async () => {
    try {
      createRequiredCertificate({ name: nameValue }, userToken);
      setVisible(false);
      window.location.reload();
    } catch (error) {
      showToast('error', 'ERRO', error.message);
    }
  };

  const handleHide = () => {
    setVisible(false);
    setNameValue('');
  };

  return (
    <Dialog
      header="ADICIONAR NOVA CERTIDÃO"
      visible={visible}
      style={{ width: '35vw' }}
      onHide={handleHide}
    >
      <div className="flex flex-col items-center w-full mt-3 gap-5 py-4">
        <InputField
          id="name"
          innerText="NOME"
          value={nameValue}
          onChange={setNameValue}
        />
        <div className="flex justify-between gap-5 mt-6">
          <SaveButton onClick={handleCreate} />
        </div>
      </div>

    </Dialog>
  );
}

NewCertificate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default NewCertificate;
