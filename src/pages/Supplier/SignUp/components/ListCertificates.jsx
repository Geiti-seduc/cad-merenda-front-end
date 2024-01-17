import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CertificateCard from '../../../../components/Certificate/CertificateCard';
import { fetchCertificates } from '../../../../api/certificateRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function ListCertificates({ func }) {
  const [certificates, setCertificates] = useState([]);
  const { showToast } = useToast();

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const data = await fetchCertificates();
          setCertificates(data);
          localStorage.setItem('certificates', data.length);
        } catch (error) {
          showToast('error', 'Erro', error.message);
        }
      };
      fetchData();
    },
    [],
  );

  return (
    <div
      className="mt-2 flex w-full items-center lg:justify-center
      flex-col gap-5 md:flex-row md:justify-center md:flex-wrap lg:flex-row lg:flex-wrap"
    >
      {certificates.map((certificate) => (
        <CertificateCard
          name={certificate.name}
          requiredId={certificate.id}
          key={certificate.name}
          sendTo={func}
        />
      ))}
    </div>
  );
}

ListCertificates.propTypes = {
  func: PropTypes.func.isRequired,
};

export default ListCertificates;
