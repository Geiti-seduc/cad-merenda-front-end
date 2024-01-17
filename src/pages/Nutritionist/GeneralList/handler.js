import { createGeneralList, updateGeneralList } from '../../../api/foodListRequests';

export const sendRequest = async (params) => {
  const errorTrigger = false;
  const {
    modalities, cycleId, userToken,
  } = params;

  const promises = modalities.map(async (item) => {
    if (errorTrigger) return;
    const foodList = [];
    const removedList = [];

    item.fetchedList.forEach((food) => {
      if (!item.list.some((selected) => selected.id === food.id)) {
        removedList.push(food.id);
      }
    });

    item.list.forEach((food) => {
      if (!item.fetchedList.some((selected) => selected.id === food.id)) {
        foodList.push(food.id);
      }
    });

    const body = {
      description: item.description,
      list_id: item.list_id,
      modality_id: item.id,
      cycle_id: cycleId,
      general_list_itens: foodList,
      general_list_removed: removedList,
    };

    if (item.mode === 'update') await updateGeneralList(body, userToken);
    else if (item.mode === 'create') await createGeneralList(body, userToken);
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new Error('Não foi possível atualizar a lista');
  }
};
