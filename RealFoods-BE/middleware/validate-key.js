const APIKEY = require("../api/models/secrateKey");
const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");

module.exports = async (req, res, next) => {
  let suppliedKey = req.headers["api_key"];
	console.log(req.headers);
  console.log(suppliedKey,"KEYSAGAR");
  if (!suppliedKey) return res.status(401).json({ message: "Un authorized" });
  const hash = await APIKEY.find({});

  if (!hash || hash.length <= 0)
    return res.status(401).json({ message: "Un authorized" });
  const storedKey = hash[0].get("hash");

  const [hashedPassword, salt] = storedKey.split(".");
  const buffer = scryptSync(suppliedKey, salt, 64);
  const compare = timingSafeEqual(Buffer.from(hashedPassword, "hex"), buffer);

  if (!compare) {
    return res.status(401).json({ message: "Un authorized access" });
  }
  next();
};
