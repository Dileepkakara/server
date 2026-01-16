const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
        name:String,
        email:String,
        age:Number
});

const UsersModel = mongoose.model('Users',userSchema);
module.exports = UsersModel