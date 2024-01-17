import PropTypes from 'prop-types';
import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

function LinkExternal({ title, link = '.' }) {
  return (
    <a href={link} className="flex gap-4 items-center">
      <h2
        className="text-blue text-2xl
    font-extrabold"
      >
        { title }
      </h2>
      <LaunchIcon className="text-blue" />
    </a>
  );
}

LinkExternal.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default LinkExternal;
