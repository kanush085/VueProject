const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pushnotificationSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
    },
    firebasetoken: {
        type: String,
        required: [true, 'firebasetoken is required']
    }
}, {
        timestamps: true
    });

var push = mongoose.model('pushnotification', pushnotificationSchema)

function notificationModel() { }


notificationModel.prototype.pushNotification = (req, callBack) => {
    push.findOneAndUpdate({
        userId: req.body.userId
    }, {
            $set: {
                firebasetoken: req.body.firebasetoken
            }
        },
        { upsert: true, new: true }
        , (err, result) => {
            if (err) {
                console.log("Model not found");
                callBack(err);
            } else {
                console.log("Push Notification added Successfully");
                callBack(null, result);
            }
        })
}


notificationModel.prototype.sendNotification = (obj, callBack) => {
    // console.log(obj);

    push.findOne({
        userId: obj
    }, (err, result) => {

        if (err) {

            callBack(err)
        } else {
            console.log(result.firebasetoken);
            callBack(null, result.firebasetoken)
        }
    })
}

module.exports = new notificationModel()
