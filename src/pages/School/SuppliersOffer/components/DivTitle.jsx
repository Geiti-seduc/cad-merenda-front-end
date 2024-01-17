import React from 'react';
import PropTypes from 'prop-types';

function DivTitle({ title }) {
  return (
    <div
      className="text-xl sm:text-2xl text-blue
                   font-extrabold py-7 border-b border-silver"
    >
      <h1>
        {title}
      </h1>
    </div>
  );
}

DivTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DivTitle;
