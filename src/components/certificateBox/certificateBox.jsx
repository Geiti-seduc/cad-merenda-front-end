/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Exclamacao_red from '../../assets/images/exclamacao-red.svg';
import Exclamacao_orange from '../../assets/images/exclamacao-orange.svg';
import File_dock from '../../assets/images/File_dock.svg';

import './certificateBox.scss';

const certificateBox = (props) => (
  <div className="flex flex-col">

    <div className="topo-box-cnd">
      {props.type_ex === 1 ? (
        <img className="icone-aviso" src={ Exclamacao_red } alt="" />
      ) : props.type_ex === 0 ? (
        <img className="icone-aviso invisible" src={ Exclamacao_red } alt="" />
      ) : (
        <img className="icone-aviso" src={ Exclamacao_orange } alt="" />
      )}
    </div>

    <div
      className="box-cnd hover:bg-[#fafafa]"
    >
      <img
        className="picture pt-6"
        src={ File_dock }
        alt=""
      />
      <h1>{props.name_cnd}</h1>
      {props.color_span === 1 ? (
        <span
          className="border-2 border-[#F63B42] relative
        bottom-[-14px] bg-white text-[#F63B42] font-extrabold text-sm rounded-md
        py-[2px] px-[10px]"
        >
                  VENCE EM
          { ` ${props.due_date}`}
        </span>
      ) : props.color_span === 0 ? (
        <span
          className="border-2 border-[#14AE5C] relative
          bottom-[-14px] bg-white text-[#14AE5C] font-extrabold text-sm rounded-md
          py-[2px] px-[10px]"
        >
              VENCE EM
          { ` ${props.due_date}`}
        </span>
      ) : (
        <span
          className="border-2 border-[#FF9842] relative
            bottom-[-14px] bg-white text-[#FF9842] font-extrabold text-sm rounded-md
            py-[2px] px-[10px]"
        >
                VENCE EM
          { ` ${props.due_date}`}
        </span>
      )}
    </div>

  </div>

);

export default certificateBox;
