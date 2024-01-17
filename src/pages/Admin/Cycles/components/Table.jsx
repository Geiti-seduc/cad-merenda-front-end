import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PropTypes from 'prop-types';
import { parseDate } from '../../../../utils/DataParser';

function Table({ dates }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (dates) {
      const parsed = dates.map((date) => ({
        ...date,
        start: parseDate(date.start),
        end: parseDate(date.end),
      }));
      setItems(parsed);
    }
  }, [dates]);

  return (
    <DataTable value={items} className="w-full">
      <Column field="title" header="ETAPA" />
      <Column field="role" header="CARGO" />
      <Column field="description" header="DESCRIÇÃO" />
      <Column field="start" header="INÍCIO" />
      <Column field="end" header="FIM" />
    </DataTable>
  );
}

Table.propTypes = {
  dates: PropTypes.array.isRequired,
};

export default Table;
