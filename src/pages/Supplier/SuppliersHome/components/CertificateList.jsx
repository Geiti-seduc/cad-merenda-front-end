/* eslint-disable no-magic-numbers */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CertificateBox from '../../../../components/CertificateBox/CertificateBox';
import { decideState } from '../../../../utils/certificateState';

function CertificateList({ certificates }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 w-full
        2xl:grid-cols-2 gap-y-10 max-w-[600px]"
    >
      {certificates.map((certificate, index) => (
        <div key={certificate.name + index}>
          <CertificateBox
            name={certificate.name}
            date={certificate.expiration}
            state={decideState(certificate.expiration)}
          />
        </div>
      ))}
    </div>
  );
}

CertificateList.propTypes = {
  certificates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CertificateList;
