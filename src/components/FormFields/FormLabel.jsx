import React from 'react';
import PropTypes from 'prop-types';

function FormLabel({
  children, htmlFor, dark = false, small = false,
}) {
  return (
    <label
      className="text-sm whitespace-nowrap font-bold text-concrete"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  small: PropTypes.bool,
};

export default FormLabel;
