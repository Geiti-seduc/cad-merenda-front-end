/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataScroller } from 'primereact/datascroller';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import { ProductService } from '../../../service/ProductService';
import './suppliersProposal.scss';
import './responsive.scss';
import { ModalGeneric } from '../../../components/modalGeneric/ModalGeneric';
import Button from '../../../components/button/Button';

export default function SuppliersProposal() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const ds = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const data = ProductService.getProductsNew().map((product) => ({
      ...product,
      precoUnitario: 0,
      marca: '',
    }));
    setProducts(data);
  }, []);

  useEffect(() => {
    let sum = 0;
    products.forEach((rowData) => {
      const precoUnitarioNumeric = parseFloat(rowData.precoUnitario);
      const precoUnitario = Number.isNaN(precoUnitarioNumeric) ? 0 : precoUnitarioNumeric;
      const precoTotal = precoUnitario * rowData.qtdMax;
      sum += precoTotal;
    });
    setTotalPrice(sum.toFixed(2));
  }, [products]);

  const updatePrecoUnitario = (rowData, event) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((product) => product.id === rowData.id);
    updatedProducts[index].precoUnitario = event.target.value;
    setProducts(updatedProducts);
  };

  const updateMarca = (rowData, event) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((product) => product.id === rowData.id);
    updatedProducts[index].marca = event.target.value;
    setProducts(updatedProducts);
  };

  const inputPriceTemplate = (rowData) => (
    <input
      type="number"
      value={ rowData.precoUnitario === 0 ? '' : rowData.precoUnitario }
      onChange={ (e) => updatePrecoUnitario(rowData, e) }
      className="border border-[--concrete] rounded w-full text-center"
    />
  );

  const inputTesteTemplate = (rowData) => (
    <input
      type="text"
      value={ rowData.marca }
      onChange={ (e) => updateMarca(rowData, e) }
      className="border border-[--concrete] rounded w-full text-center"
    />
  );

  function formatPrice(price) {
    const parts = price.toFixed(2).split('.');
    const formattedPrice = `${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${parts[1]}`;
    return formattedPrice;
  }

  const itemTemplate = (data) => (
    <div className="flex flex-col w-full justify-end h-10 ">
      <div className="flex justify-between items-center w-full">
        <button className="text-[--blue] pr-2 font-bold self-end">{data.nome}</button>
        <hr className="text-[--silver] border-1 grow border-dashed border-[--concrete] mt-2 self-end" />
        <div className="flex justify-between items-center text-[--concrete] ml-2 text-end border-b border-[--blue] font-medium min-w-[4rem]">
          <span className="mr-1">R$</span>
          <span>{formatPrice(data.precoTotal)}</span>
        </div>
        <span className="w-[1px] h-full bg-[--silver] mx-2" />
        <p className="text-[--midnight] font-medium">{data.medida}</p>
        <button
          className="text-[--blue] ml-2 "
          onClick={ () => {
            setSelectedItem(data);
            setIsModalVisible(true);
          } }
        >
          <SaveIcon className="" />
        </button>
      </div>
    </div>
  );

  const width768 = 768;
  const width640 = 640;
  const rowsInitials = 7;

  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  let countData = rowsInitials;
  const footer = (
    <button
      type="text"
      onClick={ () => {
        ds.current.load();
        countData += rowsInitials;
        const newIsAllDataLoaded = countData >= ProductService.getTotalProductsCount();
        setIsAllDataLoaded(newIsAllDataLoaded);
      } }
      className={ `text-[--concrete] ${isAllDataLoaded ? 'hidden' : ''}` }
    >
      <p>Carregar mais</p>
      <KeyboardDoubleArrowDownIcon />
    </button>
  );
  return (
    <main className="pageProposal flex flex-col w-screen items-center lg:flex-row md:flex-wrap md:justify-center">
      {isModalVisible && <ModalGeneric visible={ isModalVisible } food={ selectedItem } onHide={ () => setIsModalVisible(false) } />}
      <div className="flex flex-col w-[90%] sm:w-[80%]">
        <div className="blockTitles flex justify-between self-center my-10 items-center w-full">
          <div className="school">
            <div className="flex items-start flex-col-reverse ">
              <h1 className="nameSchool text-[--blue] text-xl sm:text-4xl font-extrabold pr-3">
                ESCOLA ESTADUAL PEREIRA DA SILVA SANTOS
              </h1>
              <h2 className="text-sm sm:text-2xl text-[--concrete]  font-medium">PROPOSTA</h2>
            </div>
            <h2 className="addressSchool text-[--silver] text-base sm:text-xl">rua tal tal tal, Nº tal</h2>
          </div>
          <div className="valueTotal flex flex-col items-end">
            <span className="text-[--silver] text-2xl">TOTAL</span>
            <span className="priceProposal text-[--blue] text-2xl font-bold whitespace-nowrap">
              R$
              {' '}
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </span>
          </div>
        </div>
        {windowWidth > width768 ? (
          <div className="container-table flex items-center self-center w-full">
            <div className="card w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
                <InputText
                  value={ globalFilterValue }
                  onChange={ (e) => setGlobalFilterValue(e.target.value) }
                  placeholder="Buscar"
                  className="w-full border rounded-lg appearance-none h-11 pl-[35px] border-[#BDC3C7] lg:mr-2"
                />
                <Button
                  icon={ <SaveIcon /> }
                  content={ windowWidth <= width640 ? 'SALVAR' : 'SALVAR ALTERAÇÕES' }
                  color="--white"
                  background="--blue"
                  active="--white"
                  border="border-[1px]"
                  borderColor="--blue"
                  radius="rounded-2xl"
                  classes="px-3 w-[300px] max-h-11"
                />
              </div>

              <DataTable
                value={ products }
                scrollable
                removableSort
                scrollHeight="550px"
                tableStyle={ { minWidth: '30rem' } }
                globalFilter={ globalFilterValue }
                emptyMessage="Alimento não cadastrado"
              >
                <Column
                  field="nome"
                  header="ITEM"
                  sortable
                  style={ { width: '12.5%' } }
                />
                <Column
                  field="descricao"
                  header="DESCRIÇÃO"
                  sortable
                  style={ { width: '12.5%' } }
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
                  body={ inputPriceTemplate }
                  header="PREÇO UN."
                  style={ { width: '12.5%' } }
                />
                <Column
                  body={ inputTesteTemplate }
                  header="MARCA"
                  style={ { width: '12.5%' } }
                />
                <Column
                  body={ (rowData) => {
                    const precoUnitarioNumeric = parseFloat(rowData.precoUnitario);
                    const precoUnitario = Number.isNaN(precoUnitarioNumeric)
                      ? 0 : precoUnitarioNumeric;
                    const precoTotal = (precoUnitario * rowData.qtdMax).toFixed(2);
                    return `R$ ${precoTotal}`;
                  } }
                  header="PREÇO TOTAL"
                  sortable
                  style={ { width: '12.5%' } }
                />
              </DataTable>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="text-[--concrete] text-xs p-3 border border-[--concrete] rounded-xl mb-6">
              <p>Lembre-se que os preços são informados por unidade de medida.</p>
              <p>Exemplo: R$ 5,00 o quilo (R$ 5,00/kg).</p>
            </div>
            <DataScroller
              ref={ ds }
              value={ products }
              itemTemplate={ itemTemplate }
              rows={ 7 }
              loader
              footer={ footer }
              className="border-y border-[--silver] mb-10 pb-2"
            />
            <Button
              icon={ <SaveIcon /> }
              content="ENVIAR"
              color="--white"
              background="--blue"
              active="--white"
              border="border-[1px]"
              borderColor="--blue"
              radius="rounded-2xl"
              classes="w-[90%] sm:w-[161px] mx-auto"
            />
          </div>
        )}
      </div>
    </main>
  );
}
