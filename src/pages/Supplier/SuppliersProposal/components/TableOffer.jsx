import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../../utils/formatPrice';

function TableOffer({
  products, globalFilterValue, filters, setProducts,
}) {
  const updatePrecoUnitario = (rowData, event) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((product) => product.food_id === rowData.food_id);
    updatedProducts[index].product_price = event.target.value;
    setProducts(updatedProducts);
  };

  const updateMarca = (rowData, event) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((product) => product.food_id === rowData.food_id);
    updatedProducts[index].brand = event.target.value;
    setProducts(updatedProducts);
  };

  const inputPriceTemplate = (rowData) => (
    <InputNumber
      inputId="inputPrice"
      value={rowData.product_price === 0 ? '' : rowData.product_price}
      onValueChange={(e) => updatePrecoUnitario(rowData, e)}
      mode="currency"
      min={0}
      currency="BRL"
      locale="pt-BR"
      placeholder="R$ 0,00"
    />
  );

  const unityTotalPrice = (rowData) => {
    const precoUnitarioNumeric = parseFloat(rowData.product_price);
    const precoUnitario = Number.isNaN(precoUnitarioNumeric) ? 0 : precoUnitarioNumeric;
    const precoTotal = (precoUnitario * rowData.quantity);

    return formatPrice(precoTotal);
  };

  const inputBrandTemplate = (rowData) => (
    <InputText
      type="text"
      value={rowData.brand}
      onChange={(e) => updateMarca(rowData, e)}
    />
  );
  return (
    <DataTable
      value={products}
      scrollable
      removableSort
      scrollHeight="550px"
      tableStyle={{ minWidth: '30rem' }}
      globalFilter={globalFilterValue}
      emptyMessage="Não há pedido de compra."
      filters={filters}
      globalFilterFields={['name', 'descricao', 'periodicidade']}
    >
      <Column
        field="name"
        header="ITEM"
        sortable
        style={{ width: '12.5%' }}
      />
      <Column
        field="description"
        header="DESCRIÇÃO"
        sortable
        style={{ width: '18.5%' }}
      />
      <Column
        field="measure"
        header="UN"
        sortable
        style={{ width: '10.5%' }}
      />
      <Column
        field="frequency"
        header="PERIODICIDADE"
        sortable
        style={{ width: '6.5%' }}
      />
      <Column field="quantity" header="QTD MÁX" style={{ width: '10.5%' }} />
      <Column
        body={inputPriceTemplate}
        header="PREÇO UN."
        style={{ width: '14.5%', textAlign: 'center' }}
      />
      <Column
        body={inputBrandTemplate}
        header="MARCA"
        style={{ width: '14.5%' }}
      />
      <Column
        body={unityTotalPrice}
        header="PREÇO TOTAL"
        sortable
        style={{ width: '12.5%' }}
      />
    </DataTable>
  );
}

export default TableOffer;

TableOffer.propTypes = {
  products: PropTypes.array,
  globalFilterValue: PropTypes.string,
  filters: PropTypes.object,
  setProducts: PropTypes.func,
};
