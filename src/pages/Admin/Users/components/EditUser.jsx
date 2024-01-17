/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useAuthUser } from 'react-auth-kit';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from 'primereact/button';
import RoleSelect from './RoleSelect';
import SaveButton from '../../../../components/Buttons/SaveButton';
import { editUser } from '../../../../api/userRequests';
import Delete from './DeleteUser';
import { useToast } from '../../../../contexts/ToastContextProvider';

function EditUser({
  visible, setVisible, user = null, schoolList,
}) {
  const authUser = useAuthUser();
  const { showToast } = useToast();
  const userToken = authUser().token;
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [schoolBlock, setSchoolBlock] = useState(false);
  const [roleValue, setRoleValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);

    if (schoolList && user) {
      if (user.school_user && user.school_user.length > 0) {
        const school = schoolList.find(
          (item) => item.inep === user.school_user[0].school.inep,
        );
        setCurrentSchool(school);
      } else setCurrentSchool(null);
    }
  }, [user, schoolList]);

  const handleSave = async () => {
    if (!nameValue) {
      showToast('error', 'ERRO', 'Nome inválido');
      return;
    }

    if (!emailValue) {
      showToast('error', 'ERRO', 'Email inválido');
      return;
    }

    if (!roleValue) {
      showToast('error', 'ERRO', 'Selecione um cargo');
      return;
    }

    if (roleValue === 'gestor' && !currentSchool) {
      showToast('error', 'ERRO', 'Selecione uma escola');
      return;
    }

    const body = {
      name: nameValue,
      email: emailValue,
      password: user.password,
      role: roleValue,
      schoolInep: currentSchool ? currentSchool.inep : null,
    };

    const { id } = user;

    try {
      editUser(id, body, userToken);
      showToast('success', 'Pronto!', 'Usuário editado com sucesso');
      setVisible(false);
      window.location.reload();
    } catch (error) {
      showToast('error', 'ERRO', 'Não foi possível editar o usuário');
    }
  };

  return (
    <Dialog
      header="EDITAR USUÁRIO"
      visible={visible}
      style={{ width: '40vw' }}
      onHide={() => setVisible(false)}
    >
      <Delete
        user={user}
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        setMainVisible={setVisible}
      />
      <div className="flex flex-col w-full gap-10 user-dialog">
        <div className="flex w-full gap-5">
          <div className="flex flex-col w-3/5 justify-between gap-6">
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
            <Dropdown
              placeholder="ESCOLA"
              options={schoolList}
              optionLabel="name"
              value={currentSchool}
              disabled={schoolBlock}
              className="truncate"
              onChange={(e) => setCurrentSchool(e.value)}
            />
          </div>
          <div className="flex flex-col grow gap-1">
            <RoleSelect role={user.role} setValue={setRoleValue} setSchoolBlock={setSchoolBlock} />
          </div>
        </div>
        <div className="w-3/5 flex justify-center gap-10 place-self-center">
          <SaveButton onClick={handleSave} />
          <Button
            label="REMOVER"
            icon={<DeleteForeverIcon className="mr-4" />}
            severity="danger"
            onClick={() => setDeleteVisible(true)}
          />
        </div>
      </div>
    </Dialog>
  );
}

EditUser.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  schoolList: PropTypes.array.isRequired,
};

export default EditUser;
