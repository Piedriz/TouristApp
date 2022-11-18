const mongoose = require('mongoose');
const URI = 'mongodb+srv://Piedriz:Arepa300-@touristapp-db.gcjrs.mongodb.net'
// const URI = 'mongodb://mongo:JZvrLqoflNpuVF6WHdey@containers-us-west-123.railway.app:6058'

//  "mongodb://mongo:JZvrLqoflNpuVF6WHdey@containers-us-west-123.railway.app:6058"

mongoose.connect(URI)
    .then(db => console.log("correct"))
    .catch(err => console.log("error"));

module.exports = mongoose;