import React from 'react';
import PropTypes from 'prop-types';

function InputContainer({ children, classes, title }) {
  return (
    <div className={classes}>
      <span className="font-bold text-sm">{title.toUpperCase()}</span>
      {children}
    </div>
  );
}

InputContainer.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  title: PropTypes.string,
};

export default InputContainer;
