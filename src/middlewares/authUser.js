const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Role = require("../models/roles");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.json({error:true, message: "no token privider" });
    const decoded = jwt.verify(token, "SECRET_STRING");
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.json({error:true, message: "no usser found" });

    next();
  } catch (err) {
    res.json({ error: true, message: "No autorizado, debe iniciar sección" });
  }
};

const isAdmin = async (req, res, next) => {
  
    const user = await User.findById(req.userId);
    const validate = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < validate.length; i++) {
      if (validate[i].name === "admin") {
        next();
        return;
      }
    }
  
    return res.json({error: true,  message: "Usted no es administrador" });
  
};

const isUser = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const validate = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < validate.length; i++) {
    if (validate[i].name === "user") {
      next();
      return;
    }
  }

  return res.json({error:true, message: "Usted no es usuario normal" });
};

module.exports.verifyToken = verifyToken;
module.exports.isAdmin = isAdmin;
module.exports.isUser = isUser;