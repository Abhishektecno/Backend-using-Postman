const mongoose = require('mongoose');


/**
 * name
 * user Id
 * password 
 * email
 * userType
 * Creating Schema for User
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userId: {
        type: String,
        required: true,
        unique: true,        
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 10,
    },
    userType: {
        type: String,
        required: true,
        default: 'CUSTOMER',
        enum: ['CUSTOMER', 'ADMIN']
    }
},{timestamp : true,versionKey : false});
mongoose.model('User', userSchema);

module.exports = mongoose.model('User',userSchema);