import React from 'react';
import PropTypes from 'prop-types';
import CertificateCard from '../../../../components/certificate/CertificateCard';

function Certificates({ func }) {
  return (
    <div
      className="mt-2 flex w-full items-center lg:justify-center
      flex-col gap-5 md:flex-row md:justify-center md:flex-wrap lg:flex-row lg:flex-wrap"
    >
      <CertificateCard name="CD MUNICIPAL" sendTo={ func } />
      <CertificateCard name="CD ESTADUAL" sendTo={ func } />
      <CertificateCard name="CD FEDERAL" sendTo={ func } />
      <CertificateCard name="FGTS" sendTo={ func } />
    </div>
  );
}

Certificates.propTypes = {
  func: PropTypes.func.isRequired,
};

export default Certificates;
