import React from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import Password from './Password';
import ListCertificates from './ListCertificates';

function Form({
  func, cep, setInvalidFields,
}) {
  return (
    <form
      className="flex flex-col gap-10 mx-auto w-[90%] xl:w-[75%] h-full py-10"
    >
      <div className="flex justify-center">
        <span
          className="text-blue font-black text-2xl
          select-none"
        >
          DADOS GERAIS

        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="basis-3/12">
          <label
            htmlFor="cnpj"
            className="font-bold text-[--midnight]"
          >
            CNPJ
            <span className="text-red-500">*</span>
          </label>
          <InputMask
            type="text"
            autoClear
            onClick={(e) => {
              /*
              isso eh meio gambiarra pq quando clica o cursor tava indo pro final
              aí eu coloquei pra ir pro começo
              mas toda vez que clica ele vai pro começo
              o onFocus não funcionu
              */
              e.target.setSelectionRange(0, 0);
            }}
            placeholder="00.000.000/0001-00"
            mask="99.999.999/9999-99"
            slotChar="_"
            id="cnpj"
            required
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="grow">
          <label
            htmlFor="companyName"
            className="font-bold text-[--midnight]"
          >
            RAZÃO SOCIAL
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="companyName"
            className="w-full h-10"
            required
          />
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="basis-7/12">
          <label
            htmlFor="fantasyName"
            className="font-bold text-[--midnight]"
          >
            NOME FANTASIA
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="fantasyName"
            required
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="grow">
          <label
            htmlFor="stateRegistration"
            className="font-bold text-[--midnight]"
          >
            INSC. ESTADUAL
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="number"
            name=""
            id="stateRegistration"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="grow">
          <label
            htmlFor="cnae"
            className="font-bold text-[--midnight]"
          >
            CNAE
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="number"
            name=""
            id="cnae"
            className="w-full h-10"
          />
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="grow">
          <label
            htmlFor="zip"
            className="font-bold text-[--midnight]"
          >
            CEP

          </label>
          <InputMask
            type="text"
            mask="99999-999"
            id="zip"
            onBlur={cep}
            maxLength={9}
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="basis-5/12">
          <label
            htmlFor="street"
            className="font-bold text-[--midnight]"
          >
            LOGRADOURO
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="street"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="basis-1/12">
          <label
            htmlFor="number"
            className="font-bold text-[--midnight]"
          >
            Nº
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="number"
            name=""
            id="number"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="grow">
          <label
            htmlFor="district"
            className="font-bold text-[--midnight]"
          >
            BAIRRO/DISTRITO
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="district"
            className="w-full h-10"
          />
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="grow">
          <label
            htmlFor="city"
            className="font-bold text-[--midnight]"
          >
            MUNICÍPIO
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="city"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="basis-1/12">
          <label
            htmlFor="state"
            className="font-bold text-[--midnight]"
          >
            UF
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="state"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="basis-6/12">
          <label
            htmlFor="complement"
            className="font-bold text-[--midnight]"
          >
            COMPLEMENTO
          </label>
          <InputText
            type="text"
            name=""
            id="complement"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="basis-2/12">
          <label
            htmlFor="phone"
            className="font-bold text-[--midnight]"
          >
            TELEFONE
            <span className="text-red-500">*</span>
          </label>
          <InputMask
            type="phone"
            mask="(99) 9999-9999"
            id="phone"
          />
        </fieldset>
      </div>
      <div className="mt-10 mb-5 flex justify-center">
        <span
          className="text-blue font-black
        text-2xl select-none"
        >
          INFORMAÇÕES DE USUÁRIO
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="grow">
          <label
            htmlFor="techManagerr"
            className="font-bold text-[--midnight]"
          >
            RESPONSÁVEL (NOME COMPLETO)
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="text"
            name=""
            id="techManager"
            className="w-full h-10"
          />
        </fieldset>
        <fieldset className="basis-5/12">
          <label
            htmlFor="email"
            className="font-bold text-[--midnight]"
          >
            EMAIL
            <span className="text-red-500">*</span>
          </label>
          <InputText
            type="email"
            name=""
            placeholder="nome@email.com"
            id="email"
            className="w-full h-10"
          />
        </fieldset>
      </div>
      <Password setInvalidFields={setInvalidFields} />
      <div className="mt-10 mb-5 flex flex-col items-center">
        <p className="text-blue font-black text-2xl">CERTIDÕES</p>
        <p className="text-silver">CLIQUE EM UMA CERTIDÃO PARA INSERÍ-LA</p>
      </div>
      <ListCertificates func={func} />
    </form>
  );
}

Form.propTypes = {
  func: PropTypes.func.isRequired,
  cep: PropTypes.func.isRequired,
  setInvalidFields: PropTypes.func.isRequired,
};

export default Form;
