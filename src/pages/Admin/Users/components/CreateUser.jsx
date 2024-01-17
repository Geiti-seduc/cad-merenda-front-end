import React, { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import RoleSelect from './RoleSelect';
import * as parser from '../../../../utils/DataParser';
import SaveButton from '../../../../components/Buttons/SaveButton';
import { randomHash } from '../../../../utils/randomHash';
import { createUser, sendEmail } from '../../../../api/userRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

/* cpf, email, nome, password, cargos */

function CreateUser({
  visible, setVisible, schoolList,
}) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cpfValue, setCpfValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [currentSchool, setCurrentSchool] = useState('');
  const [schoolBlock, setSchoolBlock] = useState(false);
  const { showToast } = useToast();

  const handleHide = () => {
    setVisible(false);
    setNameValue('');
    setEmailValue('');
    setCpfValue('');
    setRoleValue('');
  };

  const handleSave = async () => {
    setButtonDisabled(true);
    if (!emailValue || !cpfValue || !nameValue || !roleValue) {
      showToast('warn', 'ATENÇÃO', 'Preencha todos os campos');
      return;
    }
    if (roleValue === 'gestor' && !currentSchool) {
      showToast('warn', 'ATENÇÃO', 'Selecione uma escola');
      return;
    }

    try {
      parser.validateEmail(emailValue);
      parser.validateCpf(cpfValue);
      parser.validateName(nameValue);
      parser.validateRole(roleValue);
    } catch (error) {
      showToast('warn', 'ATENÇÃO', error.message);
      return;
    }

    const body = {
      id: cpfValue,
      email: emailValue,
      name: nameValue,
      password: randomHash(),
      role: roleValue,
      schoolInep: currentSchool.inep,
    };

    try {
      await createUser(body, userToken);
      await sendEmail(body.email);
      showToast('success', 'Pronto!', 'Usuário criado com sucesso');
      setVisible(false);
      window.location.reload();
    } catch (error) {
      showToast('error', 'ERRO', error.message);
    }
  };

  return (
    <Dialog
      header="CADASTRAR USUÁRIO"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={handleHide}
    >
      <div className="flex w-full gap-6 pb-5">

        <div className="flex flex-col justify-between basis-3/5 gap-6">
          <InputText
            id="editName"
            placeholder="NOME COMPLETO"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <InputText
            id="editEmail"
            type="email"
            placeholder="EMAIL"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <InputText
            id="cpf"
            placeholder="CPF"
            value={cpfValue}
            onChange={(e) => setCpfValue(e.target.value)}
          />
          <Dropdown
            placeholder="ESCOLA"
            value={currentSchool}
            options={schoolList}
            optionLabel="name"
            disabled={schoolBlock}
            onChange={(e) => setCurrentSchool(e.value)}
          />
        </div>
        <RoleSelect setValue={setRoleValue} setSchoolBlock={setSchoolBlock} />
      </div>
      <div className="flex w-full justify-center">
        <SaveButton
          onClick={handleSave}
          isDisabled={buttonDisabled}
        />
      </div>
    </Dialog>
  );
}

CreateUser.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  schoolList: PropTypes.array.isRequired,
};

export default CreateUser;
