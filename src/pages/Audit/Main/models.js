import * as supplierRequests from '../../../api/supplierRequests';
import * as addressRequests from '../../../api/addressRequests';
import * as foodRequests from '../../../api/foodRequests';

const getSingleSupplier = async (id, token) => {
  const supplier = await supplierRequests.getSupplierById(id, token);
  const address = await addressRequests.getAddressById(supplier.addressId, token);
  return [supplier, address];
};

export const dataGroups = {
  suppliers: {
    label: 'Fornecedores',
    categories: [
      {
        label: 'Dados dos fornecedores',
        utils: {
          getSingle: getSingleSupplier,
          getAll: supplierRequests.fetchSuppliers,
        },
        subcategories: [],
      },
      {
        label: 'Ofertas',
        subcategories: ['Todas as ofertas'],
      },
    ],
  },
  nutritionist: {
    label: 'Nutricionista',
    categories: [
      {
        label: 'Alimentos cadastrados',
        utils: {
          getAll: foodRequests.fetchFood,
          getSingle: foodRequests.getFoodById,
        },
        subcategories: [],
      },
      {
        label: 'Pautas',
        subcategories: ['Ciclo atual', 'Ciclo anterior', 'Todos os ciclos'],
      },
    ],
  },
  school: {
    label: 'Escolas',
    categories: [
      {
        label: 'Dados das escolas',
        subcategories: [],
      },
      {
        label: 'Pedidos',
        subcategories: ['Todos os pedidos'],
      },
    ],
  },
};
