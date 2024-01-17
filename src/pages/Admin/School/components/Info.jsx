import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../../assets/images/LOADING.svg';
import ModalityInfo from '../../../../components/FormFields/ModalityInfo';
import InfoField from '../../../../components/FormFields/InfoField';

function Info({ school, address = null }) {
  if (!school || !address) {
    return (
      <div className="flex justify-center items-center h-52">
        <img src={Loading} alt="Carregando" className="animate-spin" />
      </div>
    );
  }

  return (
    <form
      className="flex flex-col lg:flex-row w-4/5 info gap-4
      flex-wrap py-7 border-b border-silver"
    >
      <InfoField
        id="name"
        label="NOME DA INSTITUIÇÃO"
        value={school.name}
        classes="basis-3/4"
      />
      <InfoField
        id="inep"
        value={school.inep}
        classes="grow"
      />
      <InfoField
        id="cnpj"
        value={school.cnpj}
        classes="basis-1/3"
      />
      <InfoField
        id="gee"
        value={school.gee}
        classes="basis-1/12"
      />
      <InfoField
        id="phone"
        label="TELEFONE"
        value={school.phone}
        classes="basis-2/12"
      />
      <InfoField
        id="email"
        label="EMAIL"
        classes="grow"
        value={school.email}
      />
      <div className="grow lg:basis-full mt-2">
        <ModalityInfo values={school.modalities} />
      </div>
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
        classes="basis-3/5"
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
        classes="basis-2/12"
        value={address.state}
      />
      <InfoField
        id="complement"
        label="COMPLEMENTO"
        classes="basis-full"
        value={address.complement}
      />
    </form>
  );
}

Info.propTypes = {
  school: PropTypes.object,
  address: PropTypes.object,
};

export default Info;
