export const getAllCities = async () => {
  try {
    // const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios', {
    const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/AL/municipios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return await res.json();
    } throw new Error('Não foi possível obter as cidades');
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getRegions = async (municipio) => {
  const ibge = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/AL/municipios';

  try {
    const data = await fetch(ibge);
    const list = await data.json();

    if (list.length === 0) {
      return ['', ''];
    }

    const object = list.find((obj) => obj.nome === municipio);
    const imediata = object['regiao-imediata'].nome;
    const intermediaria = object['regiao-imediata']['regiao-intermediaria'].nome;

    return [imediata, intermediaria];
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getCep = async (e) => {
  e.preventDefault();
  const cepValue = e.target.value.replace(/\D/g, '');
  const url = `https://viacep.com.br/ws/${cepValue}/json/`;
  const cepPattern = /^[0-9]{8}$/;

  if (cepPattern.test(cepValue)) {
    const data = await fetch(url);
    const endereco = await data.json();

    if (endereco.erro) {
      throw new Error('CEP não encontrado');
    } else {
      document.getElementById('street').value = endereco.logradouro;
      document.getElementById('district').value = endereco.bairro;
      document.getElementById('city').value = endereco.localidade;
      document.getElementById('state').value = endereco.uf;
      document.getElementById('number').focus();
      document.getElementById('zip').value = endereco.cep;
    }
  }
};
