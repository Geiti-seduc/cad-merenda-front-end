import React from 'react';
import PropTypes from 'prop-types';
import Password from './Password';
import Certificates from './Certificates';

function Form({ func, files, cep }) {
  return (
    <form
      className="flex flex-col gap-10 mx-auto w-[90%] xl:w-[75%] h-full py-10"
    >
      <div className="flex justify-center">
        <span className="text-[--blue] font-black text-2xl">DADOS GERAIS</span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="basis-3/12">
          <legend className="font-bold text-[--midnight]">
            CNPJ
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            placeholder="00.000.000/0001-00"
            id="cnpj"
            required
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">
            RAZÃO SOCIAL
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="razaoSocial"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
            required
          />
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="basis-7/12">
          <legend className="font-bold text-[--midnight]">
            NOME FANTASIA
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="nomeFantasia"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
            required
          />
        </fieldset>
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">
            INSC. ESTADUAL
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="number"
            name=""
            id="inscEstadual"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">
            CNAE
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="number"
            name=""
            id="cnae"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">CEP</legend>
          <input
            type="text"
            name=""
            id="cep"
            onBlur={ cep }
            maxLength={ 9 }
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="basis-5/12">
          <legend className="font-bold text-[--midnight]">
            LOGRADOURO
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="logradouro"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="basis-1/12">
          <legend className="font-bold text-[--midnight]">
            Nº
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="number"
            name=""
            id="numero"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">
            BAIRRO/DISTRITO
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="bairro"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">
            MUNICÍPIO
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="municipio"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="basis-1/12">
          <legend className="font-bold text-[--midnight]">
            UF
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="uf"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="basis-6/12">
          <legend className="font-bold text-[--midnight]">
            COMPLEMENTO
          </legend>
          <input
            type="text"
            name=""
            id="complemento"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="basis-2/12">
          <legend className="font-bold text-[--midnight]">
            TELEFONE
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="telefone"
            placeholder="(82) 3333-3333"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
      </div>
      <div className="mt-10 mb-5 flex justify-center">
        <span className="text-[--blue] font-black text-2xl">
          INFORMAÇÕES DE USUÁRIO
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <fieldset className="grow">
          <legend className="font-bold text-[--midnight]">
            RESPONSÁVEL (NOME COMPLETO)
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            name=""
            id="responsavel"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
        <fieldset className="basis-5/12">
          <legend className="font-bold text-[--midnight]">
            EMAIL
            <span className="text-red-500">*</span>
          </legend>
          <input
            type="email"
            name=""
            placeholder="nome@email.com"
            id="email"
            className="border rounded-lg w-full h-10 mt-1 pl-1 border-[--blue]"
          />
        </fieldset>
      </div>
      <Password />
      <div className="mt-10 mb-5 flex flex-col items-center">
        <p className="text-[--blue] font-black text-2xl">CERTIDÕES</p>
        <p className="text-[--silver]">CLIQUE EM UMA CERTIDÃO PARA INSERÍ-LA</p>
      </div>
      <Certificates func={ func } array={ files } />
    </form>
  );
}

Form.propTypes = {
  func: PropTypes.func.isRequired,
  cep: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  files: PropTypes.array.isRequired,
};

export default Form;
