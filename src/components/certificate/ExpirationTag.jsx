import React from 'react';
import PropTypes from 'prop-types';

function ExpirationTag({ date = 'dd/mm/yyyy', state = 'ok', position }) {
  const handlePosition = () => {
    if (position === 'bottom') return 'bottom-0 translate-y-1/2';
    if (position === 'top') return 'top-0 -translate-y-1/2';
    throw new Error('Invalid position prop. Available positions: top, bottom.');
  };

  const options = {
    warn: {
      color: 'border-orange text-orange',
      text: `VENCE EM ${date}`,
    },
    danger: {
      color: 'border-red text-red',
      text: `VENCE EM ${date}`,
    },
    ok: {
      color: 'border-green text-green',
      text: `VENCE EM ${date}`,
    },
    missing: {
      color: 'border-concrete text-concrete',
      text: 'NÃO ENVIADO',
    },
    expired: {
      color: 'border-red text-red',
      text: 'VENCIDO',
    },
  };

  return (
    <span
      className={`border-2
              text-xs
              ${options[state].color}
              rounded-lg p-1
              font-bold
              bg-white
              absolute
              px-2
              ${handlePosition()}
              left-1/2
              transform
              -translate-x-1/2
              whitespace-nowrap`}
    >
      {`${options[state].text}`}
    </span>
  );
}

ExpirationTag.propTypes = {
  date: PropTypes.string,
  state: PropTypes.string,
  position: PropTypes.string.isRequired,
};

export default ExpirationTag;
