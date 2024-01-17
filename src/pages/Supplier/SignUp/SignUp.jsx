/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */

import { React, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Form from './components/Form';
import CadMerenda from './components/cadMerenda';
import Supplier from '../../../utils/models/Supplier';
import logo from '../../../assets/images/seducalagoaslogo.svg';
import { getCep } from '../../../api/external/locationRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function SignUp() {
  const [invalidFields, setInvalidFields] = useState(false);
  const numberOfCertificates = localStorage.getItem('certificates');
  const [uploadList, setUploadList] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const getFiles = (certificate) => {
    const i = uploadList.findIndex((e) => e.name === certificate.name);
    // eslint-disable-next-line no-magic-numbers
    if (i > -1) {
      const newFiles = [...uploadList];
      newFiles[i] = certificate;
      setUploadList(newFiles);
    } else {
      certificate.setExpiration(
        document.getElementById(certificate.name).getCurrentDate,
      );
      setUploadList([...uploadList, certificate]);
    }
  };

  const handleCep = async (e) => {
    try {
      await getCep(e);
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }
  };

  const handleClick = async () => {
    const supplier = new Supplier();

    try {
      supplier.verifyBlankFields();
    } catch (error) {
      showToast('error', 'Erro', error.message);
      return;
    }

    if (invalidFields) {
      showToast('error', 'Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (uploadList.length !== parseInt(numberOfCertificates, 10)) {
      showToast('error', 'Erro', 'Envie todas as certidões.');
      return;
    }

    uploadList.forEach((certificate) => {
      if (!certificate.verify()) {
        showToast('error', 'Erro', 'Preencha todas as datas de validade.');
        setInvalidFields(true);
      }
    });

    try {
      const res = await supplier.POST();
      uploadList.forEach(async (certificate) => {
        certificate.setUserId(res.newUser.id);
        certificate.log();
        await certificate.POST();
      });
      showToast('success', 'Feito!', 'Cadastro realizado com sucesso');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 second delay
    } catch (error) {
      showToast('error', 'Erro', error.message);
    }
  };

  return (
    <div
      className="min-h-screen md:min-h-screen lg:min-h-screen flex
      gap-10 flex-col bg-blue mt-0 text-md md:text-sm"
    >
      <CadMerenda />
      <div
        className="flex flex-col justify-center items-center pb-20
        bg-[#fff] h-fit w-full rounded-xl self-center xl:w-[80%] pt-10 mb-10"
      >
        <Form
          func={getFiles}
          cep={handleCep}
          setInvalidFields={setInvalidFields}
        />
        <Button
          icon={<ArrowForward className="p-button-icon-right" />}
          size="large"
          iconPos="right"
          label="AVANÇAR"
          onClick={handleClick}
        />
      </div>
      <img
        className="h-20 mb-10 md:w-[h-60] md:mt-2 md:mb-10
        md:flex self-center md:justify-self-end"
        src={logo}
        alt=""
      />
    </div>
  );
}

export default SignUp;
