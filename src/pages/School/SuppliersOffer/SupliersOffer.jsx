/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import './suppliersOffer.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ReplyIcon from '@mui/icons-material/Reply';
import { ProductService } from '../../../service/ProductService';
import CertificateCard from '../../../components/certificate/CertificateCard';

function SupliersOffer() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    setSuppliers(
      {
        cnpj: 'XX.XXX.XXX/0001-XX',
        razao: 'MERCADINHO',
        fantasia: 'MERCADINHO QUALQUER',
        ie: '01010101',
        cnae: 'teste',
        cep: '57820-100',
        longradouro: 'Rua da Augusta',
        numero: '123',
        bairro: 'CENTRO',
        municipio: 'MACEIÓ',
        uf: 'AL',
        complemento: 'QUADRA TAL',
        telefone: '(82) 99999-2222',
        email: 'teste@teste.com',
        responsavel: 'AUGUSTO',
      },
    );
  }, []);

  console.log(suppliers);

  useEffect(() => {
    const data = ProductService.getProductsNew().map((product) => ({
      ...product,
      precoUnitario: 0,
      precoTotal: product.valorUni * product.qtdMax, // Calcula o precoTotal aqui
    }));
    setProducts(data);
  }, []);

  const calculateTotalSum = () => products.reduce((sum, rowData) => sum + rowData.precoTotal, 0);

  return (
    <div className="suppliersOffer flex flex-col items-center lg:flex-row md:flex-wrap md:justify-center">
      <div className="flex flex-col w-[90%] sm:w-[80%]">
        <div className="text-[--concrete]">
          <button className="flex items-center grow text-start hover:cursor-pointer font-bold py-6">
            {' '}
            <ReplyIcon />
            {' '}
            VOLTAR
          </button>
        </div>
        <div className="text-xl sm:text-2xl text-[--blue] font-extrabold mb-4">NOME DA EMPRESA</div>
        <div className="container-table flex items-center self-center w-full">
          <div className="card w-full">
            <DataTable
              value={ products }
              scrollable
              removableSort
              scrollHeight="550px"
              className="border-y border-[--silver] pb-5"
            >
              <Column field="nome" header="ITEM" sortable style={ { width: '12.5%' } } />
              <Column
                field="descricao"
                header="DESCRIÇÃO"
                sortable
                style={ { width: '12.5%' } }
                bodyStyle={ { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'wrap' } }
              />
              <Column
                field="medida"
                header="UN"
                sortable
                style={ { width: '12.5%' } }
              />
              <Column
                field="periodicidade"
                header="PERIODICIDADE"
                sortable
                style={ { width: '12.5%' } }
              />
              <Column field="qtdMax" header="QTD MÁX" style={ { width: '12.5%' } } />
              <Column
                field="valorUni"
                body={ (rowData) => `R$ ${rowData.valorUni}` }
                header="PREÇO UN."
                style={ { width: '12.5%' } }
              />
              <Column
                field="marca"
                header="MARCA"
                style={ { width: '12.5%' } }
              />
              <Column
                field="precoTotal"
                body={ (rowData) => `R$ ${rowData.precoTotal}` }
                header="TOTAL"
                style={ { width: '12.5%' } }
                bodyStyle={ { whiteSpace: 'nowrap' } }
              />
            </DataTable>
            <div className="flex justify-end text-base sm:text-xl font-bold py-7 xl:text-2xl border-b border-[--silver]">
              <p className="text-[--silver]">TOTAL</p>
              <span className="text-[--blue] ml-3">
                R$
                {' '}
                {calculateTotalSum().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl text-[--blue] font-extrabold py-7  border-b border-[--silver]">
                <h1>INFORMAÇÕES DO FONERCEDOR</h1>
              </div>
              <form className="flex flex-wrap py-7 border-b border-[--silver]">
                <div className="div-input grow lg:w-[40%]">
                  <label htmlFor="CNPJ">CNPJ</label>
                  <input type="text" id="CNPJ" value={ suppliers.cnpj } disabled />
                </div>
                <div className="div-input grow lg:w-[60%]">
                  <label htmlFor="razaoSocial">RAZÃO SOCIAL</label>
                  <input type="text" id="razaoSocial" value={ suppliers.razao } disabled />
                </div>
                <div className="div-input grow lg:w-[50%]">
                  <label htmlFor="nomeFantasia">NOME FANTASIA</label>
                  <input type="text" id="nomeFantasia" value={ suppliers.fantasia } disabled />
                </div>
                <div className="div-input grow lg:w-[20%]">
                  <label htmlFor="inscEstadual">INSCRIÇÃO ESTADUAL</label>
                  <input type="text" id="inscEstadual" value={ suppliers.ie } disabled />
                </div>
                <div className="div-input grow lg:w-[30%]">
                  <label htmlFor="cnae">CNAE</label>
                  <input type="text" id="cnae" value={ suppliers.cnae } disabled />
                </div>
                <div className="div-input grow lg:w-[30%]">
                  <label htmlFor="CEP">CEP</label>
                  <input type="text" id="CEP" value={ suppliers.cep } disabled />
                </div>
                <div className="div-input grow lg:w-[40%]">
                  <label htmlFor="longradouro">LONGRADOURO</label>
                  <input type="text" id="longradouro" value={ suppliers.longradouro } disabled />
                </div>
                <div className="div-input grow lg:w-[10%]">
                  <label htmlFor="numero">N</label>
                  <input type="text" id="numero" value={ suppliers.numero } disabled />
                </div>
                <div className="div-input grow lg:w-[20%]">
                  <label htmlFor="bairro">BAIRRO/DISTRITO</label>
                  <input type="text" id="bairro" value={ suppliers.bairro } disabled />
                </div>
                <div className="div-input grow lg:w-[45%]">
                  <label htmlFor="municipio">MUNICÍPIO</label>
                  <input type="text" id="municipio" value={ suppliers.municipio } disabled />
                </div>
                <div className="div-input grow lg:w-[10%]">
                  <label htmlFor="uf">UF</label>
                  <input type="text" id="uf" value={ suppliers.uf } disabled />
                </div>
                <div className="div-input grow lg:w-[25%]">
                  <label htmlFor="complemento">COMPLEMENTO</label>
                  <input type="text" id="complemento" value={ suppliers.complemento } disabled />
                </div>
                <div className="div-input grow lg:w-[20%]">
                  <label htmlFor="telefone">TELEFONE</label>
                  <input type="text" id="telefone" value={ suppliers.telefone } disabled />
                </div>
                <div className="div-input grow lg:w-[50%]">
                  <label htmlFor="email">EMAIL</label>
                  <input type="text" id="email" value={ suppliers.email } disabled />
                </div>
                <div className="div-input grow lg:w-[50%]">
                  <label htmlFor="responsavel">RESPONSÁVEL</label>
                  <input type="text" id="responsavel" value={ suppliers.responsavel } disabled />
                </div>
              </form>
              <div className="text-xl sm:text-2xl text-[--blue] font-extrabold py-7  border-b border-[--silver]">
                <h1>CERTIDÕES</h1>
              </div>
              <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center grow py-7 md:justify-around">
                <CertificateCard name="CD MUNICIPAL" padding="p-1" />
                <CertificateCard name="CD TRABALHISTA" padding="p-1" />
                <CertificateCard name="CD ESTADUAL" padding="p-1" />
                <CertificateCard name="CD FEDERAL" padding="p-1" />
                <CertificateCard name="CD FGTS" padding="p-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[--blue] w-full p-6 text-center text-[--white]">
        CADMEREDA | SEDUC 2023
      </footer>
    </div>
  );
}

export default SupliersOffer;
