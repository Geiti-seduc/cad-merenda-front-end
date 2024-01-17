import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function OverlayButton({ setVisible = () => {} }) {
  return (
    <div
      className="hidden md:block z-10 fixed top-50 left-0 -translate-x-1/2 hover:-translate-x-1/4 ease-in-out transition-transform"
    >
      <Button
        severity="info"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        icon={<InfoOutlinedIcon fontSize="medium" className="translate-x-7" />}
        style={{ borderRadius: '30px', height: '60px', width: '120px' }}
      />
    </div>
  );
}

OverlayButton.propTypes = {
  setVisible: PropTypes.func,
};

export default OverlayButton;
