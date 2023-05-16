const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const {
  encryptWith3DES,
  encryptWithAES,
  encryptWithOTP,
} = require("../controller/encrypt");

function XOR(textBuffer, keyBuffer) {
  const result = Buffer.alloc(textBuffer.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = textBuffer[i] ^ keyBuffer[i];
  }
  return result;
}
router.post("/ONE-TIME-PAD", encryptWithOTP);
router.post("/3DES", encryptWith3DES);

router.post("/AES", encryptWithAES);

module.exports = router;
