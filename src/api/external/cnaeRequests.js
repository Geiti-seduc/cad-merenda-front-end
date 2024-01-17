export const checkCnae = async (cnae) => {
  const url = `https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${cnae}`;
  const res = await fetch(url);
  return res.ok;
};
