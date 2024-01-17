import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import LinkExternal from '../../../components/LinkExternal/linkExternal';
import './SuppliersHome.scss';
import { getExpirationCertificates } from '../../../api/certificateRequests';
import StatusBlock from './components/StatusBlock';
import SchoolList from './components/SchoolList';
import CertificateList from './components/CertificateList';
import { getOfferedSchools } from '../../../api/supplierRequests';
import { decryptUser } from '../../../utils/encryptId';
import { useCycle } from '../../../contexts/CycleContextProvider';

function SuppliersHome() {
  const authUser = useAuthUser();
  const { cycle } = useCycle();
  const userToken = authUser().token;
  const [nameSchool, setNameSchool] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const cycleId = localStorage.getItem('cycle');
  const [info, setInfo] = useState('');
  const [tagSeverity, setTagSeverity] = useState('PENDING');
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesData = await getExpirationCertificates(
          decryptUser(),
          userToken,
        );
        setCertificates(certificatesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolData = await getOfferedSchools(decryptUser(), userToken, cycleId);
        setNameSchool(schoolData);
      } catch (error) {
        console.error(error);
      }
    };

    if (cycle) {
      if (cycle.supplier === 'PENDING') {
        setInfo('As propostas serão abertas em breve.');
      }
      if (cycle.supplier === 'FINISHED') {
        setInfo('As propostas estão encerradas.');
      }
      if (cycle.supplier === 'OPEN') {
        setAvailable(true);
        setTagSeverity('OPEN');
        setInfo('As propostas estão abertas.');
        fetchSchools();
      }
      if (cycle.ended) {
        setTagSeverity('FINISHED');
      }
    }
  }, [cycle]);

  return (
    <div className="w-full mx-auto flex flex-col items-center pt-12 gap-12">
      <div className="w-10/12">
        <h1 className="text-blue text-3xl font-extrabold">
          DASHBOARD
        </h1>
      </div>

      <div className="flex flex-col lg:grid grid-template gap-20 2xl:gap-0 w-10/12">
        <div className="flex flex-col gap-4">
          <LinkExternal title="PROPOSTAS" link="/fornecedor/propostas" />
          <StatusBlock status={tagSeverity} targetDate="" />
          {available ? <SchoolList schoolList={nameSchool} />
            : <p className="text-concrete text-xl mt-6">{info}</p>}
        </div>
        <div className="flex justify-center">
          <div className="border-l-2 border-[--border] w-1" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <LinkExternal title="CERTIDÕES" link="/fornecedor/certidoes" />
          <CertificateList certificates={certificates} />
        </div>
      </div>
    </div>
  );
}

export default SuppliersHome;
