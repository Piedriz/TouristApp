const router = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const Role = require("../models/roles");
// constraseña
const bcrypt = require("bcrypt");

// validation
const Joi = require("joi");
const loginState = require("../middlewares/loginState");
const userPerfil = require("../middlewares/userInfo");
const Site = require("../models/sites");

const schemaRegister = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  roles: Joi.array(),
});
const schemaPass = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  roles: Joi.array(),
  id: Joi.string(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  roles: Joi.array(),
});
router.get("/login", loginState, async (req, res) => {
  res.json({ error: null });
});
router.get("/register", loginState, async (req, res) => {
  res.json({ error: null });
});

router.post("/register", async (req, res) => {
  // validate user
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.json({ error: error.details[0].message });
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.json({ error: "Email ya registrado" });
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: password,
  });

  if (req.body.roles) {
    console.log(req.body.roles);
    const foundRoles = await Role.find({ name: { $in: req.body.roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const normalUser = await Role.find({ name: "user" });
    user.roles = normalUser.map((role) => role._id);
  }
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, "SECRET_STRING", {
      expiresIn: 86400,
    });
    res.json({
      error: null,
      data: savedUser,
      token: token,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email }).populate("roles");
  console.log(user);
  if (!user) return res.json({ error: "Usuario no encontrado" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.json({ error: "contraseña no válida" });

  const token = jwt.sign({ id: user._id }, "SECRET_STRING", {
    expiresIn: 86400,
  });

  res.json({
    error: null,
    data: "exito bienvenido",
    token: token,
  });
});

router.get("/perfil", userPerfil, async (req, res) => {
  const data = await User.findById(req.idperfil).populate("favorites").populate("visits");
  res.json({ error: null, data: data });
});

router.put("/:id", async (req, res) => {
  const { error } = schemaPass.validate(req.body);
  if (error)
    return res.json({ error: true, message: error.details[0].message });
  const { email, roles } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const newPass = { email, password, roles };
  const neus = await User.findByIdAndUpdate(req.params.id, newPass);
  res.json({
    data: neus,
    error: null,
    message: "Contraseña editada con exito",
  });
});

router.put("/fav/:id", async (req, res) => {
  const foundSites = await Site.findById(req.body.id);
  const found = await User.findOne({
    _id: req.params.id,
    favorites: { $in: req.body.id },
  });

  if (!found) {
    const newFavs = await User.findByIdAndUpdate(req.params.id, {
      $push: { favorites: foundSites._id },
    });
    res.json({
      error: null,
      message: "Agregado a favoritos",
      isfavorite: true,
      data: newFavs,
    });
  } else {
    const newFavs = await User.findByIdAndUpdate(req.params.id, {
      $pull: { favorites: foundSites._id },
    });

    res.json({
      error: null,
      message: "Eliminado de favoritos",
      isfavorite: false,
      data: newFavs,
    });
  }
});

router.put("/visited/:id", async (req, res) => {
  const foundSites = await Site.findById(req.body.id);
  const found = await User.findOne({
    _id: req.params.id,
    visits: { $in: req.body.id },
  });

  if (!found) {
    const newVisited = await User.findByIdAndUpdate(req.params.id, {
      $push: { visits: foundSites._id },
    });
    res.json({
      error: null,
      message: "Agregado a lista de visitados",
      isfavorite: true,
      data: newVisited,
    });
  } else {
    const newVisited = await User.findByIdAndUpdate(req.params.id, {
      $pull: { visits: foundSites._id },
    });

    res.json({
      error: null,
      message: "Eliminado de lista de visitados",
      isfavorite: false,
      data: newVisited,
    });
  }
});

module.exports = router;
