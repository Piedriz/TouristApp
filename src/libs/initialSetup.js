const Role = require("../models/roles");

const createRoles = async () =>{

    try{
        const contRoles = await Role.estimatedDocumentCount()
        if(contRoles>0) return;
    
        const values = await Promise.all([
            new Role({name: "user"}).save(),
            new Role({name:"admin"}).save()
        ])

    }catch(err){
        console.log(err)
    }

}

module.exports = createRoles