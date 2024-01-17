/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuthUser } from 'react-auth-kit';
import CertificateCard from '../../../../components/Certificate/CertificateCard';
import { downloadCertificate } from '../../../../api/certificateRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

function DownloadCertificateAdmin({ files }) {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { showToast } = useToast();

  const download = async (name) => {
    const file = files.find((f) => f.name === name);
    try {
      const data = await downloadCertificate(file.certificate_id, userToken);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) { showToast('error', 'ERRO', error.message); }
  };

  return (
    <div
      className="flex flex-col lg:flex-row flex-wrap
      items-center justify-center gap-20 lg:gap-6 lg:gap-y-12"
    >
      {files.length > 0 ? files.map((certificate) => (
        <CertificateCard
          key={certificate.required_certificate_id}
          requiredId={certificate.required_certificate_id}
          mode="view"
          requireDownload={download}
          name={certificate.name}
        />
      )) : <p className="text-concrete">Não há certidões cadastradas</p>}
    </div>

  );
}

DownloadCertificateAdmin.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DownloadCertificateAdmin;
