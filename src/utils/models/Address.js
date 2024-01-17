import { getRegions } from '../../api/external/locationRequests';

class Address {
  constructor() {
    this.zip = document.getElementById('zip').value;
    this.street = document.getElementById('street').value;
    this.number = document.getElementById('number').value;
    this.district = document.getElementById('district').value;
    this.city = document.getElementById('city').value;
    this.state = document.getElementById('state').value;
    this.complement = document.getElementById('complement').value;
    this.immediate_region = '';
    this.intermediate_region = '';
  }

  verify() {
    return !(this.zip === ''
            || this.street === ''
            || this.number === ''
            || this.district === ''
            || this.city === ''
            || this.state === '');
  }

  getJSON() {
    const addressJSON = {
      zip: this.zip,
      street: this.street,
      number: this.number,
      district: this.district,
      city: this.city,
      state: this.state,
      complement: this.complement,
    };

    return addressJSON;
  }

  assignRegions() {
    getRegions(this.city).then(([immediateRegion, intermediateRegion]) => {
      this.immediate_region = immediateRegion;
      this.intermediate_region = intermediateRegion;
    });
  }
}

export default Address;
