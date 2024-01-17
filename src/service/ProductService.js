/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */
export const ProductService = {
  getProductsData() {
    return [
      {
        id: 1,
        nome: 'MAXI ATACADO',
        orcamento: 'R$ 00.000,00',
      },
      {
        id: 2,
        nome: 'ASSAÍ ATACADISTA',
        orcamento: 'R$ 00.000,00',
      },
      {
        id: 3,
        nome: 'MERCEARIA SÃO JORGE',
        orcamento: 'R$ 00.000,00',
      },
      {
        id: 4,
        nome: 'PANIFICAÇÃO FORENE',
        orcamento: 'R$ 00.000,00',
      },
      {
        id: 5,
        nome: 'EUSTÁQUIO COMPRAS',
        orcamento: 'R$ 00.000,00',
      },
    ];
  },
  getUnits() {
    return [
      {
        id: 1,
        unidade: 'KG',
      },
      {
        id: 2,
        nome: 'LITRO',
      },
      {
        id: 3,
        nome: 'GRAMA',
      },
      {
        id: 4,
        nome: 'ML',
      },
    ];
  },
  getProductsNew() {
    return [
      {
        id: 1,
        nome: 'Maçã',
        // descricao: 'Maçãdsfffffffffffffffffffffffffffffasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfffffffffffffffffffffffffffffff',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 2,
        nome: 'Banana',
        descricao: 'Banana prata',
        categoria: '',
        medida: 'KG',
        periodicidade: 'MENSAL',
        qtdMax: 10,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 3,
        nome: 'Melancia',
        descricao: 'Melancia',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 5,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 4,
        nome: 'Feijão',
        descricao: 'Feijão carioca',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 10,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 5,
        nome: 'Pão',
        descricao: 'Pão francês',
        categoria: '',
        medida: 'KG',
        periodicidade: 'DIARIA',
        qtdMax: 300,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 6,
        nome: 'Pão',
        descricao: 'Pão seda',
        categoria: '',
        medida: 'KG',
        periodicidade: 'DIARIA',
        qtdMax: 300,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 7,
        nome: 'Maçã',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 8,
        nome: 'Maçã',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 9,
        nome: 'Maçã',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 10,
        nome: 'Maçã',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
      {
        id: 11,
        nome: 'Maçã',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 123456,
      },
      {
        id: 12,
        nome: 'Maçã',
        descricao: 'Maçã',
        categoria: '',
        medida: 'KG',
        periodicidade: 'SEMANAL',
        qtdMax: 20,
        valorUni: 20,
        marca: 'CASEIRO',
        precoTotal: 0,
      },
    ];
  },
  updateCategory(selectedProducts, selectedCategory) {
    const products = this.getProductsNew();
    products.forEach((product) => {
      if (product.id === selectedProducts.id) {
        product.categoria = selectedCategory;
      }
    });
    return products;
  },
  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },

  getProductDesc() {
    return Promise.resolve(this.getProductsNew());
  },

  getSchoolsData() {
    return [
      {
        id: 1,
        nomeEscola: 'ESCOLA ESTADUAL PROFESSORA MARIA JOSÉ LOUREIRO',
      },
      {
        id: 2,
        nomeEscola: 'ESCOLA ESTADUAL PROF. SEBASTIÃO DA HORA',
      },
      {
        id: 3,
        nomeEscola: 'ESCOLA ESTADUAL PROFESSOR JOSÉ DA SILVA CAMERINO',
      },
      {
        id: 4,
        nomeEscola: 'ESCOLA ESTADUAL PROFESSOR PEDRO TEIXEIRA',
      },
      {
        id: 5,
        nomeEscola: 'ESCOLA ESTADUAL CINCINATO PINTO',
      },
      {
        id: 6,
        nomeEscola: 'ESCOLA ESTADUAL PROF. SEBASTIÃO DA HORA',
      },
      {
        id: 7,
        nomeEscola: 'ESCOLA ESTADUAL',
      },
      {
        id: 8,
        nomeEscola: 'ESCOLA ESTADUAL',
      },
      {
        id: 9,
        nomeEscola: 'ESCOLA ESTADUAL',
      },
      {
        id: 10,
        nomeEscola: 'ESCOLA ESTADUAL',
      },
      {
        id: 11,
        nomeEscola: 'ESCOLA ESTADUAL',
      },
    ];
  },
  getSchools() {
    return Promise.resolve(this.getSchoolsData());
  },
};
