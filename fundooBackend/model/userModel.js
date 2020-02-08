/************************************************************
 * 
 * Purpose      :   To store the data in database using mongoSchema.
 * 
 * @description
 * 
 * @file        :   userModel.js
 * @overview    :   Storing the userdata in database.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   19-03-2019
 * 
 * **********************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let saltRounds = 10;

const UserSchema = mongoose.Schema({
    firstname: {
        type: String, require: [true, "firstname require"]
    },
    lastname: {
        type: String, require: [true, "lastname require"]
    },
    email: {
        type: String, require: [true, "email require"]

    },
    password: {
        type: String, require: [true, "password require"]
    },
    profilePic: {
        type: String,
    }
},
    {
        timestamps: true
    });
function userModel() { }

var user = mongoose.model('user', UserSchema);
function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}
/***********registration****************
 * @description:First validate the user exists already if not store the user data in the database
 *              using mongoschema.
 * @param:request and callback function.
 */
userModel.prototype.registration = (body, callBack) => {
    try {
    console.log(body,"---------------------------------");
    
        user.find({ "email": body.email }, (err, data) => {
            if (err) {
                console.log("Error is registration");
                callBack(err)
            }
            else if (data.length > 0) {
                console.log("data.length" + data);
                console.log("Email already exists");
                callBack("user already present");
            }
            else {
                const newUser = new user({
                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "password": hash(body.password),
                });
                //To save the data in dbs
                newUser.save((err, result) => {
                    if (err) {
                        console.log("Model not found");
                        callBack(err)

                    }
                    else {
                        console.log("Register Successfully");
                        callBack(null, result)
                    }
                });
            }
        });

    } catch (error) {
        console.log(error.message);

    }
}
/***********login****************
 * @description:Find  the email-id ib db and bcrypt the password and show the message to the user.
 * @param:request and callback function.
 */
userModel.prototype.login = (body, callBack) => {
    try {
        console.log(body,"sdddddddddddddddddddd");
        
        user.find({ "email": body.email }, (err, data) => {
            //if findone results error
            if (err) {
                callBack(err)
            }
            //if data is not equal to null then compare the password.
            else if (data.length > 0) {
                bcrypt.compare(body.password, data[0].password, function (err, res) {
                    if (res) {
                        console.log("Login Successfully");
                        return callBack(null, data);

                    }
                    else if (err) {
                        console.log("Incorrect Password");
                        return callBack("Incorrect Password");

                    }
                    else {
                        return callBack("Incorrect password").status(500)
                    }
                });

            } else {
                console.log("Invalid User");
                return callBack("Invalid User");

            }
        });
    } catch (error) {
        console.log(error.message);

    }
}
   
/***********forgotPassword****************
 * @description:Find the email-id in db if it is not valid show error message else send the result.
 * @param:request and callback function.
 */

userModel.prototype.forgotPassword = (data, callBack) => {
    try {
        user.findOne({ "email": data.email }, (err, result) => {
            if (err) {
                callBack(err);
            }
            else if (result) {
                //console.log("data in models==>",result[0]._id);
                if (result !== null && data.email == result.email) {
                    return callBack(null, result);

                }
                else {
                    callBack("Incorrect Email")
                }
            }
        });
    } catch (error) {
        console.log(error.message);

    }
}
/***********updatePassword****************
 * @description:Take the password from the request and bcrypt the password using saltround and 
 *              update the password to the specified  email-id.
 * @param:request and callback function.
 */
userModel.prototype.updatePassword = (req, callBack) => {
    try {
        console.log(' in model--data:--', req.decoded);
        console.log(' in model--body:--', req.body);
        let newPassword = bcrypt.hashSync(req.body.password, saltRounds)
        console.log("new password:", newPassword);
        user.updateOne({ _id: req.decoded.payload.user_id }, { password: newPassword }, (err, result) => {
            if (err) {
                callBack(err);
            }
            else {
                callBack(null, result);
            }
        });
    } catch (error) {
        console.log(error.message);

    }
}


userModel.prototype.setProfilePic = (userid, image,callBack) => {

    user.findOneAndUpdate({

        _id: userid
    },
        {
            $set: {
                profilePic: image
            }
        }, (err, result) => {
            if (err) {
                callBack(err)
            }
            else {
                console.log("updated image successfully")
                return callBack(null, image)
            }
        })
}




// userModel.prototype.getAllUser = (req, callBack) => {
//     user.find({}, (err, result) => {
//         if (err) {
//             callBack(err);
//         }
//         else {
//             callBack(null, result)
//         }
//     });
// }
module.exports = new userModel;