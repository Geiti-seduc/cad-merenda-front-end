/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import External from '../../assets/images/External.svg';

function LinkExternal(props) {
  return (
    <a href="#" className="flex gap-4 items-center">
      <h2
        className="text-[#005CA9] text-2xl
    font-extrabold"
      >
        { props.title }
      </h2>
      <img src={ External } alt="Ícone external.svg" />
    </a>
  );
}

export default LinkExternal;
