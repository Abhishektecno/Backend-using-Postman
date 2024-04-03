const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth_config = require('../configs/auth.config');   
/**
 * Create a ms will check if the user is authenticated or not
 */

const verifySignUpBody =async(req,res,next)=>{
try{
      //Check for the name
      if(!req.body.name){
          return res.status(400).send({
              message: "Failed ! Name was not provided in the request body"
          })
      }

      //Check for the email
      if(!req.body.email){
        return res.status(400).send({
            message: "Failed ! Email was not provided in the request body"
        })
    }


    //Check for the userId
    if(!req.body.userId){
        return res.status(400).send({
            message: "Failed ! userId was not provided in the request body"
        })
    }

    //Check for the user with the same userId is already present or not
    const user = await user_model.findOne({userId : req.body.userId});
    if(user){
        return res.status(400).send({
            message: "Failed ! User with the same userId is already present"
        })
    }
    next();
}
catch(err){
    console.log("Error while verifying the user", err);
    res.status(500).send({
        message :"Some error happened while verifying the user"
    })
}
}
const verifySignInBody =async(req,res,next)=>{
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId was not provided in the request body"
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password was not provided in the request body"
        })
    }
    next();
}
const verifyToken = (req,res,next)=>{

    //Check if the token is present or not

    const token = req.header('x-access-token'); // This is the header key that we are using to send the token
    
    if(!token){
        return res.status(403).send({
            message: "No token provided: You are not Authorized"
        })
    }
    //Verify the token
    jwt.verify(token,auth_config.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized !"
            })
        }
        const user = await user_model.findOne({userId : decoded.id});
        if(!user){
            return res.status(400).send({
                message: "Unauthorized,This user for this token does't exist"
            })
        }
        next();

    })
}
module.exports ={

    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken:verifyToken
}