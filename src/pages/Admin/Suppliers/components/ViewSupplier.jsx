import React, { useState, useEffect } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import Info from '../../../../components/FormFields/SupplierInfo';
import { getSupplierById } from '../../../../api/supplierRequests';
import { getExpirationCertificates } from '../../../../api/certificateRequests';
import DownloadCertificateAdmin from './DownloadCertificateAdmin';
import { getAddressById } from '../../../../api/addressRequests';
import { useToast } from '../../../../contexts/ToastContextProvider';

export default function ViewSupplier() {
  const location = useLocation();
  const supplierId = location.pathname.split('/')[3];
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { showToast } = useToast();
  // eslint-disable-next-line no-unused-vars
  const [supplier, setSupplier] = useState({});
  const [address, setAddress] = useState({});
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  const items = [
    {
      label: 'Fornecedores',
      command: () => { navigate('/admin/fornecedores'); },
    },
    { label: 'Fornecedor' },
  ];

  const home = { label: 'Página Inicial', command: () => { navigate('/admin'); } };

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const supplierData = await getSupplierById(supplierId, userToken);
        setSupplier(supplierData);
        const addressData = await getAddressById(supplierData.address_id, userToken);
        setAddress(addressData);
        const certificatesData = await getExpirationCertificates(
          supplierData.user_id,
          userToken,
        );
        setCertificates(certificatesData);
      } catch (error) {
        showToast('error', 'ERRO', error.message);
      }
    };

    getSupplier();
  }, []);

  return (
    <div
      className="flex flex-col mx-auto py-12
      w-10/12 items-center justify-center"
    >
      <div className="w-full">
        <BreadCrumb model={items} home={home} />
      </div>
      <div
        className="flex items-center justify-between
        text-xl w-full sm:text-2xl text-blue
        font-extrabold py-7  border-b border-silver"
      >
        <h1>INFORMAÇÕES GERAIS</h1>
      </div>

      <Info supplier={supplier} address={address} />
      <div
        className="text-xl w-full sm:text-2xl text-blue
        font-extrabold py-7 border-b border-silver mb-8"
      >
        <h1>CERTIDÕES</h1>
      </div>
      <DownloadCertificateAdmin files={certificates} />
    </div>
  );
}
