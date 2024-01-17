import React from 'react';
import { useAuthUser } from 'react-auth-kit';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from 'primereact/button';
import UpdateCertificateList from './components/UpdateCertificateList';
import { decryptUser } from '../../../utils/encryptId';
import { useToast } from '../../../contexts/ToastContextProvider';

function UpdateCertificates() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [uploadList, setUploadList] = React.useState([]);
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

  const handleClick = () => {
    uploadList.forEach(async (certificate) => {
      if (!certificate.verify()) {
        showToast('error', 'Erro', 'Preencha todas as datas de validade.');
      }
      certificate.setUserId(decryptUser());
      certificate.log();

      try {
        await certificate.PUT(userToken);
        showToast('success', 'Feito!', 'Certidão atualizada com sucesso');
      } catch (error) {
        showToast('error', 'Erro', 'Não foi possível atualizar a certidão.');
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-12 mx-auto pt-12">
      <div className="flex items-center lg:flex-row flex-col w-10/12 gap-4">
        <p className="text-blue font-black text-2xl">CERTIDÕES</p>
        <p className="hidden lg:block font-light text-silver text-xl">|</p>
        <p className="text-concrete">Clique em uma certidão para atualizá-la.</p>
      </div>
      <div
        className="border border-border w-10/12 rounded-lg py-16 flex
        justify-center items-center"
      >
        <UpdateCertificateList filesFunction={getFiles} />
      </div>
      <div
        className="flex flex-col items-center justify-center w-full sm:w-auto mt-3"
      >
        <Button
          icon={<SaveIcon className="mr-4" />}
          label="ENVIAR"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default UpdateCertificates;
