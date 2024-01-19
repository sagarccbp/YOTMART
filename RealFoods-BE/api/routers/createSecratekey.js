const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isAdmin = require("../../middleware/is-admin");
const APIKEY = require("../models/secrateKey");
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');


router.get("/",isAdmin,async (req, res, next) => {
    const buffer = require('crypto').randomBytes(32);
    const myKey = buffer.toString('base64');
    const hash = generateSecretHash(myKey);
    const apiKey = await APIKEY.find({});
    if (apiKey && apiKey.length > 0) {
        await APIKEY.updateOne({_id:apiKey[0]._id},{$set:{hash:hash}})
    } else {
        const newAPiKey = APIKEY({
            hash: hash
        })
        await newAPiKey.save();
    }
    return res.status(200).json(myKey);
});

function generateSecretHash(key) {
  const salt = randomBytes(8).toString('hex');
    const buffer = scryptSync(key, salt, 64);
  return `${buffer.toString('hex')}.${salt}`;
}

module.exports = router;