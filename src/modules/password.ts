import CryptoJS from "crypto-js";

const passwordEncrypt = (pwd: string, originSalt?: string, originIv?: string) => {
  const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const iv = originIv || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

  const iterations = 10000;

  const key512Bits10000Iterations = CryptoJS.PBKDF2("1234", CryptoJS.enc.Hex.parse(salt), {
    keySize: 512 / 32,
    iterations,
  });

  const encrypted = CryptoJS.AES.encrypt(pwd, key512Bits10000Iterations, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });

  return {
    encryptedPassword: encrypted.toString(),
    salt,
    iv,
  };
};

export default passwordEncrypt;
