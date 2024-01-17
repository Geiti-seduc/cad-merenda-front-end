import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';

function InputField({
  id,
  name = id,
  type = 'text',
  value = '',
  innerText = name.toUpperCase(),
  onChange = () => {},
  small = false,
}) {
  const width = small ? 'w-1/2' : 'w-full';
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={`${width}`}>
      <span className="p-float-label">
        <InputText
          id={id}
          name={name}
          type={type}
          value={inputValue}
          className="w-full"
          onChange={(e) => { setInputValue(e.target.value); onChange(e.target.value); }}
        />
        <label htmlFor={name}>{innerText}</label>
      </span>
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  innerText: PropTypes.string,
  small: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputField;
