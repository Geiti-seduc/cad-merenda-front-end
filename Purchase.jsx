/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Purchase.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import SearchIcon from '@mui/icons-material/Search';
import Header  from '../../../components/header/header';
        
// import 'primereact/resources/primereact.css';
import { ProductService } from '../../../service/ProductService';
// core

function Purchase() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getPurchase().then((data) => setProducts(data));
  }, []);

  return (
    // main div
    <div className="">
      {/* header div */}
      <Header />
      {/* page div */}
      <div className="w-3/4 m-auto mt-10">
        {/* pautas div */}
        <div className="inline-block">
          <h1 className="text-[#005CA9] text-2xl font-extrabold">PAUTAS DE COMPRA</h1>
          <hr className="border-px border-[#BDC3C7] mt-4" />
        </div>
        {/* menu, search e tabela */}
        <div className="mt-8">
          {/* menu */}
          <div className="flex justify-around">
            <a href="www.google.com" className="active">
              <span className="text-[#005CA9] text-xl font-extrabold">
                ED. BÁSICA
              </span>
            </a>
            <a href="www.google.com" className="active">
              <span className="text-[#005CA9] text-xl font-extrabold">
                INDÍGENA
              </span>
            </a>
            <a href="www.google.com" className="active">
              <span className="text-[#005CA9] text-xl font-extrabold">
                INTEGRAL 7H
              </span>
            </a>
            <a href="www.google.com" className="active">
              <span className="text-[#005CA9] text-xl font-extrabold">
                INTEGRAL 9H
              </span>
            </a>
            <a href="www.google.com" className="active">
              <span className="text-[#005CA9] text-xl font-extrabold">
                EJA
              </span>
            </a>
          </div>
          <hr className="border-px border-[#ECF0F1]" />
          {/* search bar */}
          <div className="mt-4">
            <fieldset className="text-sm">
              <div className="relative">
                <a href="www.google.com">
                  <SearchIcon
                    className="absolute top-[18px] left-[20px] w-6 h-6 text-[#BDC3C7] "
                  />
                </a>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-lg appearance-none
                  h-11 mt-2 pl-[70px] border-[#BDC3C7]"
                  placeholder="Procure itens para adicionar à pauta. [ ENTER ] "
                />
              </div>
            </fieldset>
          </div>
          {/* tabela div */}
          <div className=" w-full container-table">
            <DataTable
              header
              value={ products }
              scrollable
              scrollHeight="550px"
              tableStyle={ { width: '100%' } }
              selectionMode="single"
              selection={ products }
              onSelectionChange={ (e) => setProducts(e.value) }
              dataKey="id"
              className="text-xs"
            >
              <Column
                field="escolaItens"
                header="ESCOLA"
              />
              <Column
                field="descricao"
                header="DESCRIÇÃO"
              />
              <Column
                field="unidade"
                header="UNIDADE"
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchase;