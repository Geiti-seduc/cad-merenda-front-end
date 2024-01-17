/* eslint-disable no-param-reassign */
import { getLatestCycle } from '../../api/cyclesRequests';
import {
  createOrder, getOrderByInep, updateOrder,
} from '../../api/foodListRequests';
import { getGeneralList } from '../../api/generalListRequest';
import { getModalityByInep } from '../../api/schoolRequests';

class Order {
  constructor() {
    this.inep = null;
    this.cycleId = null;
    this.order = [];
    this.hasInitiated = false;
  }

  async init(inep, token) {
    this.inep = inep;
    try {
      const cycle = await getLatestCycle(token);
      this.cycleId = cycle.id;
    } catch (error) {
      throw new Error('Erro ao carregar ciclo');
    }

    try {
      const res = await getModalityByInep(inep, token);
      this.modalities = res.map((modality) => ({
        ...modality,
        requestedProducts: [],
        generalList: [],
        hasOrder: false,
      }));
    } catch (error) {
      throw new Error('Erro ao carregar modalidades');
    }

    try {
      const fetchedGeneralLists = await getGeneralList(token, this.cycleId);
      const updatedModalities = this.modalities;
      fetchedGeneralLists.forEach((generalList) => {
        const modalityIndex = updatedModalities.findIndex(
          (mod) => mod.label === generalList.modality_name,
        );
        if (modalityIndex === -1) return;
        updatedModalities[modalityIndex] = {
          ...updatedModalities[modalityIndex],
          generalList: {
            id: generalList.id,
            food: generalList.general_list_food,
          },
          hasOrder: true,
        };
      });
    } catch (error) {
      throw new Error('Erro ao carregar pautas');
    }

    try {
      const res = await getOrderByInep(inep, this.cycleId, token);
      const updatedModalities = this.modalities;
      res.forEach((order) => {
        const modalityIndex = updatedModalities.findIndex(
          (mod) => mod.generalList.id === order.general_list_id,
        );
        if (modalityIndex === -1) return;
        updatedModalities[modalityIndex] = {
          ...updatedModalities[modalityIndex],
          orderId: order.id,
          requestedProducts: order.requested_products,
          hasOrder: true,
        };
      });
      this.mergeLists();
    } catch (error) {
      throw new Error('Erro ao carregar pedidos');
    }

    this.hasInitiated = true;
  }

  mergeLists() {
    const updatedModalities = this.modalities;
    updatedModalities.forEach((modality) => {
      if (modality.hasOrder) {
        const generalList = modality.generalList.food;
        const order = modality.requestedProducts;
        const mergedList = generalList.map((item) => {
          const orderItem = order.find((ordered) => ordered.food_id === item.id);
          if (orderItem) {
            return {
              ...item,
              fullname: `${item.name}, ${item.description}`,
              quantity: orderItem.quantity,
              frequency: orderItem.frequency,
              notOrdered: false,
            };
          }
          return {
            ...item,
            fullname: `${item.name}, ${item.description}`,
            quantity: 0,
            frequency: null,
            notOrdered: true,
          };
        });
        modality.unified = mergedList;
      } else {
        modality.unified = modality.generalList.food;
      }
    });
  }

  checkInit() {
    if (!this.hasInitiated) throw new Error('Instância não inicializada');
  }

  getData() {
    this.checkInit();
    return this.modalities || [];
  }

  getValuesByModality(name) {
    this.checkInit();
    const modality = this.modalities.find((mod) => mod.label === name);
    const values = modality.unified.reduce((acc, item) => {
      acc.quantityList[item.id] = item.quantity;
      acc.frequencyList[item.id] = item.frequency;
      return acc;
    }, { quantityList: {}, frequencyList: {} });
    return values;
  }

  getContents() {
    this.checkInit();
    return this.modalities || [];
  }

  updateValues(label, values) {
    const modalityIndex = this.modalities.findIndex((mod) => mod.label === label);
    if (modalityIndex !== -1) {
      const modality = this.modalities[modalityIndex];
      modality.unified.forEach((item) => {
        const foodId = item.id;
        if (values.quantityList[foodId]) {
          item.quantity = values.quantityList[foodId];
        }
        if (values.frequencyList[foodId]) {
          item.frequency = values.frequencyList[foodId];
        }
      });
    }
  }

  checkEmptyValues() {
    this.checkInit();
    this.modalities.forEach((modality) => {
      modality.unified.forEach((item) => {
        if (!item.quantity) {
          if (item.frequency) throw new Error('Há itens sem quantidade ou periodicidade definida');
        }
        if (!item.frequency) {
          if (item.quantity
            && (item.quantity !== 0 || item.quantity !== '0')) {
            throw new Error('Há itens sem quantidade ou periodicidade definida');
          }
        }
      });
    });
  }

  formatOrder(data) {
    this.checkInit();
    const orderData = {
      school_inep: this.inep,
      cycle_id: this.cycleId,
      order_id: data.orderId,
      general_list_id: data.generalList.id,
      requested_products: data.unified
        .filter((item) => item.quantity > 0)
        .map((item) => ({
          food_id: item.id,
          quantity: item.quantity,
          frequency: item.frequency,
          exists: !item.notOrdered,
        })),
      skip: data.unified.length === 0
            || data.unified.every((item) => !item.quantity
            || !item.frequency
            || item.quantity === 0),
    };
    return orderData;
  }

  async sendOrder(token) {
    this.checkInit();
    const promises = this.modalities.map(async (modality) => {
      const data = this.formatOrder(modality);
      if (!data.skip) {
        if (!data.order_id) {
          await createOrder(data, token);
        } else {
          await updateOrder(data, token);
        }
      }
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao enviar pedido');
    }
  }
}

export default Order;
