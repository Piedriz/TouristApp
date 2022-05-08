const router = require('express').Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Role = require("../models/roles")
// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('joi');
const validateUser = require('../middlewares/authUser')



const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    roles: Joi.array()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    roles: Joi.array()
})

router.post('/register',async (req, res) => {

    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.json({error: error.details[0].message})
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.json({error: 'Email ya registrado'})
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: password
    });

    if(req.body.roles){
        const foundRoles = await Role.find({name: {$in: req.body.roles}})
        user.roles = foundRoles.map(role => role._id)
    }else{
        const normalUser = await Role.find({name: "user"})
        user.roles = normalUser.map(role => role._id)
    }
    try {
        const savedUser = await user.save();
        const token = jwt.sign({id: savedUser._id},"SECRET_STRING",{
            expiresIn: 86400
        })
        res.json({
            error: null,
            data: savedUser,
            token: token
        })
    } catch (error) {
        res.json(error)
    }
})


router.post('/login',[validateUser], async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email }).populate('roles');
    if (!user) return res.json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.json({ error: 'contraseña no válida' })

    const token = jwt.sign({id: user._id}, "SECRET_STRING",{
        expiresIn: 86400
    })
    
    res.json({
        error: null,
        data: 'exito bienvenido',
        token: token
    })
})



module.exports = router;