import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthUser } from 'react-auth-kit';
import { Tag } from 'primereact/tag';
import { fetchAllModalities } from '../../api/schoolRequests';

function ModalityInfo({ values }) {
  const [allModalities, setAllModalities] = useState([]);
  const [activeModalities, setActiveModalities] = useState([
    {
      name: 'Carregando...',
      checked: false,
    }]);
  const authUser = useAuthUser();
  const { token } = authUser();

  useEffect(() => {
    const getModalities = async () => {
      const res = await fetchAllModalities(token);
      setAllModalities(res);
    };
    getModalities();
  }, []);

  useEffect(() => {
    let active = [];
    const modalityNames = values.map((value) => value.modality.name);
    allModalities.filter((modality) => {
      if (modalityNames.includes(modality.name)) {
        active = [...active, modality];
      }
      return null;
    });
    setActiveModalities(active);
  }, [allModalities]);

  const fields = activeModalities.map((mode) => (
    <Tag value={mode.name} />
  ));
  return (
    <div>
      <p
        className="text-sm whitespace-nowrap
        font-bold text-concrete mb-1"
      >
        MODALIDADES
      </p>
      <div className="flex flex-col lg:flex-row flex-wrap border rounded-lg py-3 pl-3 gap-4 w-full items-start max-h-[200px] border-border">
        {fields}
      </div>
    </div>
  );
}

ModalityInfo.propTypes = {
  values: PropTypes.array.isRequired,
};

export default ModalityInfo;
