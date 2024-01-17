/* eslint-disable */
import { useState, useEffect } from 'react';
import './searchschool.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuthUser } from 'react-auth-kit';

// import { ProductService } from '../../../service/ProductService';
import 'primereact/resources/primereact.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchSchool() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [listSchool, setListSchool] = useState([]);
  const headerStyles = {
    backgroundColor: '##ECF0F1', // Defina a cor de fundo desejada
  };

  useEffect(() => {
    //   ProductService.getSchools().then((data) => setProducts(data));
    const fetchSchoolData = async () => {
      try {
        const responseListSchool = await fetch('http://localhost:3001/school',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
        );
        const listSchoolData = await responseListSchool.json();
        setListSchool(listSchoolData);
      } catch (error) {
        console.error(error);
      }
    };
      fetchSchoolData();
  }, []);

  return (
    <div className="searchSchool">
      {/* page div */}
      <div className="w-5/6 mt-12 m-auto">
        {/* buscar escolas e selecionar cidade div */}
        <div className="flex header-div">
          {/* buscar escolas div */}
          <div className="w-1/2 left-title">
            <h1 className="text-[#005CA9] text-3xl font-extrabold">BUSCAR ESCOLAS</h1>
          </div>
          {/* selecionar cidade div */}
          <div className="w-1/2 flex justify-end items-center right-title select-div">
            <legend className="text-[#005CA9] text-sm pr-2 font-normal">SELECIONE A CIDADE:</legend>
            <select className="border border-[#BDC3C7] rounded-md w-2/4 select-bar">
              <option value=" " disabled /* selected */ hidden> </option>
              <option value="cidade1">Cidade 1</option>
              <option value="cidade2">Cidade 2</option>
              <option value="cidade3">Cidade 3</option>
              <option value="cidade4">Cidade 4</option>
            </select>
          </div>
        </div>
        {/* table e search bar div */}
        <div className="mt-11 tableSearch-div">
          {/* search bar div */}
          <div>
            <fieldset className="">
              <div className="relative">
                <a href="#">
                  <SearchIcon className="absolute top-[18px] left-[20px] w-6 h-6 text-[#BDC3C7]" />
                </a>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-lg appearance-none
                                    h-11 mt-2 pl-[70px] border-[#BDC3C7]"
                  placeholder="Buscar"
                />
              </div>
            </fieldset>
          </div>
          {/* table div */}
          <div className=" w-full">
            <h1 className="text-[#BDC3C7] text-xs p-5">ESCOLA</h1>
            <hr className="border-px border-[#BDC3C7]" />
            <DataTable
              value={ listSchool }
              scrollable
              scrollHeight="550px"
              tableStyle={ { width: '100%' } }
              selectionMode="single"
            //   selection={ products }
              onSelectionChange={ (e) => setProducts(e.value) }
              dataKey="id"
              className="text-xs divide-y"
              size="large"
            >
              <Column key="namechool" field="name" style={ { headerStyles, width: '100%' } } className="hover:text-[#005CA9] hover:bg-[#ECF0F1] p-5 hover:font-bold" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSchool;
