/* eslint-disable */
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function InputSearchBar() {
  return (
    <fieldset className="">
      <div className="relative">
        <a href="#">
          <SearchIcon className="absolute top-[18px] left-[20px] w-6 h-6 text-[#BDC3C7]" />
        </a>
      </div>
      <div className="inline-block">
        <input
          type="text"
          className="w-[80vw] max-w-full border rounded-lg appearance-none
          h-11 mt-2 pl-[70px] border-[#BDC3C7]"
          placeholder='Buscar'
        />
      </div>
    </fieldset>
  );
}

export default InputSearchBar;
