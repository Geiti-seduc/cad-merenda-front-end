import React from 'react';
import PropTypes from 'prop-types';
import Step from './Steps';
import { parseDate } from '../../../../utils/DataParser';

function Stepper({ dates }) {
  if (!dates) return null;

  return (
    <div className="relative flex w-screen justify-between items-center">
      <hr className="border-[1px] rounded-xl border-border w-full top-3 absolute -z-10 px-10" />
      {dates && dates.map((item) => (
        <Step
          key={`${item.title.toLowerCase()}Step`}
          title={item.title}
          start={parseDate(item.start)}
          end={parseDate(item.end)}
          state={item.tag}
        />
      ))}
    </div>

  );
}

Stepper.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stepper;
