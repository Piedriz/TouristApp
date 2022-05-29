const jwt = require('jsonwebtoken')

const userPerfil = async (req, res, next) => {
    try {
      const token = req.headers["usertoken"];
      const decoded = jwt.verify(token, "SECRET_STRING");
      req.idperfil = decoded.id
      next();
    } catch (err) {
      res.json({ error: true, message: "Ha ocurrido un error inesperado" });
    }
  };
  module.exports = userPerfil;
  