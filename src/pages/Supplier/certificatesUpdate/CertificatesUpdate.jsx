/* eslint-disable */

import React from 'react';
import { useState } from 'react';
import './certificatesUpdate.scss';
import { useNavigate } from 'react-router-dom';
import Certificate from '../../../components/certificate/CertificateCard';
import SaveIcon from '@mui/icons-material/Save';
import Button from '../../../components/button/Button';

function CertificatesUpdate() {
  const [files, setFiles] = useState(null)
  const navigate = useNavigate();
  const amount = 4;
  const allFiles = [];

  const getFiles = (from, uploaded) => {
    console.log('Certificates got:', uploaded);

    const i = allFiles.findIndex((e) => e.from === from);
    if (i > -1) {
      allFiles[i].uploaded = uploaded;
      console.log('Replaced!');
    } else {
      allFiles.push({
        uploaded,
        from,
      });
    }

    console.log(allFiles);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0])
  }

  const handleClick = async (e) => {
    const formData = new FormData();
    formData.append('pdf', files)

    fetch('http://localhost:3001/upload/12345', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      console.log('Pdf enviado com sucesso. Res: ', response);
    }).catch((error) => {
      console.log('Erro ao enviar pdf: ', error);
    })
  };
  return (
    <main className="certificatesUpdate min-h-screen">
      <div className="flex flex-col items-center justify-center mx-auto">
        <div className="w=[80vw] flex flex-col sm:min-h-[80vh] sm:justify-around">
          <div className="title flex justify-center w-full lg:justify-start">
            <h1
              className="text-3xl
              ml-2
              my-6
              sm:text-4xl
              font-extrabold
              text-[--blue]
              border-b-2
              pb-4"
            >
              CERTIDÕES

            </h1>
          </div>
          <div
            className="sectionCertificates
            flex
            flex-col
            flex-nowrap
            md:flex-wrap
            md:justify-center
            sm:items-center
            sm:flex-row"
          >
            <Certificate
              name="CND MUNICIPAL"
              padding="p-2"
              state="naoEnviado"
              sendTo={ getFiles }
            />
            <Certificate
              name="CND ESTADUAL"
              padding="p-2"
              state="enviado"
              sendTo={ getFiles }
            />
            <Certificate
              name="CND FEDERAL"
              padding="p-2"
              state="corrigir"
              sendTo={ getFiles }
            />
            <Certificate
              name="CND TRABALHISTA"
              padding="p-2"
              state="corrigir"
              sendTo={ getFiles }
            />
            <Certificate
              name="CND FGTS"
              padding="p-2"
              state="enviado"
              sendTo={ getFiles }
            />
          </div>
          <div>
            <input type="file" accept='.pdf' onChange={handleFileChange}/>
            <button onClick={handleClick}>Clica desgraça</button>
          </div>
          <div
            className="container-button-salvar w-full sm:w-auto mt-3"
            onClick={ handleClick }
          >
            <Button
              icon={ <SaveIcon /> }
              content="ENVIAR"
              color="--white"
              active="--white"
              border="border-[1px]"
              borderColor="--blue"
              background="--blue"
              radius="rounded-2xl"
            />
          </div>
        </div>

      </div>
    </main>
  );
}

export default CertificatesUpdate;
