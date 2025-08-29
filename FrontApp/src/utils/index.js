import CryptoJS from "crypto-js";

const SECRET_KEY = "clave-super-secreta";

export async function encryptFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const wordArray = CryptoJS.lib.WordArray.create(reader.result);
      const encrypted = CryptoJS.AES.encrypt(wordArray, SECRET_KEY).toString();
      resolve(encrypted);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file); // 👈 importante, no como text
  });
}

