import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProcessStatus({ status = 'PENDING' }) {
  const [active, setActive] = useState({});

  useEffect(() => {
    switch (status) {
      case 'OPEN':
        setActive({
          text: 'PROCESSO ABERTO',
          color: 'green',
        });
        break;

      case 'PENDING':
        setActive({
          text: 'PROCESSO PENDENTE',
          color: 'orange',
        });
        break;

      case 'FINISHED':
        setActive({
          text: 'PROCESSO FINALIZADO',
          color: 'concrete',
        });
        break;

      default:
        break;
    }
  }, [status]);

  return (
    <span
      className={`border border-${active.color} rounded w-56 h-10
      text-center py-1 font-medium flex items-center justify-center text-${active.color}`}
    >
      {active.text}
    </span>
  );
}

ProcessStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ProcessStatus;
