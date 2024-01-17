/* eslint-disable max-lines */
function Exception(message) {
  this.message = message;
  this.name = 'Exception';
}

const allFiles = [];
const numberOfCertificates = 4;

const getFiles = (from, uploaded) => {
  console.log('Certificates got:', uploaded);

  const i = allFiles.findIndex((e) => e.from === from);
  // eslint-disable-next-line
  if (i > -1) {
    allFiles[i].uploaded = uploaded;
    console.log('Replaced!');
  } else {
    allFiles.push({
      uploaded,
      from,
    });
  }

  console.log(allFiles);
};

const checkFields = (array) => {
  let boolean = true;

  array.forEach((element) => {
    console.log(`ForEach: ${element}`);

    if (element === '' || element === ' ' || element == null) {
      boolean = false;
    }
  });
  return boolean;
};

const checkFiles = () => {
  if (allFiles.length !== numberOfCertificates) {
    throw new Exception('Insira todos os arquivos.');
  }
};

const getCep = async (cepValue) => {
  const url = `https://viacep.com.br/ws/${cepValue}/json/`;
  const cepPattern = /^[0-9]{8}$/;

  if (cepPattern.test(cepValue)) {
    const data = await fetch(url);
    const endereco = await data.json();

    if (endereco.erro) {
      return true;
    }
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('municipio').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
    document.getElementById('numero').focus();
    document.getElementById('cep').value = endereco.cep;

    return false;
  }
  return true;
};

const handleCep = (e) => {
  e.preventDefault();
  const cepValue = e.target.value.replace(/\D/g, '');
  if (!getCep(cepValue)) {
    throw new Error('CEP inválido.');
  }
};

const getRegions = (municipio) => {
  const ibge = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/AL/municipios';

  return fetch(ibge)
    .then((data) => data.json())
    .then((list) => {
      if (list.length === 0) {
        return ['', ''];
      }

      const object = list.find((obj) => obj.nome === municipio);
      const imediata = object['regiao-imediata'].nome;
      const intermediaria = object['regiao-imediata']['regiao-intermediaria'].nome;

      return [imediata, intermediaria];
    })
    .catch((error) => {
      throw error;
    });
};

// eslint-disable-next-line react-func/max-lines-per-function
function getInputObject(type, id) {
  const cnpj = document.getElementById('razaoSocial').value;
  const razaoSocial = document.getElementById('razaoSocial').value;
  const nomeFantasia = document.getElementById('nomeFantasia').value;
  const inscEstadual = document.getElementById('inscEstadual').value;
  const cnae = document.getElementById('cnae').value;
  const cep = document.getElementById('cep').value.replace(/^a-zA-Z0-9 ]/g, '');
  const logradouro = document.getElementById('logradouro').value;
  const numero = document.getElementById('numero').value;
  const bairro = document.getElementById('bairro').value;
  const municipio = document.getElementById('municipio').value;
  const uf = document.getElementById('uf').value;
  const complemento = document.getElementById('complemento').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const responsavel = document.getElementById('responsavel').value;
  const senha = document.getElementById('password').value;
  const confirmaSenha = document.getElementById('passwordConfirmation').value;

  if (type === 'mandatory') {
    const mandatory = [
      cnpj,
      razaoSocial,
      nomeFantasia,
      inscEstadual,
      cnae,
      cep,
      logradouro,
      numero,
      bairro,
      municipio,
      uf,
      email,
      responsavel,
      senha,
      confirmaSenha,
    ];
    console.log(mandatory);
    return mandatory;
  }

  if (type === 'supplier') {
    const supplier = {
      cnpj,
      corporate_name: razaoSocial,
      trade_name: nomeFantasia,
      state_registration: inscEstadual,
      cnae,
      phone: telefone,
      email,
      tech_manager: responsavel,
      address_id: id,
    };
    return supplier;
  }

  if (type === 'address') {
    try {
      const [regiaoImediata, regiaoIntermediaria] = getRegions(municipio);

      const address = {
        zip: cep,
        street: logradouro,
        number: numero,
        district: bairro,
        city: municipio,
        state: uf,
        complement: complemento,
        immediate_region: regiaoImediata,
        intermediate_region: regiaoIntermediaria,
      };

      return address;
    } catch (error) {
      const address = {
        zip: cep,
        street: logradouro,
        number: numero,
        district: bairro,
        city: municipio,
        state: uf,
        complement: complemento,
        immediate_region: '404',
        intermediate_region: '404',
      };

      return address;
    }
  }
}

function validatePassword() {
  const passTest = document.getElementById('password');
  const passConfirmation = document.getElementById('passwordConfirmation');

  if (passTest.value === '') {
    throw new Exception('Por favor, insira uma senha.');
  } if (passConfirmation.value === '') {
    throw new Exception('Por favor, confirme sua senha.');
  } if (passTest.value !== passConfirmation.value) {
    throw new Exception('As senhas não coincidem.');
  }
  passTest.value = '';
  passConfirmation.value = '';
}

const handleCnpj = () => {
  const rawCnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
  // eslint-disable-next-line no-magic-numbers
  if (rawCnpj.length !== 14) {
    throw new Exception('CNPJ inválido');
  } else {
    // eslint-disable-next-line
      const cnpj = `${rawCnpj.substr(0, 2)}.${rawCnpj.substr(2, 3)}.${rawCnpj.substr(5, 3)}/${rawCnpj.substr(8, 4)}-${rawCnpj.substr(12)}`;
    return cnpj;
  }
};

const handleTel = () => {
  const tel = document.getElementById('telefone').value.replace(/\D/g, '');
  // eslint-disable-next-line no-magic-numbers
  if (tel.length > 12) throw new Exception('Telefone inválido');
  else return tel;
};

const verifyInfo = async () => {
  validatePassword();
  const cnpj = handleCnpj();
  const tel = handleTel();
  console.log('CNPJ:', cnpj);
  console.log('Telefone:', tel);
};

const submit = () => {
  const mandatory = getInputObject('mandatory');
  console.log(mandatory);
  if (!checkFields(mandatory)) {
    throw new Exception('Preencha todos os campos obrigatórios');
  } else {
    try {
      checkFiles();
    } catch (error) {
      throw new Exception(error.message);
    }
    try {
      verifyInfo();
    } catch (error) {
      throw new Exception(error.message);
    }
    // THEN SHIP TO BACKEND
  }
  throw new Exception('Erro ao cadastrar fornecedor');
};

export { getInputObject, submit, handleCep, getFiles };
