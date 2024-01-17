/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DataScroller } from 'primereact/datascroller';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function ItemTemplateMobile({
  data, setSelectedItem, setIsModalVisible, formatPrice,
}) {
  const ds = useRef(null);
  const rowsInitials = 7;
  const rowsTotals = data.length;

  function openModal(rowData) {
    setSelectedItem(rowData);
    setIsModalVisible(true);
  }

  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  let countData = rowsInitials;
  const footer = (
    <button
      type="button"
      onClick={() => {
        countData += rowsInitials;
        ds.current.load();
        const newIsAllDataLoaded = countData >= rowsTotals;
        setIsAllDataLoaded(newIsAllDataLoaded);
      }}
      className={`text-concrete ${isAllDataLoaded ? 'hidden' : ''} ${data.length <= rowsInitials ? 'hidden' : ''}`}
    >
      <p>Carregar mais</p>
      <KeyboardDoubleArrowDownIcon />
    </button>
  );

  // eslint-disable-next-line no-shadow
  const itemTemplate = (data) => (
    <div className="flex flex-col w-full justify-end h-10" onClick={() => openModal(data)}>
      <div className="flex justify-between items-center w-full">
        <button type="button" className="text-blue pr-2 font-bold self-end">{data.name}</button>
        <hr className="text-silver border-1 grow border-dashed border-concrete mt-2 self-end" />
        <div className="flex justify-between items-center text-concrete ml-2 text-end border-b border-blue font-medium min-w-[4rem]">
          <span>{formatPrice(data.product_price)}</span>
        </div>
        <span className="w-[1px] h-full bg-silver mx-2" />
        <p className="text-[--midnight] font-medium">{data.measure}</p>
        <button
          type="button"
          className="text-blue ml-2 "
          onClick={() => openModal(data)}
        >
          <OpenInNewIcon className="" />
        </button>
      </div>
    </div>
  );

  return (
    <DataScroller
      ref={ds}
      value={data}
      itemTemplate={itemTemplate}
      rows={rowsInitials}
      loader
      footer={footer}
      className="border-y border-silver mb-10 pb-2"
      key={data.food_id}
    />
  );
}

export default ItemTemplateMobile;

ItemTemplateMobile.propTypes = {
  data: PropTypes.array,
  setSelectedItem: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  formatPrice: PropTypes.func,
  // footer: PropTypes.object,
  // ds: PropTypes.object,
};
