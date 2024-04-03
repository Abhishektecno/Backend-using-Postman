/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept the request and call the controller 
 */
const authController = require('../controllers/auth.controller');
const authMW =require('../middlewares/auth_mw');

module.exports = app => {
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup);

    /**
     * Route to signin
     * POST localhost:8888/ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin);

}