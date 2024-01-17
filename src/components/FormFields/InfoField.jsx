import React from 'react';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';

function InfoField({
  value = '', classes, id, label = id.toUpperCase(),
}) {
  return (
    <div className={`flex flex-col gap-1 ${classes}`}>
      <label
        htmlFor={id}
        className="text-sm whitespace-nowrap
        font-bold text-concrete"
      >
        {label}
      </label>
      <InputText
        type="text"
        name={id}
        id={id}
        value={value}
        readOnly
        className="w-full text-[--midnight]"
      />
    </div>
  );
}

InfoField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default InfoField;
