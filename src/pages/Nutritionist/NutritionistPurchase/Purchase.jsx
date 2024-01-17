/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Purchase.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import RemoveIcon from '@mui/icons-material/Remove';
import MenuIcon from '@mui/icons-material/Menu';
import { AutoComplete } from "primereact/autocomplete";
import { ProductService } from '../../../service/ProductService';

function Purchase() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("edbasica");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredData, setfilteredData] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const search = (event) => {
    setTimeout(() => {
      var _filteredData = [];

      if(!event.query.trim().length) {
        _filteredData = [...products];
      }
      else{
        _filteredData = products.filter((product) => {
          return product.nome.toLowerCase().startsWith(event.query.toLowerCase())
        });
      }
      setfilteredData(_filteredData)
    }, 250);
  }

  useEffect(() => {
    ProductService.getProductDesc().then((data) => setProducts(data));
  }, []);

  const handleProductSelect = (e, id) => {
    const selectedProduct = e.value;
    const updateSelects =  ProductService.updateCategory(selectedProduct, selectedCategory);
    setSelectedProducts(updateSelects);
  };

  const handleRemove = (selectedCategory) => {
    const updatedSelectedProducts = selectedProducts.filter(product => product.categoria !== selectedCategory);
    setSelectedProducts(updatedSelectedProducts);
  };

  function handleClick(id) {
    if(id === 'edbasica') {
      setSelectedCategory(id);
    }
    else if(id === 'indigena'){
      setSelectedCategory(id);
    }
    else if(id === 'integral7h'){
      setSelectedCategory(id);
    }
    else if(id === 'integral9h'){
      setSelectedCategory(id);
    }
    else if(id === 'eja'){
      setSelectedCategory(id);
    }
    if(window.innerWidth < 800){
      setTimeout(() => {
        setMenuOpen(!menuOpen);
      }, 500);
    }
    console.log(id)
  }

  const toggleMenu = () => {  
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    // main div
    <div className="">
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
          <div className="menu-div">
            <Button className="menu-button" onClick={toggleMenu}>
              <MenuIcon/>
            </Button>
            <div className={`${menuOpen ? 'open' : 'menu'}`}>
              <a href="#" className="active-border" onClick={() => handleClick('edbasica')}>
                <span className="text-[#005CA9] text-xl font-extrabold" value="edbasica">
                  ED. BÁSICA
                </span>
              </a>
              <a href="#" className="active-border" onClick={() => handleClick('indigena')}>
                <span className="text-[#005CA9] text-xl font-extrabold" value="indigena">
                  INDÍGENA
                </span>
              </a>
              <a href="#" className="active-border" onClick={() => handleClick('integral7h')}>
                <span className="text-[#005CA9] text-xl font-extrabold">
                  INTEGRAL 7H
                </span>
              </a>
              <a href="#" className="active-border" onClick={() => handleClick('integral9h')}>
                <span className="text-[#005CA9] text-xl font-extrabold">
                  INTEGRAL 9H
                </span>
              </a>
              <a href="#" className="active-border" onClick={() => handleClick('eja')}>
                <span className="text-[#005CA9] text-xl font-extrabold">
                  EJA
                </span>
              </a>
            </div>
          </div>
          <hr className="border border-px border-[#ECF0F1]" />
          {/* search bar */}
          <div className={`${menuOpen ? 'search-table-div' : ''}`}>
            <div className="mt-6">
                <AutoComplete 
                  className="border border-px border-[#BDC3C7] rounded-md w-full autocompleteinput"
                  placeholder="Procure itens para adicionar à pauta."
                  field="nome" 
                  value={ selectedItem } 
                  suggestions={ filteredData } 
                  completeMethod={search} 
                  onChange={(e) => setSelectedItem(e.value)} 
                  onSelect={handleProductSelect}
                />
            </div>
            {/* tabela */}
            <div className=" w-full container-table pt-2">
              <DataTable
                id="datatable"
                header
                value={selectedProducts.filter(product => product.categoria === selectedCategory)}
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
                  body={() => <Button onClick={()=>handleRemove(selectedCategory)}><RemoveIcon /></Button>}
                />
                <Column
                  field="nome"
                  header="ESCOLA"
                />
                <Column
                  field="descricao"
                  header="DESCRIÇÃO"
                />
                <Column
                  field="medida"
                  header="UNIDADE"
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchase;