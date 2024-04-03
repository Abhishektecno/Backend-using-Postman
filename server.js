/**
 * This will be the starting file of the project
 */

const express = require('express');
const mongoose = require('mongoose'); // corrected typo here
const app = express()
const server_config = require('./configs/server.config');
const db_config = require('./configs/db.config');
const user_model=require('./models/user.model');
const bcrypt = require('bcryptjs');


app.use(express.json());// This will allow us to read the request body as JSON



/**
 * Create an admin user at the starting of the application
 * If not already present
 */

// Connect to the MongoDB
mongoose.connect(db_config.DB_URL); // corrected typo here

const db = mongoose.connection;
db.on('error', () => {
    console.log('Failed to connect to the database');
})
db.once('open', () => {
    console.log('Connected to the database');
    init()
})
async function init(){// Check if the admin user is already present
    try{
        let user = await user_model.findOne({userId : "admin"});
        if(user){
            console.log("Admin is already present");
            return;
    }

    }catch(err){
        console.log("Error while checking for admin user", err);
    }
   
try{// Create an admin user
    user = await user_model.create({
        name: "Abhishek",
        userId: "admin",
        email: "abhishektecn@gmail.com",
        userType: "ADMIN",
        password: bcrypt.hashSync("Abhishek1",9)

})
console.log("Admin created successfully",user);
}catch(err){// If admin creation fails
    console.log("Error while creating admin", err);
    }
}
/**
 * Stich the routr to the server
 */
require('./routes/auth.routes')(app);
require('./routes/category.routes')(app);

/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
    console.log('Server Started:', server_config.PORT);
})
