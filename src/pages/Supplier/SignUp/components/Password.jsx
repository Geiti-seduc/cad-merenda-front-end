import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { useToast } from '../../../../contexts/ToastContextProvider';

function Password({ setInvalidFields }) {
  const [invalid, setInvalid] = React.useState(false);
  const { showToast } = useToast();

  const checkPassword = () => {
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;

    if (password === '' || passwordConfirmation === '') return;

    if (password !== passwordConfirmation) {
      showToast('error', 'ERRO', 'As senhas não coincidem');
      setInvalid(true);
      setInvalidFields(true);
    } else {
      setInvalid(false);
      setInvalidFields(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <fieldset className="basis-1/2">
        <legend className="font-bold text-[#2C3E50]">
          SENHA
          <span className="text-red-500">*</span>
        </legend>
        <InputText
          type="password"
          name=""
          id="password"
          className={`w-full h-10 ${invalid && 'p-invalid'}`}
          onBlur={checkPassword}
        />
      </fieldset>
      <fieldset className="basis-1/2">
        <legend className="font-bold text-[#2C3E50]">
          CONFIRME SUA SENHA
          <span className="text-red-500">*</span>
        </legend>
        <InputText
          type="password"
          name=""
          className={`w-full h-10 ${invalid && 'p-invalid'}`}
          id="passwordConfirmation"
          onBlur={checkPassword}
        />
      </fieldset>
    </div>
  );
}

Password.propTypes = {
  setInvalidFields: PropTypes.func.isRequired,
};

export default Password;
