/**
 * Name of the category items 
 * description of the category items
 */
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    }
},{timestamps: true , versionKey: false});// timestamps will add the createdAt and updatedAt fields in the document
// versionKey will remove the __v(version key) field from the document

module.exports = mongoose.model('Category', categorySchema);