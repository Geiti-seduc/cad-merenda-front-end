import React from 'react';
import PropTypes from 'prop-types';
import redAlerrt from '../../assets/images/alertRed.svg';
import orangeAlert from '../../assets/images/alertOrange.svg';

function AlertBadge({ type }) {
  if (type === 'warn') {
    return (
      <img
        src={orangeAlert}
        alt="Ícone de alerta laranja."
        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
      />
    );
  } if (type === 'danger') {
    return (
      <img
        src={redAlerrt}
        alt="Ícone de alerta vermelho."
        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
      />
    );
  }
}

AlertBadge.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AlertBadge;
