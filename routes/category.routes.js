const auth_mw = require("../middlewares/auth_mw");
const categoryModel = require("../models/category.model")

/**
 * POST localhost:8888/ecomm/api/v1/categories
 */
category_controller = require("../controllers/category.controller") 
module.exports = app => {
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken],category_controller.createNewCategory);
        
}