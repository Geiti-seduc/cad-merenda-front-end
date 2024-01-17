import { parseDate } from './DataParser';

const formatObject = (data) => {
  const options = [
    {
      name: 'deadlineNutri',
      title: 'PAUTAS',
      role: 'NUTRICIONISTA',
      description: 'Definir os itens disponíveis para pedidos.',
    },
    {
      name: 'deadlineSchool',
      title: 'PEDIDOS',
      role: 'ESCOLA',
      description: 'Selecionar itens disponíveis na pauta de compra.',
    },
    {
      name: 'deadlineSupplier',
      title: 'PROPOSTAS',
      role: 'FORNECEDOR',
      description: 'Selecionar escolas e definir os preços dos produtos.',
    },
    {
      name: 'deadlineSelectSupplier',
      title: 'VISUALIZAÇÃO',
      role: 'ESCOLA',
      description: 'Visualizar orçamentos propostos pelos fornecedores.',
    },
  ];

  const startDates = [
    'startNutri', 'startSchool', 'startSupplier', 'initSelectSupplier',
  ];

  const newData = [];
  options.forEach((option, i) => {
    newData.push({
      title: option.title,
      role: option.role,
      description: option.description,
      start: data[startDates[i]],
      end: data[option.name],
      tag: option.tag,
    });
  });
  return newData;
};

const tagCycle = (data) => {
  const currentDate = new Date(Date.now()).getTime();
  const tagged = [];
  let activeIndex = null;
  let hasAnyPending = false;

  data.forEach((item, i) => {
    const startDate = new Date(item.start).getTime();
    const endDate = new Date(item.end).getTime();
    if (currentDate > startDate && currentDate < endDate) {
      activeIndex = i;
      tagged.push({
        ...item,
        tag: 'OPEN',
      });
    } else if (currentDate < startDate) {
      tagged.push({
        ...item,
        tag: 'PENDING',
      });
      hasAnyPending = true;
    } else if (currentDate > endDate) {
      tagged.push({
        ...item,
        tag: 'FINISHED',
      });
    }
  });

  if (activeIndex !== null) {
    tagged.unshift({
      title: 'CURRENT STAGE',
      index: activeIndex,
    });
  } else if (!hasAnyPending) {
    tagged.unshift({
      title: 'END OF CYCLE',
    });
  }

  return tagged;
};

export const daysUntil = (date) => {
  const currentDate = new Date(Date.now()).getTime();
  const targetDate = new Date(date).getTime();
  const diff = targetDate - currentDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
};

export const checkAvailability = (data) => {
  let obj = {
    PAUTAS: null,
    PEDIDOS: null,
    PROPOSTAS: null,
    VISUALIZAÇÃO: null,
  };

  Object.keys(data).forEach((key) => {
    if (data[key].title === 'PAUTAS') {
      obj = {
        ...obj,
        PAUTAS: data[key].tag,
      };
    }
    if (data[key].title === 'PEDIDOS') {
      obj = {
        ...obj,
        PEDIDOS: data[key].tag,
      };
    }
    if (data[key].title === 'PROPOSTAS') {
      obj = {
        ...obj,
        PROPOSTAS: data[key].tag,
      };
    }
    if (data[key].title === 'VISUALIZAÇÃO') {
      obj = {
        ...obj,
        VISUALIZAÇÃO: data[key].tag,
      };
    }
  });
  return obj;
};

export const cycleParser = (data) => {
  if (!data) return null;
  const formattedData = formatObject(data);
  const taggedData = tagCycle(formattedData);
  let activeStage = null;
  if (taggedData[0].title === 'CURRENT STAGE') activeStage = taggedData.shift();
  if (taggedData.length === 0) return { date: '00/00/0000', daysToClose: 0, data: formattedData };
  const availability = checkAvailability(taggedData);
  return {
    ended: activeStage === null && taggedData[0].title === 'END OF CYCLE',
    soon: activeStage === null && taggedData[0].title !== 'END OF CYCLE',
    betweenStage: activeStage === null,
    list: availability.PAUTAS,
    school: availability.PEDIDOS,
    supplier: availability.PROPOSTAS,
    view: availability.VISUALIZAÇÃO,
    date: activeStage === null ? '00/00/0000' : parseDate(formattedData[activeStage.index].end),
    daysToClose: activeStage === null ? '0' : daysUntil(formattedData[activeStage.index].end),
    data: taggedData,
  };
};

export const checkCurrentStatus = (data) => {
  const formattedObject = formatObject(data);

  const currentDate = new Date(Date.now()).getTime();
  let currentStatus = null;

  formattedObject.forEach((item) => {
    const startDate = new Date(item.start).getTime();
    const endDate = new Date(item.end).getTime();

    if (currentDate > startDate && currentDate < endDate) {
      currentStatus = item;
    }
  });

  return currentStatus;
};
