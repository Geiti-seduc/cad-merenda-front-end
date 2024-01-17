/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import Loading from '../../../../assets/images/LOADING.svg';
import EditModality from './EditModality';
import * as parser from '../../../../utils/DataParser';
import FormLabel from '../../../../components/FormFields/FormLabel';
import { useToast } from '../../../../contexts/ToastContextProvider';

function EditFields({
  data,
  modalityGetter,
  modalitySetter,
  geeList,
  geeFunc: sendGee,
}) {
  const { showToast } = useToast();
  const [selectedGee, setSelectedGee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localGee, setLocalGee] = useState(null);
  const [valueCopy, setValueCopy] = useState(null);

  const setValuesToFields = () => {
    const schoolFields = document.querySelectorAll('.school-field');
    schoolFields.forEach((field) => {
      const { id } = field;
      const value = data[id];
      if (value) {
        field.value = value;
      }
    });

    const addressFields = document.querySelectorAll('.address-field');
    addressFields.forEach((field) => {
      const { id } = field;
      const value = data.Address[id];
      if (value) {
        field.value = value;
      }
    });
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setSelectedGee(data.geeId);
      setValuesToFields();
      setIsLoading(false);
    }
  }, [data, setValuesToFields]);

  const handleInputFocus = (e) => {
    const { value } = e.target;
    setValueCopy(value);
  };

  const handleInputBlur = (e) => {
    const { value } = e.target;
    const raw = value.replace(/_/g, '');
    if (!raw || raw === '') {
      e.value = valueCopy;
    }
    setValueCopy(null);
  };

  const handleGeeChange = (e) => {
    setLocalGee(e.value);
    sendGee(e.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <img src={Loading} alt="Carregando" className="animate-spin" />
      </div>
    );
  }

  return (
    <form
      className="flex w-full info gap-4
      flex-wrap py-7"
    >
      <div className="flex flex-col gap-1 grow basis-3/4">
        <FormLabel htmlFor="name" small>
          NOME DA INSTITUIÇÃO
        </FormLabel>
        <InputText
          className="school-field"
          type="text"
          id="name"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="inep" small>INEP</FormLabel>
        <InputText
          className="school-field"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          type="text"
          id="inep"
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/3">
        <FormLabel htmlFor="CNPJ" small>CNPJ</FormLabel>
        <InputMask
          type="text"
          className="school-field"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onClick={(e) => { e.target.setSelectionRange(0, 0); }}
          placeholder="00.000.000/0001-00"
          mask="99.999.999/9999-99"
          slotChar="_"
          id="cnpj"
          required
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/12">
        <FormLabel htmlFor="GEE" small>GEE</FormLabel>
        <Dropdown
          value={localGee || selectedGee}
          onChange={handleGeeChange}
          options={geeList}
          optionLabel="name"
          optionValue="id"
        />
      </div>
      <div className="flex flex-col gap-1 basis-2/12">
        <FormLabel htmlFor="phone" small>TELEFONE</FormLabel>
        <InputMask
          type="text"
          className="school-field"
          mask="(99) 99999-9999"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          id="phone"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="email" small>EMAIL</FormLabel>
        <InputText
          type="text"
          id="email"
          className="school-field"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="nome@email.com"
        />
      </div>
      <div className="grow lg: basis-full mt-2">
        <FormLabel htmlFor="modalities" small>MODALIDADES</FormLabel>
        <EditModality getter={modalityGetter} setter={modalitySetter} />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="CEP" small>CEP</FormLabel>
        <InputMask
          id="zip"
          type="text"
          mask="99999-999"
          className="address-field"
          onBlur={(e) => {
            parser.handleCep(e, showToast);
          }}
          maxLength={9}
        />
      </div>
      <div className="flex flex-col gap-1 basis-3/5">
        <FormLabel htmlFor="logradouro" small>LOGRADOURO</FormLabel>
        <InputText
          className="address-field"
          type="text"
          id="street"
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/12">
        <FormLabel htmlFor="number" small>Nº</FormLabel>
        <InputText
          className="address-field"
          type="text"
          id="number"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="bairro" small>BAIRRO/DISTRITO</FormLabel>
        <InputText
          className="address-field"
          type="text"
          id="district"
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/4">
        <FormLabel htmlFor="municipio" small>
          MUNICÍPIO
        </FormLabel>
        <InputText
          className="address-field"
          type="text"
          id="city"
        />
      </div>
      <div className="flex flex-col gap-1 lg:w-[5%]">
        <FormLabel htmlFor="uf" small>UF</FormLabel>
        <InputText
          className="address-field"
          type="text"
          id="state"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="complemento" small>COMPLEMENTO</FormLabel>
        <InputText
          className="address-field"
          type="text"
          id="complement"
        />
      </div>
    </form>
  );
}

EditFields.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  modalityGetter: PropTypes.array.isRequired,
  modalitySetter: PropTypes.func.isRequired,
  geeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  geeFunc: PropTypes.func.isRequired,
};

export default EditFields;
