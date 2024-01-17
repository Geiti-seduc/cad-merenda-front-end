import React from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';

function Step({
  title = 'TITLE', start = 'DD/MM', end = 'DD/MM', state = 'pending',
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Circle status={state} />
      <div className="flex flex-col items-center mt-3">
        <p className="text-sm md:text-md mt-1 text-[--midnight] font-bold">{title}</p>
        <p className="text-[10pt] hidden md:block text-concrete">
          {`${start} - ${end}`}
        </p>
      </div>
    </div>
  );
}

Step.propTypes = {

  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,

};

export default Step;
