/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable camelcase */
// Components
import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import LinkExternal from '../../../components/linkExternal/linkExternal';
import CertificateBox from '../../../components/certificateBox/certificateBox';
import './SuppliersHome.scss';

function SuppliersHome() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [nameSchool, setNameSchool] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSchool = await fetch('http://localhost:3001/school', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        });
        const dataSchool = await responseSchool.json();
        setNameSchool(dataSchool);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="suppliersHome_page">
      <div className="wrapper max-w-[1920px]">
        <div className="title-container">
          <h1
            className="text-[#005CA9] text-3xl
          font-extrabold"
          >
            BEM VINDO, EMPRESA!
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-20 2xl:gap-0 2xl:grid-cols-2 w-full">
          <div className="flex flex-col border-r-2 justify-center gap-4">
            <LinkExternal title="PROPOSTAS" />

            <div className="flex items-center justify-between mr-10">
              <span className="span-processo font-medium">PROCESSO ABERTO</span>
              <p className="text-[#95A5A6]">ENCERRA EM HH:MM:SS</p>
            </div>

            <div className="lista-escolas">
              <ul>
                {nameSchool.map((school, index) => (

                  <li key={ index }>
                    <p>{ school.name }</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="flex flex-col 2xl:ml-20">
            <div className="flex flex-col px-4">
              <div className="flex gap-4 items-center pb-[20px]">
                <LinkExternal title="CERTIDÕES" />
              </div>

              <div
                className="grid grid-cols-1
              lg:grid-cols-2 2xl:grid-cols-2 gap-y-2 max-w-[600px]"
              >
                <a href="#">
                  <CertificateBox
                    name_cnd="CND MUNICIPAL"
                    due_date="21/07/23"
                    type_ex={ 1 }
                    color_span={ 1 }
                  />
                </a>

                <a href="#">
                  <CertificateBox
                    name_cnd="CND ESTADUAL"
                    due_date="21/07/23"
                    type_ex={ 0 }
                    color_span={ 0 }
                  />
                </a>

                <a href="#">
                  <CertificateBox
                    name_cnd="CND FEDERAL"
                    due_date="21/07/23"
                    type_ex={ 2 }
                    color_span={ 2 }
                  />
                </a>

                <a href="#">
                  <CertificateBox
                    name_cnd="CND TRABALHISTA"
                    due_date="21/07/23"
                    type_ex={ 2 }
                    color_span={ 2 }
                  />
                </a>

                <a href="#">
                  <CertificateBox
                    name_cnd="CND FGTS"
                    due_date="21/07/23"
                    type_ex={ 0 }
                    color_span={ 0 }
                  />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SuppliersHome;
