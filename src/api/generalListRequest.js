/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { application } from '../utils/constants';
const { VITE_API_URL } = import.meta.env;

export const getGeneralList = async (token, cycle) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list/cycle/${cycle}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter a lista');
  } catch (error) {
    throw new Error(error);
  }
};

export const getGeneralListFormatted = async (token, cycle, userData, setInitialOrders, setOrders, withoutOrders = false) => {
  try {
    const res = await fetch(`${VITE_API_URL}/general_list/cycle/${cycle}`, {
      method: 'GET',
      headers: {
        'Content-Type': application,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const dataRes = await res.json();
      const data = dataRes.filter(
        (item) => userData.modalities.some(
          (modality) => modality.modality.name === item.modality_name,
        ),
      );
      let idAux = 0;
      data.map(async (item) => {
        const food = item.general_list_food.map((foodItem) => {
          foodItem.modality = item.modality_name;
          foodItem.quantity = 0;
          const returnItem = {
            id: idAux,
            food_id: foodItem.id,
            name: foodItem.name,
            measure: foodItem.measure,
            category: foodItem.category,
            description: foodItem.description,
            modality: item.modality_name,
            quantity: 0,
          };
          idAux += 1;
          return returnItem;
        });
        const dataFormated = food;
        if (withoutOrders) {
          await new Promise((resolve) => {
            setOrders((prev) => {
              const updatedOrders = [...prev, ...dataFormated];
              resolve(updatedOrders);
              return updatedOrders;
            });
          });

          const copiedOrders = dataFormated.map((order) => ({ ...order }));
          await new Promise((resolve) => {
            setInitialOrders((prev) => {
              const updatedInitialOrders = [...prev, ...copiedOrders];
              resolve(updatedInitialOrders);
              return updatedInitialOrders;
            });
          });
        }
      });
      return data;
    } throw new Error('Não foi possível obter a lista');
  } catch (error) {
    throw new Error(error);
  }
};
