const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}); 
 
module.exports = mongoose.model('User', UserSchema);
 