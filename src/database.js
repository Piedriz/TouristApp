const mongoose = require('mongoose');
const URI = 'mongodb+srv://Piedriz:Arepa300-@touristapp-db.gcjrs.mongodb.net'


mongoose.connect(URI)
    .then(db => console.log("correct"))
    .catch(err => console.log("error"));

module.exports = mongoose;