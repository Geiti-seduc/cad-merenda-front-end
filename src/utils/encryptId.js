import CryptoJS from 'crypto-js';

const encryptionKey = 'randomkeyforencryption';

// Função para criptografar o ID do usuário e salvá-lo no localStorage
export function encryptUser(userId) {
  const encryptedId = CryptoJS.AES.encrypt(
    userId.toString(),
    encryptionKey,
  ).toString();
  localStorage.setItem('userId', encryptedId);
}

// Função para descriptografar o ID do usuário
export function decryptUser() {
  const encryptedId = localStorage.getItem('userId');
  if (encryptedId) {
    const bytes = CryptoJS.AES.decrypt(encryptedId, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return null; // Trate o caso em que não há ID criptografado no localStorage
}
