/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */

import {
  React, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Calendar } from 'primereact/calendar';
import Certificate from '../../utils/models/Certificate';
import ExpirationTag from './ExpirationTag';
import { useToast } from '../../contexts/ToastContextProvider';

function CertificateCard(
  {
    name,
    sendTo = null,
    state = '',
    mode = 'default',
    requiredId = null,
    requireDownload = () => {},
    date = null,
    position = 'top',
  },
) {
  const { showToast } = useToast();
  const filesElement = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [expiration, setExpiration] = useState('');

  if (mode === 'default' && sendTo === null) {
    throw new Error('Prop sendTo is required when mode is default');
  }

  if (mode === 'view' && requireDownload === null) {
    throw new Error('Prop download is required when mode is view');
  }

  useEffect(() => {
    if (file) {
      const certificate = new Certificate(name, expiration, file, requiredId);
      sendTo(certificate);
    }
  }, [file, expiration]);

  const downloadFile = () => {
    requireDownload(name);
  };

  const handleClick = () => {
    if (mode === 'view') downloadFile();
    else document.getElementById(`${name}_input`).click();
  };

  const send = () => {
    const certificate = new Certificate(name, expiration, file, requiredId);
    sendTo(certificate);
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      send();
    }
  };

  return (
    <div className="flex flex-col w-52 relative">
      <button
        type="button"
        onClick={handleClick}
      >
        <div className="h-auto w-full flex flex-col gap-1">
          <div
            className="h-36 w-full border-2 border-blue flex
            flex-col items-center justify-center gap-2 text-blue
            rounded-lg bg-[#fff] hover:bg-blue hover:text-white
            transition ease-in-out cursor-default hover:cursor-pointer"
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 50 }} />
            <p className="font-black text-lg">{ name }</p>
            <input
              ref={filesElement}
              type="file"
              id={`${name}_input`}
              onChange={handleInput}
              className="hidden"
              accept=".pdf"
            />
            {fileName ? (
              <div className="w-full px-4">
                <p className="truncate text-black font-regular text-sm">
                  { fileName }
                </p>
              </div>
            ) : ''}
          </div>
        </div>
      </button>
      {state && !fileName && (
      <ExpirationTag
        date={date}
        state={state}
        position={position}
      />
      )}
      {mode === 'default' && (
      <Calendar
        id={name}
        placeholder="VENCIMENTO"
        value={expiration}
        className="mt-3 w-52"
        onChange={(e) => setExpiration(e.target.value)}
        dateFormat="dd/mm/yy"
        showIcon
        minDate={new Date()}
      />
      )}
    </div>
  );
}

CertificateCard.propTypes = {
  name: PropTypes.string.isRequired,
  sendTo: PropTypes.func,
  state: PropTypes.string,
  mode: PropTypes.string,
  requireDownload: PropTypes.func,
  date: PropTypes.string,
  requiredId: PropTypes.string,
  position: PropTypes.string,
};

export default CertificateCard;
