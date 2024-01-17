import Address from './Address';
import * as parser from '../DataParser';
import { createSupplier } from '../../api/supplierRequests';

class Supplier {
  constructor() {
    this.cnpj = document.getElementById('cnpj').value;
    this.company_name = document.getElementById('companyName').value;
    this.trade_name = document.getElementById('fantasyName').value;
    this.state_registration = document.getElementById('stateRegistration').value;
    this.cnae = document.getElementById('cnae').value;
    this.phone = document.getElementById('phone').value.replace(/\D/g, '');
    this.email = document.getElementById('email').value;
    this.tech_manager = document.getElementById('techManager').value;
    this.password = document.getElementById('password').value;
    this.address = new Address();
    this.id = null;
  }

  verifyBlankFields() {
    if (!this.cnpj
      || !this.company_name
      || !this.trade_name
      || !this.state_registration
      || !this.cnae
      || !this.phone
      || !this.email
      || !this.tech_manager
      || !this.password) {
      throw new Error('Preencha todos os campos');
    }
  }

  verify() {
    parser.validateCnpj(this.cnpj);
    parser.validateName(this.company_name);
    parser.validateName(this.trade_name);
    parser.validatePhone(this.phone);
    parser.validateEmail(this.email);
    parser.validateName(this.tech_manager);
    parser.validatePassword(this.password);
    parser.validateCnae(this.cnae);
    parser.validateStateRegistration(this.state_registration);
  }

  setId(id) {
    this.id = id;
  }

  getJSON() {
    return {
      cnpj: this.cnpj,
      company_name: this.company_name,
      trade_name: this.trade_name,
      state_registration: this.state_registration,
      cnae: this.cnae,
      phone: this.phone,
      email: this.email,
      tech_manager: this.tech_manager,
      password: this.password,
      ...this.address.getJSON(),
    };
  }

  async POST() {
    this.verify();
    this.address.verify();
    try {
      await this.address.assignRegions();
      const res = await createSupplier(this.getJSON());
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Supplier;
