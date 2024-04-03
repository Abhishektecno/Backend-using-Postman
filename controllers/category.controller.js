const category_model = require('../models/category.model');
/**
 * Controller for creating the category
 * 
 * POST localhost:8888/ecomm/api/v1/categories
 * {
 * "name": "Electronics",
 * "description": "All the electronics items"
 * } 
 */


exports.createNewCategory = async (req, res) => {

    //Read the req Body
    //Create the Category object
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }
    try{
        //Insert into mongoDb
    const category = await category_model.create(cat_data);
    return res.status(201).send(category);
    }
    catch(err){
        console.log("Error while creating category", err);
        return res.status(500).send({
            message :"Some error happened while creating the category"
        })
    }
    
    //Return the response of the created category
}