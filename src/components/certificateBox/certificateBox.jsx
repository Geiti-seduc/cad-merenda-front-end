/* eslint-disable jsx-a11y/alt-text */

import { React } from 'react';
import PropTypes from 'prop-types';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExpirationTag from '../Certificate/ExpirationTag';
import AlertBadge from '../Certificate/AlertBadge';

function CertificateBox(
  {
    name,
    state = '',
    date = null,
  },
) {
  return (
    <div className="flex flex-col w-52 relative">
      <button
        type="button"
      >
        <div className="h-auto w-full flex flex-col gap-1">
          <div
            className="h-36 w-full border-2 border-blue flex
            flex-col items-center justify-center gap-2 text-blue
            rounded-lg bg-[#fff] cursor-default"
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 50 }} />
            <p className="font-black text-lg">{ name }</p>
          </div>
        </div>
      </button>
      {state !== '' && <ExpirationTag date={date} state={state} position="bottom" />}
      {state !== 'ok' && <AlertBadge type={state} />}
    </div>
  );
}

CertificateBox.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string,
  date: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
};

export default CertificateBox;
