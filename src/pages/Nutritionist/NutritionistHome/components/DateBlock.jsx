import React from 'react';
import PropTypes from 'prop-types';

function DateBlock({ endDate }) {
  return (
    <div
      className="mt-12 flex flex-col justify-center grow w-full
      p-8 border border-silver text-center rounded-2xl"
    >
      <p
        className="-translate-y-3 text-lg font-semibold
              text-[--midnight]"
      >
        DATA PREVISTA PARA FIM DA ETAPA ATUAL:
      </p>
      <p className="text-5xl sm:text-6xl text-blue font-semibold">
        {endDate}
      </p>
    </div>
  );
}

export default DateBlock;

DateBlock.propTypes = {
  endDate: PropTypes.string.isRequired,
};
