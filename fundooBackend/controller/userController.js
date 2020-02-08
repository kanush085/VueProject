/************************************************************
 * 
 * Purpose      :   To validate and control the functionality.
 * 
 * @description
 * 
 * @file        :   userController.js
 * @overview    :   To validate and and passing the control to the service.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   19-03-2019
 * 
 * **********************************************************/
const userService = require('../services/userService')
const util = require('../util/token')
const jwt = require('jsonwebtoken')
const sentMail = require('../middleware/nodeMailer')
const exp = require('express-validator')
const express = require('express');
const responseTime = require('response-time')
const redis = require('redis');

/***********registration****************
 * @description:To validate the user inputs using express validator and 
 *              send the request body to service controller.
 * @param:request and response.
 */
exports.registration = (req, res) => {
    console.log("req-------", req.body);

    console.log("..................inside register.............");
    req.checkBody('firstname', 'First name is min 3 char alphbets').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'Last name is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 })
    console.log("register validation done");

    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        var obj = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password }
        userService.registration(obj, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            }
            else {
                return res.status(200).send({
                    message: "User registered sucessfully"
                });
            }
        })
    }
}
/***********login****************
 * @description:Take the user req and validate the email-id and password and 
 *              send the request body to service controller.
 * @param:request and response.
 */

exports.login = (req, res) => {
    try {
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'password is not valid').isLength({ min: 4 });
        console.log("----------------------");

        var secret = "adcgfft";
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else {  
            var obj = { 
                email: req.body.email, 
                password: req.body.password,
                // firebasetoken:req.body.firebasetoken
             }
             console.log("obj",obj);
             
            userService.login(obj, (err, result) => {
                // console.log("********************************",result);
                
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    response.success = true;
                    response.result = "Token generated sucessfully!";
                    response.success = result;
                    const payload = {
                        user_id: result[0]._id
                    }
                    console.log("payload==>", payload);
                    const obj = util.GenerateTokenAuth(payload)
                    response.success = true;
                    response._id = result[0]._id;
                    response.token = obj;
                    response.data = result;
                    response.image=result[0].profilePic;
                    console.log("result", result);


                    return res.status(200).send(response);

                }
            })

        }
    } catch (error) {
        res.send(error)

    }
}
/***********forgotpassword****************
 * @description:Take the user req and validate the email-id 
 *              send the request body to service controller if the result is true generate the token
 *              using jwt.
 * @param:request and response.
 */
exports.forgotPassword = (req, res) => {
    try {
        req.checkBody('email', 'Email is not valid').isEmail();
        // var secret = "adcgfft";
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else {
            userService.forgotPassword(req.body, (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    response.success = true;
                    response.result = "Token generated sucessfully!";
                    response.success = result;
                    // console.log("data in controller========>", result[0]._id);
                    const payload = {
                        user_id: result._id
                    }
                    console.log("payload==>", payload);
                    const obj = util.generateToken(payload)
                    console.log("controller obj", obj);

                    const url = `http://localhost:4200/resetpassword/${obj.token}`;

                    console.log("url in contoller==>", url);

                    sentMail.sendEMailFunction(url)
                    res.status(200).send({
                        msg: "success",
                        url: url
                    })
                }
            })
        }

    } catch (error) {
        res.send(error)
    }
}
/***********resetPassword****************
 * @description:Take the user req and validate the password and update the password to
 *              the specified email-id.
 *           
 * @param:request and response.
 */
exports.resetPassword = (req, res) => {
    try {
        console.log("inside forgotPassword");
        req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.confirmPassword);
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else {
            userService.resetPassword(req, (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    const payload = {
                        user_id: response.result._id
                    }
                    console.log("payload==>", payload);
                    const obj = util.generateToken(payload)
                    response.token = obj
                    return res.status(200).send({
                        message: result
                    });
                }
            })

        }
    } catch (error) {
        res.send(error)
    }
}




exports.setProfilePic = (req, res) => {
    try {

        
        console.log("inside setProfile picssssssssssssssssss>>>>>>>>>>>>>>>>>>. ",req.file.location);
        console.log("userid", req.decoded.payload.user_id);
        var response = {}
        userid = req.decoded.payload.user_id;
        let image = (req.file.location)
        userService.setProfilePic(userid, image, (err, result) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send(response)
            } else {
                // console.log(result);
                
                response.status = true;
                response.data = result;
                return res.status(200).send(response)
            }
        })
    } catch (error) {
        res.send(error)
    }


}