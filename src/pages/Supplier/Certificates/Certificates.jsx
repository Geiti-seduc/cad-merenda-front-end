import { React } from 'react';
import './Certificates.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import CertificateCard from '../../../components/certificate/CertificateCard';
import logo from '../../../assets/images/seducalagoaslogo.svg';

function Certificates() {
  const navigate = useNavigate();
  const amount = 4;
  const allFiles = [];

  const getFiles = (from, uploaded) => {
    console.log('Certificates got:', uploaded);

    const i = allFiles.findIndex((e) => e.from === from);
    // eslint-disable-next-line
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

  const handleClick = () => {
    if (allFiles.length !== amount) console.log('Invalid.', allFiles.length);
    else navigate('/login');
  };

  return (
    <div
      className="min-h-screen md:h-screen lg:h-fit flex
      gap-10 flex-col bg-[#005CA9] mt-0 text-md md:text-sm justify-between pb-10"
    >
      <div className="text-center md:mt-12 py-8 md:py-0">
        <p className="font-black text-white text-3xl md:text-4xl">
          cad
          <span className="text-[#FF9842] text-3xl sm:text-4xl">Merenda</span>
        </p>
      </div>
      <div
        className="flex flex-col justify-center items-center
      content-center bg-[#fff] h-fit w-full rounded-xl self-center xl:w-[80%]"
      >
        <div
          className="flex flex-col justify-center items-center gap-10
        mx-auto w-[90%] l:w-[75%] h-full py-10"
        >
          <div
            className="flex flex-col justify-center text-center
          items-center justify-center gap-3 mb-5"
          >
            <p className="text-[#005CA9] font-black text-2xl">CERTIDÕES</p>
            <p className="font-bold text-[#2C3E50] break-normal">
              CLIQUE EM UMA CERTIDÃO PARA INSERIR
            </p>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap">
            <CertificateCard name="CD MUNICIPAL" sendTo={ getFiles } />
            <CertificateCard name="CD ESTADUAL" sendTo={ getFiles } />
            <CertificateCard name="CD FEDERAL" sendTo={ getFiles } />
            <CertificateCard name="FGTS" sendTo={ getFiles } />
          </div>
          <button
            onClick={ handleClick }
            className="flex items-center gap-2
            justify-center bg-[#005CA9] h-[55px] w-[200px] font-bold
            text-white rounded-xl text-xl hover:bg-[#3B9DEF] transition mb-5"
          >
            <p>AVANÇAR</p>
            <ArrowForward />
          </button>
        </div>
      </div>
      <img
        className="hidden md:w-[35vw] md:mt-2 md:mb-10
        lg:w-[20vw] xl:w-[10vw] md:flex self-center md:justify-self-end"
        src={ logo }
        alt=""
      />
    </div>
  );
}

export default Certificates;
