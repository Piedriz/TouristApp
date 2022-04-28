const mongoose = require('mongoose');
const {Schema} = mongoose;

const SiteSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    img_path: {type: String, required: true},
    // img_url: {type: String, required: true},
    // path: {type: String},
    // originalname: {type: String},
    // mimetype: {type: String},
    // size: {type: Number},
    // created_at: {type: Date, default: Date.now()}

}); 
 
module.exports = mongoose.model('Site', SiteSchema);
 