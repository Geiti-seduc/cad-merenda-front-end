import PropTypes from 'prop-types';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from 'primereact/button';

function BlueButton({ content = 'CADASTRAR', onClick, extraClasses = '' }) {
  return (
    <Button
      icon={<AddBoxIcon className="mr-2" />}
      outlined
      className={extraClasses}
      label={content}
      type="button"
      onClick={onClick}
    />
  );
}

BlueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string,
  extraClasses: PropTypes.string,
};

export default BlueButton;
