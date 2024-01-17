/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';

function SchoolList({ schoolList }) {
  const navigate = useNavigate();

  return (
    <DataTable
      value={schoolList}
      className="p-datatable-striped"
      selectionMode="single"
      scrollable
      scrollHeight="550px"
      emptyMessage="Nenhuma proposta encontrada."
      onRowClick={(e) => navigate(`./propostas/${e.data.inep}`)}
    >
      <Column
        key="inep"
        field="name"
      />
    </DataTable>

  );
}

SchoolList.propTypes = {
  schoolList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SchoolList;
