import PropTypes from 'prop-types';

function Button({ icon, content, color, active, border = '',
  borderColor = '', background, classes = '', radius, onClick }) {
  return (
    <button
      className={ `
        ${classes}
        div-button 
        flex
        items-center
        ${border}
        border-[${borderColor}]
        text-base
        w-[161px]
        h-[50px]
        font-extrabold
        justify-center 
        bg-[${background}] 
        text-[${color}] 
        border 
        active:bg-[${active}] 
        ${radius}
        cursor-pointer
        mt-2 sm:mt-0
        active:text-[${background}]
        active:bg-[${color}]
        drop-shadow-md
        ` }
      type="button"
      onClick={ onClick }
    >
      { icon }
      { content }
    </button>
  );
}

export default Button;

Button.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  radius: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
};
