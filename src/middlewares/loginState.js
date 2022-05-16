const loginState = async (req, res, next) => {
  try {
    const token = req.headers["loginstate"];
    if (token) {
      return res.json({ error: true, message: "Usted ya está logueado" });
    }
    next();
  } catch (err) {
    res.json({ error: true, message: "No autorizado, debe iniciar sección" });
  }
};
module.exports = loginState;
