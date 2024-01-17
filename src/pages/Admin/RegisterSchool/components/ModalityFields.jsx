import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'primereact/multiselect';
import { useAuthUser } from 'react-auth-kit';
import { fetchAllModalities } from '../../../../api/schoolRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function ModalityFields({ setter: setSelectedModalities, getter: selectedModalities }) {
  const [allModalities, setAllModalities] = useState([
    {
      name: 'Carregando...',
      checked: false,
    }]);
  const authUser = useAuthUser();
  const { token } = authUser();
  const { showToast } = useToast();

  useEffect(() => {
  }, [selectedModalities]);

  useEffect(() => {
    const getModalities = async () => {
      try {
        const res = await fetchAllModalities(token);
        setAllModalities(res);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };
    getModalities();
  }, []);

  return (
    <div>
      <MultiSelect
        value={selectedModalities}
        options={allModalities}
        onChange={(e) => setSelectedModalities(e.value)}
        optionLabel="name"
        className="w-full"
        placeholder="Selecione as modalidades"
      />
    </div>
  );
}

ModalityFields.propTypes = {
  setter: PropTypes.func.isRequired,
  getter: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ModalityFields;
