/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import PropTypes from 'prop-types';
import ModalityFields from './ModalityFields';
import * as parser from '../../../../utils/DataParser';
import FormLabel from '../../../../components/FormFields/FormLabel';
import { useToast } from '../../../../contexts/ToastContextProvider';

function Fields({
  modalityGetter,
  modalitySetter,
  geeList,
  geeFunc: sendGee,
}) {
  const { showToast } = useToast();
  const [selectedGee, setSelectedGee] = useState([]);
  const handleGeeChange = (e) => {
    setSelectedGee(e.value);
    sendGee(e.value);
  };

  return (
    <form
      className="flex w-full info gap-4
      flex-wrap py-7"
    >
      <div className="flex flex-col gap-1 grow basis-1/2">
        <FormLabel htmlFor="name" small>
          NOME DA INSTITUIÇÃO
        </FormLabel>
        <InputText
          type="text"
          id="name"
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/6">
        <FormLabel htmlFor="inep" small>INEP</FormLabel>
        <InputText
          type="text"
          id="inep"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="CNPJ" small>CNPJ</FormLabel>
        <InputMask
          type="text"
          autoClear
          onClick={(e) => { e.target.setSelectionRange(0, 0); }}
          placeholder="00.000.000/0001-00"
          mask="99.999.999/9999-99"
          slotChar="_"
          id="cnpj"
          required
        />
      </div>
      <div className="flex flex-col gap-1 w-30">
        <FormLabel htmlFor="GEE" small>GEE</FormLabel>
        <Dropdown
          value={selectedGee}
          onChange={handleGeeChange}
          options={geeList}
          optionLabel="name"
        />
      </div>
      <div className="flex flex-col gap-1 grow lg:w-[20%]">
        <FormLabel htmlFor="phone" small>TELEFONE</FormLabel>
        <InputMask
          type="text"
          mask="(99) 99999-9999"
          id="phone"
        />
      </div>
      <div className="flex flex-col gap-1 grow lg:w-[50%]">
        <FormLabel htmlFor="email" small>EMAIL</FormLabel>
        <InputText
          type="text"
          id="email"
          placeholder="nome@email.com"
        />
      </div>
      <div className="grow lg: w-[90%] mt-2">
        <ModalityFields getter={modalityGetter} setter={modalitySetter} />
      </div>
      <div className="flex flex-col gap-1 basis-1/10">
        <FormLabel htmlFor="CEP" small>CEP</FormLabel>
        <InputMask
          type="text"
          mask="99999-999"
          id="zip"
          onBlur={(e) => {
            parser.handleCep(e, showToast);
          }}
          maxLength={9}
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/2">
        <FormLabel htmlFor="logradouro" small>LOGRADOURO</FormLabel>
        <InputText
          type="text"
          id="street"
        />
      </div>
      <div className="flex flex-col gap-1 lg:w-[5%]">
        <FormLabel htmlFor="number" small>Nº</FormLabel>
        <InputText
          type="text"
          id="number"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="bairro" small>BAIRRO/DISTRITO</FormLabel>
        <InputText
          type="text"
          id="district"
        />
      </div>
      <div className="flex flex-col gap-1 basis-1/4">
        <FormLabel htmlFor="municipio" small>MUNICÍPIO</FormLabel>
        <InputText
          type="text"
          id="city"
        />
      </div>
      <div className="flex flex-col gap-1 lg:w-[5%]">
        <FormLabel htmlFor="uf" small>UF</FormLabel>
        <InputText
          type="text"
          id="state"
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <FormLabel htmlFor="complemento" small>COMPLEMENTO</FormLabel>
        <InputText
          type="text"
          id="complement"
        />
      </div>
    </form>
  );
}

Fields.propTypes = {
  modalityGetter: PropTypes.array.isRequired,
  modalitySetter: PropTypes.func.isRequired,
  geeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  geeFunc: PropTypes.func.isRequired,
};

export default Fields;
