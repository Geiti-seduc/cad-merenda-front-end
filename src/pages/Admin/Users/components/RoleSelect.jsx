/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import PropTypes from 'prop-types';

function RoleSelect({
  role = null,
  setValue = () => {},
  setSchoolBlock = () => {},
}) {
  const [checkedAdm, setCheckedAdm] = useState(false);
  const [checkedNutri, setCheckedNutri] = useState(false);
  const [checkedSchool, setCheckedSchool] = useState(false);
  const [checkedSupplier, setCheckedSupplier] = useState(false);

  useEffect(() => {
    switch (role) {
      case 'admin-nutri':
        setSchoolBlock(true);
        setCheckedAdm(true);
        setCheckedNutri(true);
        setCheckedSchool(false);
        setCheckedSupplier(false);
        break;
      case 'admin':
        setSchoolBlock(true);
        setCheckedAdm(true);
        setCheckedNutri(false);
        setCheckedSchool(false);
        setCheckedSupplier(false);
        break;
      case 'nutricionista':
        setSchoolBlock(true);
        setCheckedAdm(false);
        setCheckedNutri(true);
        setCheckedSchool(false);
        setCheckedSupplier(false);
        break;
      case 'gestor':
        setSchoolBlock(false);
        setCheckedAdm(false);
        setCheckedNutri(false);
        setCheckedSchool(true);
        setCheckedSupplier(false);
        break;
      case 'fornecedor':
        setSchoolBlock(true);
        setCheckedAdm(false);
        setCheckedNutri(false);
        setCheckedSchool(false);
        setCheckedSupplier(true);
        break;
      default:
        setCheckedAdm(false);
        setCheckedNutri(false);
        setCheckedSchool(false);
        setCheckedSupplier(false);
    }
  }, [role]);

  useEffect(() => {
    if (checkedAdm && checkedNutri) {
      setValue('admin-nutri');
    } else if (checkedAdm) {
      setValue('admin');
    } else if (checkedNutri) {
      setValue('nutricionista');
    } else if (checkedSchool) {
      setValue('gestor');
    } else if (checkedSupplier) {
      setValue('fornecedor');
    } else { setValue(''); }
  });

  const handleCheckAdm = () => {
    if (checkedAdm) {
      setCheckedAdm(false);
    } else {
      setSchoolBlock(true);
      setCheckedAdm(true);
      setCheckedSupplier(false);
      setCheckedSchool(false);
    }
  };

  const handleCheckNutri = () => {
    if (checkedNutri) {
      setCheckedNutri(false);
    } else {
      setSchoolBlock(true);
      setCheckedNutri(true);
      setCheckedSupplier(false);
      setCheckedSchool(false);
    }
  };

  const handleCheckSchool = () => {
    if (checkedSchool) {
      setCheckedSchool(false);
    } else {
      setSchoolBlock(false);
      setCheckedSchool(true);
      setCheckedAdm(false);
      setCheckedNutri(false);
      setCheckedSupplier(false);
    }
  };

  const handleCheckSupplier = () => {
    if (checkedSupplier) {
      setCheckedSupplier(false);
    } else {
      setSchoolBlock(true);
      setCheckedSupplier(true);
      setCheckedAdm(false);
      setCheckedSchool(false);
      setCheckedNutri(false);
    }
  };

  return (
    <div
      className="flex flex-col rounded-lg py-6 grow
      border border-[#ced4da] gap-8 justify-center items-center"
    >
      <div className="w-4/5 flex justify-between items-center gap-5">
        <label htmlFor="nutri">NUTRICIONISTA</label>
        <Checkbox
          inputId="nutri"
          name="nutri"
          value="nutri"
          checked={checkedNutri}
          onChange={handleCheckNutri}
        />
      </div>
      <div className="w-4/5 flex justify-between items-center gap-5">
        <label htmlFor="admin">ADMINISTRADOR</label>
        <Checkbox
          inputId="admin"
          name="admin"
          value="admin"
          checked={checkedAdm}
          onChange={handleCheckAdm}
        />
      </div>
      <div className="w-4/5 flex justify-between items-center gap-5">
        <label htmlFor="sschool">GESTOR</label>
        <Checkbox
          inputId="school"
          name="school"
          value="school"
          checked={checkedSchool}
          onChange={handleCheckSchool}
        />
      </div>
      <div className="w-4/5 flex justify-between items-center gap-5">
        <label htmlFor="admin">FORNECEDOR</label>
        <Checkbox
          inputId="supplier"
          name="supplier"
          value="supplier"
          checked={checkedSupplier}
          onChange={handleCheckSupplier}
        />
      </div>
    </div>
  );
}

RoleSelect.propTypes = {
  role: PropTypes.string,
  setValue: PropTypes.func,
  setSchoolBlock: PropTypes.func,
};

export default RoleSelect;
