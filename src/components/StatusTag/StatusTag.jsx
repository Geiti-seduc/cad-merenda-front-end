import { React } from 'react';
import './StatusTag.scss';
import PropTypes from 'prop-types';

function StatusTag({ text }) {
  let borderColor = '#000';
  let textColor = '#000';

  if (text === 'FINALIZADO') {
    borderColor = '#BDC3C7';
    textColor = '#95A5A6';
  }
  if (text === 'ABERTO') {
    borderColor = '#14AE5C';
    textColor = '#14AE5C';
  }
  if (text === 'EM AGUARDO') {
    borderColor = '#FF9842';
    textColor = '#FF9842';
  }

  return (
    <div
      className={ `flex flex-row justify-center items-center border-2 border-[${
        borderColor
      }] h-8 px-4 w-44 md:w-64 rounded-lg` }
    >
      <p
        className={ `font-bold text-sm text-[${
          textColor
        }]` }
      >
        { text }

      </p>
    </div>
  );
}

StatusTag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StatusTag;
