import React from 'react';
import PropTypes from 'prop-types';

function Button({
  icon = '',
  content, color = '#fff', active, border = '',
  borderColor = '', background, classes = '',
  radius, onClick = () => {},
}) {
  return (
    <button
      className={` 
        flex
        items-center
        ${border}
        border-[${borderColor}]
        text-base
        gap-2
        w-[161px]
        h-[50px]
        font-extrabold
        justify-center 
        bg-[${background}] 
        text-[${color}] 
        border 
        ${radius}
        cursor-pointer
        mt-2 sm:mt-0
        ${active}
        active:bg-[#ffffff]
        ${classes}
        `}
      type="button"
      onClick={onClick}
    >
      { icon }
      { content }
    </button>
  );
}

export default Button;

Button.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object,
  content: PropTypes.string.isRequired,
  color: PropTypes.string,
  active: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  radius: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
};
