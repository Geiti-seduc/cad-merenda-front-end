/* eslint-disable no-magic-numbers */
import React from 'react';
import PropTypes from 'prop-types';
import ProcessStatus from '../../../../components/ProcessStatus/ProcessStatus';

function StatusBlock({ status, targetDate }) {
  let time = '';
  const currentTime = new Date();
  const targetTime = new Date(targetDate);
  const diff = targetTime - currentTime;

  if (diff < 0) { // negative diff
    time = '';
  } else if (diff < 86400000) { // less than a day
    const hours = `${Math.floor(diff / 3600000)}:${Math.floor((diff % 3600000) / 60000)}`;
    time = `${hours} horas`;
  } else { // a day or more
    const days = Math.floor(diff / 86400000);
    time = `${days} DIA${days > 1 ? 'S' : ''}`;
  }

  return (
    <div
      className="flex flex-col lg:flex-row
      lg:items-center w-full justify-between mr-10"
    >
      <ProcessStatus status={status} />
      {targetDate && <p className="text-blue hidden lg:block">{`ENCERRA EM ${time}`}</p>}
    </div>
  );
}

StatusBlock.propTypes = {
  status: PropTypes.string.isRequired,
  targetDate: PropTypes.string.isRequired,
};

export default StatusBlock;
