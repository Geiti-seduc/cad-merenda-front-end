/* eslint-disable camelcase */
export function formatDataSchool(userData) {
  const { school_user } = userData;
  return school_user[0];
}

export function formatDataSchoolOrder(schoolData, generalList, orders, item) {
  const orderData = {
    school_inep: schoolData.school_inep,
    cycle: localStorage.getItem('cycle'),
    general_list_id: generalList.find((list) => list.modality_name === item.modality.name).id,
    requested_products: orders.filter((order) => order.modality === item.modality.name),
  };
  return orderData;
}
