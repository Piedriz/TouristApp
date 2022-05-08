const jwt =  require("jsonwebtoken");
const User =  require("../models/users");
const Role = require("../models/roles")

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.json({ message: "no token privider" });

    const decoded = jwt.verify(token, "SECRET_STRING");
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.json({ message: "no usser found" });
    console.log("salida")

    next();
  } catch (err) {
    res.json({ error: err, message: "No auth" });
  }
};

const isAdmin = async(req, res, next) =>{
    try{
        const user = await User.findById(req._id);
        const validate = await Role.find({_id: {$in: user.roles}})

        for(let i=0; i< validate.length; i++){
            if(validate[i].name === "admin"){
                next()
            }
        }
    }catch(err){
        res.json({error: err, message:"Usted no es administrador"})
    }
}

const isUser = async(req, res, next) =>{
    try{
        const user = await User.findById(req._id);
        const validate = await Role.find({_id: {$in: user.roles}})

        for(let i=0; i< validate.length; i++){
            if(validate[i].name === "admin"){
                next()
            }
        }
    }catch(err){
        res.json({error: err, message:"Usted no está autorizado"})
    }
}

// module.exports = isAdmin
module.exports = verifyToken
//module.exports = isUser