/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
// Components
import { differenceInDays, addDays, format } from 'date-fns';
import Alarm from '../../../assets/images/alarm.svg';
import './SchoolHome.scss';

function SchoolHome() {
  const offers = ' 12';

  // Exemplo de datas
  const currentDate = new Date();
  const closingDate = addDays(currentDate, 7);

  // Calcula a diferença em dias entre as datas
  const daysDifference = differenceInDays(closingDate, currentDate);

  // Formata as datas para exibição
  const formattedClosingDate = format(closingDate, ' dd/MM/yyyy');

  // Se a diferença de dias for menor que 10, adiciona um zero à esquerda
  // Verifica se a diferença de dias é menor que 10
  const isLessThan10 = daysDifference < 10;
  const daysDifferenceWithZero = isLessThan10
    ? `0${daysDifference}`
    : daysDifference;

  // Se a diferença de dias for 1, exibe "DIA", senão, exibe "DIAS"
  const daysDifferenceWithSpace = daysDifference === 1
    ? `${daysDifferenceWithZero.toString()} DIA`
    : `${daysDifferenceWithZero.toString()} DIAS`;

  return (
    <div className="schoolHome_page">
      <div className="wrapper max-w-[1920px] gap-[25px]">
        <div className="flex flex-col justify-center items-center gap-[25px]">
          <h1 className="text-[#2C3E50] text-9xl font-extrabold">{ offers }</h1>
          <h2
            className="text-3xl font-bold
         text-[#2C3E50]"
          >
            OFERTAS PARA A SUA ESCOLA ATÉ O MOMENTO

          </h2>
        </div>

        <div className="flex flex-col justify-center items-center gap-[22px]">
          <div className="flex gap-[8px] item-scenter">
            <img src={ Alarm } alt="" />
            <h3 className="text-2xl text-[#2C3E50]">PERÍODO PARA OFERTAS ENCERRA EM:</h3>
          </div>
          <div
            className="bg-[#005CA9] py-[8px] px-[146px] rounded-[10px]"
          >
            <h1
              className="text-[60px] font-extrabold
           text-white "
            >
              { daysDifferenceWithSpace }
            </h1>
          </div>
          <span className="text-xl text-[#2C3E50]">
            DATA DE ENCERRAMENTO:
            { formattedClosingDate }
          </span>
        </div>

      </div>
    </div>
  );
}

export default SchoolHome;
