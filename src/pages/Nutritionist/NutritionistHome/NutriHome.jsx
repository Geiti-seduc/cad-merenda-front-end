/* eslint-disable */
import {React, useState, useEffect} from 'react';
import StatusTag from '../../../components/StatusTag/StatusTag'
import LaunchIcon from '@mui/icons-material/Launch';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { useAuthUser } from 'react-auth-kit';
import { Column } from 'primereact/column';
import SearchIcon from '@mui/icons-material/Search';
import 'primereact/resources/primereact.css';


function NutriHome() {
  const authUser = useAuthUser();
  const time = new Date('December 31, 2023 23:59:59');
  const [globalFilterValue, setGlobalFilterValue] = useState('');
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
    <div className='flex flex-col justify-start'>
      <main className="flex flex-col mx-auto w-[80vw]">
        <div className="flex flex-col lg:flex-row h-1/2 w-full"> {/* TOP */}
          <div className="flex flex-col justify-between w-full mt-3 lg:w-1/2 lg:p-5">{/* TOP LEFT */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className='font-black text-[--blue] text-2xl whitespace-nowrap sm:mr-2'>CICLO ATUAL</p>
              <p className='font-thin text-[--silver] text-3xl hidden sm:block'> | </p>
              <p className='font-regular text-[--concrete] sm:text-center text-sm sm:ml-2'> As escolas estão organizando seus pedidos. </p>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col w-full my-3">
                <div className='flex items-center justify-between sm:justify-start w-full py-2'>
                  <StatusTag text='FINALIZADO' />
                  <p className='font-bold text-[--midnight] text-lg leading-none sm:ml-8'>PAUTAS</p>
                </div>
                <div className='flex items-center justify-between sm:justify-start w-full py-2'>
                  <StatusTag text='ABERTO' />
                  <p className='font-bold text-[--midnight] text-lg leading-none py-2 sm:ml-8'>ESCOLAS</p>
                </div>
                <div className='flex items-center justify-between sm:justify-start w-full py-2'>
                  <StatusTag text='EM AGUARDO' />
                  <p className='font-bold text-[--midnight] text-lg leading-none sm:ml-8'>FORNECEDOR</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center grow w-full p-8 border border-[--silver] text-center rounded-2xl'>
              <p className="-translate-y-3 text-lg font-semibold text-[--midnight]">DATA PREVISTA PARA FIM DO CICLO</p>
              <p className='text-5xl sm:text-6xl text-[--blue] font-black'>{time.getDate() + ' / ' + (time.getMonth()+1)}</p>
            </div>
          </div>  
          
          <div className="flex flex-col w-full lg:w-1/2 lg:p-5"> {/* TOP RIGHT */}
            <div className="flex flex-row items-center">
              <p className='font-black text-[--blue] text-2xl py-2 sm:mr-2'>PAUTAS</p>
              <LaunchIcon className='text-[--blue] cursor-pointer'/>
            </div>

            <div className="flex flex-col w-full border border-[--silver] justify-between rounded-xl h-full px-8 py-8">
              <div className="flex flex-row justify-center items-end my-2"> {/* ITEM LISTA */}
                <p className='font-bold text-[--blue] text-sm sm:text-lg leading-none'>ED. BÁSICA</p>
                <hr className='border-1 grow border-dashed border-[--concrete] mb-1'/>
                <p className='font-semibold text-[--concrete] text-xs sm:text-md leading-none'>ATUALIZADO HÁ 5 DIAS</p>
              </div>
              <div className="flex flex-row justify-center items-end my-2"> {/* ITEM LISTA */}
                <p className='font-bold text-[--blue] text-sm sm:text-lg leading-none'>EJA</p>
                <hr className='border-1 grow border-dashed border-[--concrete] mb-1'/>
                <p className='font-semibold text-[--concrete] text-xs sm:text-md leading-none'>ATUALIZADO HÁ 5 DIAS</p>
              </div>
              <div className="flex flex-row justify-center items-end my-2"> {/* ITEM LISTA */}
                <p className='font-bold text-[--blue] text-sm sm:text-lg leading-none'>INDÍGENA</p>
                <hr className='border-1 grow border-dashed border-[--concrete] mb-1'/>
                <p className='font-semibold text-[--concrete] text-xs sm:text-md leading-none'>ATUALIZADO HÁ 5 DIAS</p>
              </div>
              <div className="flex flex-row justify-center items-end my-2"> {/* ITEM LISTA */}
                <p className='font-bold text-[--blue] text-sm sm:text-lg leading-none'>INTEGRAL 7H</p>
                <hr className='border-1 grow border-dashed border-[--concrete] mb-1'/>
                <p className='font-semibold text-[--concrete] text-xs sm:text-md leading-none'>ATUALIZADO HÁ 5 DIAS</p>
              </div>
              <div className="flex flex-row justify-center items-end my-2"> {/* ITEM LISTA */}
                <p className='font-bold text-[--blue] text-sm sm:text-lg leading-none'>INTEGRAL 9H</p>
                <hr className='border-1 grow border-dashed border-[--concrete] mb-1'/>
                <p className='font-semibold text-[--concrete] text-xs sm:text-md leading-none'>ATUALIZADO HÁ 5 DIAS</p>
              </div>
            </div>

          </div>

        </div>
        <div className="flex flex-col h-1/2 lg:p-5"> {/* BOTTOM */}
          <div className="flex flex-col sm:flex-row sm:items-center pt-3">
            <p className='flex items-center font-black text-[--blue] text-center sm:text-start sm:text-2xl align-middle sm:whitespace-nowrap sm:mr-2'>MONITORAMENTO DE ACESSO <LaunchIcon className='text-[--blue] cursor-pointer mx-1'/></p>
            <p className='font-thin text-[--silver] text-3xl hidden sm:block'> | </p>
            <p className='font-regular text-[--concrete] text-start text-sm lg:text-base sm:ml-2'> Escolas há mais tempo sem acessar.</p>
          </div>
          <div className="flex p-input-icon-left mt-5">
            <SearchIcon className="ml-3 text-[--silver]" />
            <InputText
              value={ globalFilterValue }
              onChange={ (e) => setGlobalFilterValue(e.target.value) }
              placeholder="Buscar"
              className="grow border rounded-lg appearance-none outline-none h-11 mt-2 pl-10 border-[--silver] focus:border-[--blue]"
            />
          </div>
          <div className='grow container-table'>
              <DataTable 
              value={nameSchool} 
                tableStyle={{width: '100%'}} 
                scrollable scrollHeight="90%"
                globalFilter={ globalFilterValue }
                emptyMessage="Alimento não cadastrado">

                <Column field="name" header="Escola" style={{ width: '75%' }}></Column>
                <Column field="id" header="Último Acesso" style={{ width: '25%' }}></Column>
                
              </DataTable>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NutriHome