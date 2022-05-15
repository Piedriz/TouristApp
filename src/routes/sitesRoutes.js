const express = require('express');
const router =express.Router();
const Site = require('../models/sites')
const multer = require('multer');
const Sites_Type = require("../models/sites_types")
const {verifyToken,isAdmin,isUser} = require("../middlewares/authUser")
const storage = multer.diskStorage({
    destination: process.cwd()+"/src/public/img/uploads",
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({ dest: process.cwd()+"/src/public/img/uploads", storage: storage });

router.get('/',[verifyToken,isAdmin], async(req, res)=>{
    const sites = await Site.find();
    res.json({data: sites, error: null})
});

router.get('/home',[verifyToken,isUser], async(req, res)=>{
    const sites = await Site.find();
    res.json({data: sites, error: null})
});

router.get('/:id', async(req,res)=>{
    const site = await Site.findById(req.params.id)
    res.json("Sitio consultado");
});

router.post('/',upload.single('img_DATA'), async(req, res)=>{
    if(req.body.site_type){
        const foundsite_type = await Sites_Type.find({name: {$in: req.body.site_type}})
        site.site_type = foundsite_type(type => type._id)
    }
    const site = new Site();
    site.title = req.body.title;
    site.description = req.body.description;
    site.type_site = req.body.type_site;
    site.img_path = 'img/uploads/'+req.file.filename;
    try{
        await site.save();
        res.json({error: null, data:site})
    }catch(err){
        res.json({error: err})
    } 
});

router.put('/:id', async(req,res)=>{
    const {title, description} = req.body;
    const newSite = {title, description};
    await Site.findByIdAndUpdate(req.params.id, newSite);
    console.log(req.params.id);
    res.json("Sitio actualizado");
});

router.delete('/:id', async(req,res)=>{
    await Site.findByIdAndDelete(req.params.id);
    res.json("Sitio eliminado");
}); 

module.exports = router;