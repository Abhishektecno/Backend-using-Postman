/**
 * I need to write the controller /logic to register a user
 */
const bcrypt = require('bcryptjs');
const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = require('../configs/auth.config')
const { model } = require('mongoose');
exports.signup=async(req,res)=>{
    /**
     * Logic to register a user
     */

    //1. Read the Request body
    const request_body = req.body;// Request body is the data that is sent by the user

    //2. Insert the data in the user collection in MongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)
    }
    try{
        const user_created = await user_model.create(userObj);
        /**
         * Return the user
         */
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }
        res.status(201).send(res_obj);//201 is the status code for successfully created
    }
    catch(err){
        console.log("Error while creating user", err);
        res.status(500).send({
            message :"Some error happened while registring the user"
        })
    }

    //3. Return the response back to the user

}
exports.signin=async(req,res)=>{
    
//Check if the user is present in the database
    const user = await user_model.findOne({userId: req.body.userId});

    if(user==null){
        return res.status(400).send({
            message: "User not found"
        })
    }
        
//Password is correct or not
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordCorrect){
        return res.status(401).send({
            message: "Password is incorrect"
        })
    }

  //Using jwt we will create a token and send it back to the user
  const token = jwt.sign({id: user._userId},secret.secret,{
      expiresIn: 120 //2 minutes Token will be valid AFTER That the website will expire
  });

   res.status(200).send({ //For successful login
       name: user.name,
       userId: user.userId,
       email: user.email,
       userType: user.userType,
       accessToken: token
   })

}
    