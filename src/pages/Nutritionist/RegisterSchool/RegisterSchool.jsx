/* eslint-disable */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

function RegisterSchool() {
  const navigate = useNavigate();
  const [cepNotFound, setCepNotFound] = useState(false);
  const [invalidCnpj, setInvalidCnpj] = useState(false);
  const [invalidTel, setInvalidTel] = useState(false);
  const [mandatoryIsEmpty, setMandatoryEmpty] = useState(false);

  const handleCep = async (e) => {
    e.preventDefault();
    const cepValue = e.target.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cepValue}/json/`;
    const cepPattern = /^[0-9]{8}$/;

    if (cepPattern.test(cepValue)) {
      const data = await fetch(url);
      const endereco = await data.json();

      if (endereco.erro) {
        setCepNotFound(true);
      } else {
        document.getElementById('logradouro').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('municipio').value = endereco.localidade;
        document.getElementById('uf').value = endereco.uf;
        document.getElementById('numero').focus();
        document.getElementById('cep').value = endereco.cep;

        setCepNotFound(false);
      }
    } else {
      setCepNotFound(true);
    }
  };

  const handleClick = async () => {

    const nomeInstituicao = document.getElementById('nome-instituicao').value;
    const inep = document.getElementById('inep').value;
    const cnpj = handleCnpj();
    const gere = document.getElementById('gere').value;
    const email = document.getElementById('email').value;
    const telefone = handleTel();

    const cnae = document.getElementById('cnae').value;
    const responsavel = document.getElementById('responsavel').value;

    const cep = document.getElementById('cep').value.replace(/^a-zA-Z0-9 ]/g, '');
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const complemento = document.getElementById('complemento').value;

    if ((invalidCnpj) || (cepNotFound)) {
      if ((invalidCnpj)) console.log('Invalid CNPJ.');
      if ((cepNotFound)) console.log('Invalid CEP.');

      return;
    }


    const mandatory = [
      cnpj,
      razao_social,
      nome_fantasia,
      insc_estadual,
      cnae,
      cep,
      logradouro,
      numero,
      bairro,
      municipio,
      uf,
      email,
      responsavel
    ];

    mandatory.forEach(element => {
      console.log('ForEach: ' + element);

      if (element == '' || element == ' ') {
        setMandatoryEmpty(true);
      }
    });

    console.log(mandatoryIsEmpty);

    if (!(mandatoryIsEmpty)) {

      const supplier = {
        cnpj: cnpj,
        razao_social: razao_social,
        nome_fantasia: nome_fantasia,
        insc_estadual: insc_estadual,
        cnae: cnae,
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        municipio: municipio,
        uf: uf,
        complemento: complemento,
        telefone: telefone,
        email: email,
        responsavel: responsavel
      }

      console.log(supplier);
      navigate('/login');

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplier)
      };

      const response = await fetch('localhost:3001/suppliers', requestOptions);
      console.log(response);

    }
  }

  const handleCnpj = () => {
    const rawCnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
    if (rawCnpj.length !== 14) {
      setInvalidCnpj(true);
    }
    const cnpj = `${rawCnpj.substr(0, 2)}.${rawCnpj.substr(2, 3)}.${rawCnpj.substr(5, 3)}/${rawCnpj.substr(8, 4)}-${rawCnpj.substr(12)}`
    return cnpj;
  };

  const handleTel = () => {
    const tel = document.getElementById('telefone').value.replace(/\D/g, '');
    if (tel.length > 12) setInvalidTel(true);
    console.log(tel);
    return tel
  }

  return (
    <div className="h-fit md:h-screen lg:h-fit flex gap-10 flex-col  mt-0 text-md md:text-sm ">
      {/* Div do fomulario */}
      <div className="flex flex-col justify-center content-center bg-[#fff] h-fit w-full rounded-xl self-center xl:w-[80%]">

        <div className="flex flex-col gap-10 mx-auto w-[90%] xl:w-[75%] h-full py-10">
          <div className='flex justify-between'>
          <button className="text-[#95A5A6] text-xl pt-[1px] pl-2 font-bold "><ArrowBack /> VOLTAR</button>
          <div className='flex justify-end'>
            <span className="text-[#005CA9] font-black text-2xl">DADOS GERAIS</span>
            <div className="pl-3"><p className="bg-[#95A5A6] h-8 w-[1px]"></p></div>
            <span className="text-[#95A5A6] text-xl pt-[1px] pl-2">
              CADASTRAR ESCOLA
            </span>
          </div>
          </div>
          {/* <div className="flex justify-center">
            <span className="text-[#005CA9] font-black text-2xl">DADOS GERAIS</span>
          </div> */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <fieldset className="grow">
                <legend className="font-bold text-[#2C3E50]">
                  NOME DA INSTITUIÇÃO <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="nome-instituicao"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                  required
                />
              </fieldset>
              <fieldset className="basis-2/12">
                <legend className="font-bold text-[#2C3E50]">
                  INEP <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="inep"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="basis-3/12">
                <legend className="font-bold text-[#2C3E50]">
                  CNPJ
                </legend>
                <input
                  type="text"
                  name=""
                  placeholder="00.000.000/0001-00"
                  id="cnpj"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
                {/* {invalidCnpj && (
                  <p className="text-red-500 text-sm contents">
                    Digite um CNPJ valido
                  </p>
                )} */}
              </fieldset>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-5">
              <fieldset className="basis-1/12">
                <legend className="font-bold text-[#2C3E50]">
                  GERE <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="number"
                  name=""
                  id="gere"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="grow">
                <legend className="font-bold text-[#2C3E50]">
                  E-MAIL <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="nome_fantasia"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                  required
                />
              </fieldset>
              <fieldset className="basis-2/12">
                <legend className="font-bold text-[#2C3E50]">
                  TELEFONE <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="telefone"
                  placeholder='(82) 3333-3333'
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
                {invalidTel && (
                  <p className="text-red-500 text-sm contents">
                    Digite um número para contato válido.
                  </p>
                )}
              </fieldset>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-center border rounded-lg w-full h-16 border-[#005CA9]">
              {/* <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">How much do you expect to use each month?</h3>
<ul className="flex items-center md:flex-row justify-between  rounded-lg mt-1 pl-1">
    <li className="flex items-center md:flex-row justify-between">
        <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required/>
        <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-1 p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
        </label>
        <label htmlFor="hosting-small">REGULAR</label>
    </li>
    <li className="flex items-center">
        <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer"/>
        <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-1 p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
        </label>
        <label htmlFor="hosting-big">HÍBRIDO</label>
    </li>
</ul> */}
              <div className="flex items-center justify-center">
                <input id="1" type="checkbox" value="" className="custom-ck w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="1" className="ml-2 text-sm font-bold text-[#2C3E50]">REGULAR</label>
              </div>
              <div className="flex items-center ">
                <input id="2" type="checkbox" value="" className="custom-ck w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="2" className="ml-2 text-sm font-bold text-[#2C3E50]">INTEGRAL</label>
              </div>
              <div className="flex items-center ">
                <input id="3" type="checkbox" value="" className="custom-ck w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="3" className="ml-2 text-sm font-bold text-[#2C3E50]">HÍBRIDO</label>
              </div>
              <div className="flex items-center ">
                <input id="4" type="checkbox" value="" className="custom-ck w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="4" className="ml-2 text-sm font-bold text-[#2C3E50]">EJA</label>
              </div>
              <div className="flex items-center ">
                <input id="5" type="checkbox" value="" className="custom-ck w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="5" className="ml-2 text-sm font-bold text-[#2C3E50]">INDÍGENA</label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <fieldset className="grow">
                <legend className="font-bold text-[#2C3E50]">CEP</legend>
                <input
                  type="text"
                  onBlur={handleCep}
                  name=""
                  id="cep"
                  maxLength={9}
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
                {cepNotFound && (
                  <p className="text-red-500 text-sm contents">
                    Digite um CEP valido
                  </p>
                )}
              </fieldset>
              <fieldset className="basis-5/12">
                <legend className="font-bold text-[#2C3E50]">
                  LOGRADOURO <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="logradouro"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="basis-1/12">
                <legend className="font-bold text-[#2C3E50]">
                  Nº <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="number"
                  name=""
                  id="numero"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="grow">
                <legend className="font-bold text-[#2C3E50]">
                  BAIRRO/DISTRITO <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="bairro"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <fieldset className="grow">
                <legend className="font-bold text-[#2C3E50]">
                  MUNICÍPIO <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="municipio"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="basis-1/12">
                <legend className="font-bold text-[#2C3E50]">
                  UF  <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="uf"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="basis-6/12">
                <legend className="font-bold text-[#2C3E50]">
                  COMPLEMENTO
                </legend>
                <input
                  type="text"
                  name=""
                  id="complemento"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
            </div>
            {/* <div className="flex flex-col md:flex-row justify-between gap-5">
              <fieldset className="basis-5/12">
                <legend className="font-bold text-[#2C3E50]">
                EMAIL <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="email"
                  name=""
                  placeholder='nome@email.com'
                  id="email"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
              <fieldset className="grow">
                <legend className="font-bold text-[#2C3E50]">
                  RESPONSÁVEL (NOME COMPLETO) <span className='text-red-500'>*</span>
                </legend>
                <input
                  type="text"
                  name=""
                  id="responsavel"
                  className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
                />
              </fieldset>
            </div> */}
            {mandatoryIsEmpty && (
              <p className='text-red-500 font-bold'>* Preencha os campos obrigatórios.</p>
            )}
          </div>
          <div className="mt-3 md:mt-5 md:mb-5 flex justify-center">
            <button
              onClick={handleClick}
              className="flex items-center gap-2 justify-center bg-[#005CA9] h-[55px] w-[200px] font-bold text-white rounded-xl text-xl hover:bg-[#3B9DEF] transition">
              <p>AVANÇAR</p>
              <ArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// VIA CEP --> LOGRADOURO, BAIRRO, CIDADE, ESTADO, CODIGO IBGE
// PEGAR REGIAO INTERMEDIARIA E IMEDIATA DO IBGE UTILIZANDO O CODIGO IBGE

export default RegisterSchool;
