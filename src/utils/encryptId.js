import CryptoJS from 'crypto-js';

const chaveCriptografia = 'chave-secreta-para-criptografia';

// Função para criptografar o ID do usuário e salvá-lo no localStorage
export function criptografarEArmazenarUsuarioId(userId) {
  const idCriptografado = CryptoJS.AES.encrypt(
    userId.toString(),
    chaveCriptografia,
  ).toString();
  localStorage.setItem('userId', idCriptografado);
}

// Função para descriptografar o ID do usuário
export function descriptografarUsuarioId() {
  const idCriptografado = localStorage.getItem('userId');
  if (idCriptografado) {
    const bytes = CryptoJS.AES.decrypt(idCriptografado, chaveCriptografia);
    const userIdDescriptografado = bytes.toString(CryptoJS.enc.Utf8);
    return userIdDescriptografado;
  }
  return null; // Trate o caso em que não há ID criptografado no localStorage
}
