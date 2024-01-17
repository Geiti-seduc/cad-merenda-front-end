import { updateAddress } from '../../api/addressRequests';
import { getRegions } from '../../api/external/locationRequests';
import {
  createSchool, fetchAllModalities, updateSchool,
} from '../../api/schoolRequests';
import * as parser from '../DataParser';

class School {
  constructor() {
    this.name = document.getElementById('name').value;
    this.inep = document.getElementById('inep').value;
    this.cnpj = document.getElementById('cnpj').value.replace(/[^\d]+/g, '');
    this.geeId = null;
    this.phone = document.getElementById('phone').value.replace(/[^\d]+/g, '');
    this.email = document.getElementById('email').value;
    this.modalities = null;
    this.address = {
      zip: document.getElementById('zip').value,
      street: document.getElementById('street').value,
      number: document.getElementById('number').value,
      district: document.getElementById('district').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      complement: document.getElementById('complement').value,
      immediate_region: null,
      intermediate_region: null,
    };
    this.addressId = null;
    this.addedModalities = [];
    this.deletedModalities = [];
    this.isAnyBlank();
    this.verify();
  }

  isAnyBlank() {
    return this.name === ''
    || this.inep === ''
    || this.cnpj === ''
    || this.geeId === ''
    || this.phone === ''
    || this.email === ''
    || this.address.zip === ''
    || this.address.street === ''
    || this.address.number === ''
    || this.address.district === ''
    || this.address.city === ''
    || this.address.state === '';
  }

  verify() {
    parser.validateName(this.name);
    parser.validateInep(this.inep);
    parser.validateCnpj(this.cnpj);
    parser.validateEmail(this.email);
  }

  async setRegions() {
    try {
      const res = await getRegions(this.address.city);
      [this.address.immediate_region, this.address.intermediate_region] = [res[0], res[1]];
    } catch (error) {
      console.log('Não foi possível obter as regiões');
    }
  }

  setModalities(modalities) {
    this.modalities = modalities;
  }

  setGeeId(id) {
    this.geeId = id;
  }

  getInep() {
    return this.inep;
  }

  setAddressId(id) {
    this.addressId = id;
  }

  async compareModalities(original, userToken) {
    if (!this.modalities || this.modalities.length === 0) {
      throw new Error('Selecione ao menos uma modalidade');
    }

    try {
      const allModalities = await fetchAllModalities(userToken);
      const modalitiesMap = new Map(allModalities.map((mod) => [mod.name, mod.id]));
      const originalModalityNames = new Set(original.map((mod) => mod.modality.name));
      const currentModalityNames = new Set(this.modalities);

      const toDelete = original
        .filter((originalMod) => !currentModalityNames.has(originalMod.modality.name))
        .map((mod) => modalitiesMap.get(mod.modality.name));

      const toAdd = this.modalities
        .filter((modName) => !originalModalityNames.has(modName))
        .map((modName) => modalitiesMap.get(modName))
        .filter((id) => id !== undefined);

      this.addedModalities = toAdd;
      this.deletedModalities = toDelete;
    } catch (error) {
      throw new Error('Não foi possível obter as modalidades.');
    }
  }

  getJSON() {
    return {
      name: this.name,
      inep: this.inep,
      cnpj: this.cnpj,
      geeId: this.geeId,
      phone: this.phone,
      email: this.email,
      modalities: this.modalities,
      address: {
        zip: this.address.zip,
        street: this.address.street,
        number: this.address.number,
        district: this.address.district,
        city: this.address.city,
        state: this.address.state,
        complement: this.address.complement,
        immediate_region: this.address.immediate_region,
        intermediate_region: this.address.intermediate_region,
      },
    };
  }

  getUpdateJSON() {
    return {
      name: this.name,
      inep: this.inep,
      cnpj: this.cnpj,
      geeId: this.geeId,
      phone: this.phone,
      email: this.email,
      addressId: this.addressId || '',
      added_modalities: this.addedModalities,
      removed_modalities: this.deletedModalities,
    };
  }

  getAddressJSON() {
    return {
      id: this.addressId,
      zip: this.address.zip,
      street: this.address.street,
      number: this.address.number,
      district: this.address.district,
      city: this.address.city,
      state: this.address.state,
      complement: this.address.complement,
      immediate_region: this.address.immediate_region,
      intermediate_region: this.address.intermediate_region,
    };
  }

  async POST(token) {
    await this.setRegions();
    try {
      console.log(this.getJSON());
      await createSchool(this.getJSON(), token);
    } catch (error) {
      throw new Error('Não foi possível cadastrar a escola');
    }
  }

  async PUT(originalModalities, token) {
    await this.setRegions();
    await this.compareModalities(originalModalities, token);
    try {
      await updateSchool(this.getUpdateJSON(), token);
      await updateAddress(this.getAddressJSON(), token);
    } catch (error) {
      throw new Error('Não foi possível atualizar a escola');
    }
  }
}

export default School;
