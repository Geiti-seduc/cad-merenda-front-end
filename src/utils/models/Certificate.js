import { createCertificate, updateCertificate } from '../../api/certificateRequests';

class Certificate {
  constructor(name, expiration, file, requiredId) {
    this.userId = null;
    this.name = name;
    this.expiration = expiration || '';
    this.requiredId = requiredId;
    this.file = file;
  }

  verify() {
    return !(this.name === '' || this.expiration === '' || this.file === '');
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setExpiration(expiration) {
    this.expiration = expiration;
  }

  getJSON() {
    const certificateJSON = {
      userId: this.userId.replace(/[^0-9]/g, ''),
      name: this.name,
      expiration: this.expiration.toISOString(),
      requiredId: this.requiredId,
      file: this.file,
    };
    return certificateJSON;
  }

  log() {
    console.log(this.getJSON());
  }

  async POST() {
    if (!this.expiration) throw new Error(`Preencha a data de validade da certidão ${this.name}`);
    try {
      const data = this.getJSON();
      const res = await createCertificate(data);
      if (!res) throw new Error('Não foi possível criar a certidão');
    } catch (error) {
      throw new Error(error);
    }
  }

  async PUT(userToken) {
    try {
      const data = this.getJSON();
      const res = await updateCertificate(data, userToken);
      if (!res) throw new Error('Não foi possível atualizar a certidão');
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Certificate;
