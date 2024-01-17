import React from 'react';
import PropTypes from 'prop-types';
import InfoField from './InfoField';
import Loading from '../../assets/images/LOADING.svg';

function Info({ supplier, address }) {
  if (supplier === null || address === null) {
    return (
      <div className="flex gap-8 items-center flex content-center justify-center p-20">
        <img src={Loading} alt="" className="animate-spin" />
      </div>
    );
  }
  return (
    <form
      className="flex gap-4 flex-col w-full
      py-7 border-b border-silver md:flex-row md:flex-wrap"
    >
      <InfoField
        id="CNPJ"
        value={supplier.cnpj}
        classes="basis-1/4 grow"
      />
      <InfoField
        id="razaoSocial"
        label="RAZÃO SOCIAL"
        value={supplier.trade_name}
        classes="grow"
      />
      <InfoField
        id="nomeFantasia"
        label="NOME FANTASIA"
        value={supplier.company_name}
        classes="basis-3/4 grow"
      />
      <InfoField
        id="inscEstadual"
        label="INSC ESTADUAL"
        value={supplier.state_registration}
        classes="grow"
      />
      <InfoField
        id="cnae"
        value={supplier.cnae}
        classes="basis-1/5"
      />
      <InfoField
        id="zip"
        label="CEP"
        classes="grow"
        value={address.zip}
      />
      <InfoField
        id="street"
        label="LOGRADOURO"
        value={address.street}
        classes="basis-3/5 grow"
      />
      <InfoField
        id="number"
        label="Nº"
        classes="basis-1/12"
        value={address.number}
      />
      <InfoField
        id="district"
        label="BAIRRO/DISTRITO"
        classes="basis-1/3"
        value={address.district}
      />
      <InfoField
        id="city"
        label="MUNICÍPIO"
        classes="grow"
        value={address.city}
      />
      <InfoField
        id="state"
        label="UF"
        classes="basis-1/12"
        value={address.state}
      />
      <InfoField
        id="complement"
        label="COMPLEMENTO"
        classes="basis-full"
        value={address.complement}
      />
      <InfoField
        id="phone"
        label="TELEFONE"
        classes="basis-1/5"
        value={supplier.phone}
      />
      <InfoField
        id="email"
        label="EMAIL"
        classes="grow"
        value={supplier.email}
      />
      <InfoField
        id="tech_manager"
        label="RESPONSÁVEL"
        classes="basis-1/3"
        value={supplier.tech_manager}
      />
    </form>
  );
}

Info.propTypes = {
  supplier: PropTypes.any.isRequired,
  address: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Info;
