import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import RemoveIcon from '@mui/icons-material/Remove';

function Table({ selectedList, handleRemove, disabled }) {
  const removeTemplate = (rowData) => (

    <Button
      icon={<RemoveIcon />}
      rounded
      text
      disabled={disabled}
      onClick={() => handleRemove(rowData)}
    />
  );
  return (
    <DataTable
      emptyMessage="Nenhum item selecionado."
      id="datatable"
      header
      value={selectedList}
      scrollable
      scrollHeight="550px"
    >
      <Column
        key="id"
        field="fullname"
        header="ALIMENTO"
        style={{ width: '60%' }}
      />
      <Column
        key="id"
        field="measure"
        header="UNIDADE"
      />
      <Column
        key="id"
        header="REMOVER"
        body={removeTemplate}
      />
    </DataTable>
  );
}

Table.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Table;
