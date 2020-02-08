/************************************************************
 * 
 * Purpose      :   To validate and verify the token.
 * 
 * @description
 * 
 * @file        :   authentication.js
 * @overview    :   To validate and control the functionality.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   19-03-2019
 * 
 * **********************************************************/
var jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    // console.log("reuest===>", req.body);
    var token1 = req.headers['token'];
    /**
     * 
     **/
    if (token1) {
        /**
         * @description:verifies secret and checks expression
         **/
        jwt.verify(token1, 'secretkey', (err, decoded) => {
            if (err) {
                return res.send({
                    status: false,
                    message: 'Token is not valid..!'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}

exports.checkTokenAuth = (req, res, next) => {
    // console.log("reuest===>hhhhhhhhhhhhhhhhhh", req.body);
     // console.log("reuest===>", req.headers);\
     console.log("////////////////////////");
     
     
     var token1 = req.headers.token;
    //  console.log(token1);
     
     /**
      * 
      **/
     if (token1) {
         /**
          * @description:verifies secret and checks expression
          **/
         jwt.verify(token1, 'secretkey-auth', (err, decoded) => {
             if (err) {
                 return res.status(401).send({
                     status: false,
                     message: 'Unauthorised access, please provide valid token!'
                 });
             } else {
                 req.decoded = decoded;                 
                 next();
             }
         });
     } else {
         /**
          * @description:if there is no token return an error
          **/
         return res.send({
             status: false,
             message: 'No token provided!!'
         });
     }
 }