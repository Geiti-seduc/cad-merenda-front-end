import React from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@mui/icons-material/Done';

export default function Circle({ status }) {
  if (status === 'PENDING') {
    return (
      <div
        className="rounded-full
      h-[20px] w-[20px] md:h-[25px] md:w-[25px] bg-white border-2 border-blue outline outline-4 outline-white"
      />
    );
  }
  if (status === 'FINISHED') {
    return (
      <div
        className="rounded-full h-[20px] w-[20px] md:h-[25px] md:w-[25px] bg-concrete
        flex justify-center items-center outline outline-4 outline-white"
      >
        <DoneIcon className="text-white" fontSize="smaller" />
      </div>
    );
  }
  if (status === 'OPEN') {
    return (
      <div
        className="rounded-full h-[20px] w-[20px] md:h-[25px] md:w-[25px] bg-blue outline-4 outline outline-white"
      />
    );
  }
}

Circle.propTypes = {
  status: PropTypes.string.isRequired,
};
