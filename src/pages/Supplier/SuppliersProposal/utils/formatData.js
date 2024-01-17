/* eslint-disable camelcase */
export function formatDataSchool(schoolData) {
  const dataSchoolFormatted = {
    name: schoolData.name,
    inep: schoolData.inep,
    address: {
      street: schoolData.Address.street,
      district: schoolData.Address.district,
      number: schoolData.Address.number,
    },
  };
  return dataSchoolFormatted;
}
