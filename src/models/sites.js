
const mongoose = require('mongoose');
const {Schema} = mongoose;

const SiteSchema = new Schema({
    title: {type: String, required: true},
    type_site: [{
        ref: "SitesType",
        type: Schema.Types.ObjectId
    }],
    description: {type: String, required: true},
    img_path: {type: String, required: true},
}); 
 
module.exports = mongoose.model('Site', SiteSchema);
 