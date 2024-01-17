/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputSearchBar from '../InputSearchBar/InputSearchBar';
import NewFood from '../newFood/newFood';
import Button from '../button/Button';

function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      {isModalOpen ? <NewFood closeModal={ closeModal } /> : null}
      <div
        className="search-bar flex flex-col lg:flex-row
          lg:justify-between items-center my-3 sm:my-14"
      >
        <div
          className="text-[#005CA9]
            text-2xl
            sm:text-4xl
            font-extrabold
            pt-2
            border-b-2 border-[#BDC3C7] pb-5"
        >
          <h1>ALIMENTOS</h1>
        </div>
        <Button
          icon={ <AddBoxIcon className="w-6 h-6 active:text-[white] mr-2" /> }
          content="CADASTRAR"
          color="--blue"
          background="--white"
          active="--blue"
          border="border-[1px]"
          borderColor="--blue"
          radius="rounded-2xl"
          onClick={ openModal }
        />
      </div>
      <InputSearchBar className="max-w[1270px] w-[100%]" />
    </div>

  );
}

export default SearchBar;
