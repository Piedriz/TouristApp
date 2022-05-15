const Role = require("../models/roles");
const SitesType = require("../models/sites_types")
const createRoles = async () =>{

    try{
        const contRoles = await Role.estimatedDocumentCount()
        if(contRoles>0) return;
    
        const values = await Promise.all([
            new Role({name:"user"}).save(),
            new Role({name:"admin"}).save()
        ])

    }catch(err){
        console.log(err)
    }

}

const createSitesTypes = async () =>{

    try{
        const contTypes = await SitesType.estimatedDocumentCount()
        if(contTypes>0) return;
    
        const values = await Promise.all([
            new SitesType({name:"Playa"}).save(),
            new SitesType({name:"Atractivo histórico"}).save(),
            new SitesType({name:"Parque"}).save(),
            new SitesType({name:"Centro comercial"}).save(),
            new SitesType({name:"Museo"}).save(),
            new SitesType({name:"Zoológico"}).save(),
            new SitesType({name:"Reserva natural"}).save(),
            new SitesType({name:"Parque de diversión"}).save(),
            new SitesType({name:"Espectaculo"}).save(),
            new SitesType({name:"Otro"}).save()
        ])

    }catch(err){
        console.log(err)
    }

}
module.exports.createRoles = createRoles
module.exports.createSitesTypes = createSitesTypes