const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const crypto = require("crypto");

router.post("/ONE-TIME-PAD", (req, res) => {
  try {
    const { secretkey, cipherText } = req.body;
    const keyBuffer = Buffer.from(secretkey);
    const textBuffer = Buffer.from(cipherText, "hex");
    const decrypted = XOR(keyBuffer, textBuffer);
    res.status(200).json({
      success: true,
      plainText: decrypted.toString("utf-8"),
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "please provide a valid secret key", success: false });
  }
});

router.post("/3DES", (req, res) => {
  try {
    const { cipherText, secretkey } = req.body;
    let decrypted = CryptoJS.TripleDES.decrypt(cipherText, secretkey);
    res.status(200).json({
      success: true,
      plainText: decrypted.toString(CryptoJS.enc.Utf8),
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "please provide a valid secret key", success: false });
  }
});

router.post("/AES", (req, res) => {
  try {
    const { cipherText, secretkey } = req.body;
    //Decrypt
    let bytes = CryptoJS.AES.decrypt(cipherText, secretkey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    res.status(200).json({ success: true, plainText: originalText });
  } catch (error) {
    res
      .status(400)
      .json({ error: "please  provide a valid key", success: false });
  }
});

module.exports = router;
