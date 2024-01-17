import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

function SaveButton({
  onClick, classes, isDisabled = false, label, small = false,
}) {
  return (
    <Button
      icon={<SaveIcon className="mr-2" fontSize={small ? 'small' : 'medium'} />}
      label={label || 'SALVAR'}
      type="button"
      size={small ? 'small' : 'medium'}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  small: PropTypes.bool,
  label: PropTypes.string,
  classes: PropTypes.string,
};

export default SaveButton;
