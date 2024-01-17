/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import PropTypes from 'prop-types';
import { getExpirationCertificates } from '../../../../api/certificateRequests';
import { decryptUser } from '../../../../utils/encryptId';
import { decideState } from '../../../../utils/certificateState';
import CertificateCard from '../../../../components/Certificate/CertificateCard';
import { useToast } from '../../../../contexts/ToastContextProvider';

function UpdateCertificateList({ filesFunction }) {
  const authUser = useAuthUser();
  const { showToast } = useToast();
  const [certificateList, setCertificateList] = useState([]);

  useEffect(() => {
    const fetchSupplierCertificates = async (id, token) => {
      try {
        const res = await getExpirationCertificates(id, token);
        setCertificateList(res);
      } catch (error) {
        showToast('error', 'Erro', 'Não foi possível carregar as certidões');
      }
    };

    fetchSupplierCertificates(decryptUser(), authUser().token);
  }, []);

  return (
    <div
      className="flex flex-col lg:flex-row flex-wrap
      items-center justify-center gap-20 lg:gap-6 lg:gap-y-12"
    >
      {
        certificateList.length > 0 ? certificateList.map((certificate) => (
          <CertificateCard
            key={certificate.required_certificate_id}
            sendTo={filesFunction}
            name={certificate.name}
            date={certificate.expiration ? certificate.expiration : null}
            requiredId={certificate.required_certificate_id || certificate.id}
            state={
              certificate.expiration ? decideState(certificate.expiration) : 'missing'
            }
          />
        )) : <p className="text-concrete">Não há certidões cadastradas</p>
      }
    </div>
  );
}

UpdateCertificateList.propTypes = {
  filesFunction: PropTypes.func.isRequired,
};

export default UpdateCertificateList;
