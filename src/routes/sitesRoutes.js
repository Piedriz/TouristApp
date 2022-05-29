const express = require('express');
const router =express.Router();
const Site = require('../models/sites')
const multer = require('multer');
const SitesType = require("../models/sites_types")
const {verifyToken,isAdmin,isUser} = require("../middlewares/authUser");
const Joi = require('joi');
const storage = multer.diskStorage({
    destination: process.cwd()+"/src/public/img/uploads",
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({ dest: process.cwd()+"/src/public/img/uploads", storage: storage });

const schemaNewSite = Joi.object({
    img_DATA: Joi.required()
})


router.get('/',[verifyToken,isAdmin], async(req, res)=>{
    const sites = await Site.find();
   
    res.json({data: sites, error: null})
});

router.get('/home',[verifyToken,isUser], async(req, res)=>{
    const sites = await Site.find();
    const typeInfo = await SitesType.find()
    res.json({data: sites, error: null, sitesTypes: typeInfo})
});
router.get('/home/:id', async(req, res)=>{
    const site = await Site.findById(req.params.id);
    console.log(site)
    res.json({data: site})
});

router.get('/:id', async(req,res)=>{
    const site = await Site.findById(req.params.id)
});

router.post('/',upload.single('img_DATA'), async(req, res)=>{

    const { error } = schemaNewSite.validate(req.body.img_DATA)
    
    if (error) {
        return res.json({error: true, message: "Seleccione una imagen antes de enviar"})
    }

    const site = new Site();

    if(req.body.type_site){
        const typesArray = (req.body.type_site).split(',')
        const found = await SitesType.find({name: {$in: typesArray}})
        site.type_site = found.map(found => found._id)
    }else{
        const found = await SitesType.find({name: {$in: "Otro"}})
        site.type_site = found.map(found => found._id)
    }
    site.title = req.body.title;
    site.description = req.body.description;
    site.img_path = 'img/uploads/'+req.file.filename;
    site.lat = req.body.lat
    site.lng = req.body.lng
    try{
        await site.save();
        res.json({error: null, data:site})
    }catch(err){
        res.json({error: err})
    } 
});

router.put('/:id',upload.single('img_DATA'), async(req,res)=>{
    const {title, description} = req.body;
    console.log(req.body)
    try{
    if(req.body.type_site){
        const typesArray = (req.body.type_site).split(',')
        const found = await SitesType.find({name: {$in: typesArray}})
        const type_site = found.map(found => found._id)
        const img_path = 'img/uploads/'+req.file.filename
        const newSite = {title, description, img_path, type_site}
        await Site.findByIdAndUpdate(req.params.id, newSite);
    res.json({data: newSite ,error: null, message:"Sítio editado con exito"});
    }else{
        const found = await SitesType.find({name: {$in: "Otro"}})
        const type_site = found.map(found => found._id)
        const img_path = 'img/uploads/'+req.file.filename
        const newSite = {title, description, img_path, type_site}
        await Site.findByIdAndUpdate(req.params.id, newSite);
        res.json({data: newSite ,error: null, message:"Sítio editado con exito"});
    }
    }catch(err){
        res.json({error: err, message: "Ha ocurrido un error al editar"})
    }
});

router.delete('/:id', async(req,res)=>{
    await Site.findByIdAndDelete(req.params.id);
    res.json("Sitio eliminado");
    
}); 

module.exports = router;