/* eslint-disable indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/alt-text */

import { React, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './CertificateCard.scss';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import alertRed from '../../assets/images/alertRed.svg';
import alertOrange from '../../assets/images/alertOrange.svg';

function CertificateCard({ name, sendTo, state = '', padding = '' }) {
  const [fileName, setFileName] = useState('');
  const filesElement = useRef(null);
  const handleClick = () => {
    document.getElementById(`${name}_input`).click();
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      const doc = e.target.files[0];
      setFileName(doc.name);
      sendTo(name, doc);
      e.stopPropagation();
    } else {
      console.log('Upload aborted.');
    }
    e.stopPropagation();
  };

  return (
    <button
      onClick={ handleClick }
      className={ `${padding} relative` }
    >
      <div className="h-auto w-52 flex flex-col gap-1">
        <div
          className="h-36 w-52 border-2 border-[#005CA9] flex
          flex-col items-center justify-center gap-2 text-[#005CA9]
          rounded-lg bg-[#fff] hover:bg-[#005CA9] hover:text-white
          transition ease-in-out cursor-default hover:cursor-pointer"
        >
          <DescriptionOutlinedIcon sx={ { fontSize: 50 } } />
          <p className="font-black text-lg">{ name }</p>
          <input
            multiple
            ref={ filesElement }
            type="file"
            id={ `${name}_input` }
            onChange={ handleInput }
            className="hidden"
          />
        </div>
        <div className="flex flex-col justify-center h-10 px-5 mb-3">
          <p className="truncate text-black font-regular text-sm">{ fileName }</p>
        </div>
      </div>
      {state === 'naoEnviado'
        ? <>
          <span
            className="border-2
              text-xs
              border-[--red]
              rounded-lg
              p-1 font-bold
              text-[--red]
              bg-white
              absolute
              bottom-12
              left-1/2
              transform
              -translate-x-1/2
              whitespace-nowrap"
          >
            VENCE EM 21/07/23

          </span>
          <img
            src={ alertRed }
            className="absolute
              top-0
              right-0"
          />
        </>
        : ''}
      {state === 'corrigir'
        ? <>
          <span
            className="border-2
            text-xs
            border-[--orange]
            rounded-lg p-1
            font-bold
            text-[--orange]
            bg-white
            absolute
            bottom-12
            left-1/2
            transform
            -translate-x-1/2
            whitespace-nowrap"
          >
            VENCE EM 21/07/23

          </span>
          <img
            src={ alertOrange }
            className="absolute top-0 right-0"
          />
        </>
        : ''}
      {state === 'enviado'
        ? <span
            className="border-2
              text-xs
              border-[--green]
              rounded-lg
              p-1
              font-bold
              text-[--green]
              bg-white
              absolute
              bottom-12
              left-1/2
              transform
              -translate-x-1/2
              whitespace-nowrap"
        >
          VENCE EM 21/07/23

        </span>
        : ''}
    </button>
  );
}

CertificateCard.propTypes = {
  name: PropTypes.string.isRequired,
  sendTo: PropTypes.func.isRequired,
  state: PropTypes.string,
  padding: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
};

export default CertificateCard;
