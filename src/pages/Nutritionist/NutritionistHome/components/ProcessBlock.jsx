import React from 'react';
import PropTypes from 'prop-types';
import ProcessStatus from '../../../../components/ProcessStatus/ProcessStatus';

function ProcessBlock({ cycleData }) {
  return (
    <div className="flex flex-col w-full my-3">
      {cycleData ? cycleData.map((step) => (
        <div key={`${step.title}block`} className="flex items-center justify-between sm:justify-start w-full py-2">
          <ProcessStatus status={step.tag} />
          <p className="font-bold text-[--midnight] text-lg leading-none sm:ml-8">
            {step.title}
          </p>
        </div>
      )) : <p>Carregando...</p>}
    </div>
  );
}

ProcessBlock.propTypes = {
  cycleData: PropTypes.any,
};

export default ProcessBlock;
