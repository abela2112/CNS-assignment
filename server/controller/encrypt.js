const CryptoJS = require("crypto-js");

function XOR(textBuffer, keyBuffer) {
  const result = Buffer.alloc(textBuffer.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = textBuffer[i] ^ keyBuffer[i];
  }
  return result;
}

const encryptWithOTP = (req, res) => {
  try {
    const { plainText, secretkey } = req.body;
    const keyBuffer = Buffer.from(secretkey);
    const textBuffer = Buffer.from(plainText);
    const encryptedMessage = XOR(keyBuffer, textBuffer);
    res
      .status(200)
      .json({ success: true, encryptedData: encryptedMessage.toString("hex") });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const encryptWith3DES = (req, res) => {
  const { plainText, secretkey } = req.body;

  try {
    let encrypted = CryptoJS.TripleDES.encrypt(plainText, secretkey).toString();
    res.status(200).json({ success: true, encryptedData: encrypted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const encryptWithAES = (req, res) => {
  const { plainText, secretkey } = req.body;

  try {
    let ciphertext = CryptoJS.AES.encrypt(plainText, secretkey).toString();

    res.status(200).json({ success: true, encryptedData: ciphertext });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { encryptWith3DES, encryptWithAES, encryptWithOTP };
