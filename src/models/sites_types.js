const mongoose = require('mongoose')
const {Schema} = mongoose;

const SitesTypes = new Schema({
    name: {type:String},
}); 
 
module.exports = mongoose.model('SitesType', SitesTypes);
 