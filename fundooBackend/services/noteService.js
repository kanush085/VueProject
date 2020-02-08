const noteModel = require('../model/noteModel');
const notepush = require('../sendNotification')
const notifyModel = require('../model/pushNotificationModel')
/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.createNote = (data, callback) => {
    console.log("In service=====>");

    noteModel.addNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            return callback(err);
        } else {
            // console.log("In service", result);
            return callback(null, result);
        }
    });
}

/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.getNotes = (data, callback) => {
    console.log("In service=====>");
    noteModel.getNotes(data, (err, result) => {
        // console.log("dddddddddddddddddddd",data);

        if (err) {
            console.log("service error");
            return callback(err);
        }
        else {
            return callback(null, result);
        }
    })
}

/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.isArchived = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.isArchived(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */

exports.isTrashed = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.isTrashed(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.addImage = (data, callback) => {
    noteModel.addImage(data, (err, result) => {
        if (err) {
            callback(err)
        } else {
            return callback(null, result)
        }
    })
}

/**
 * 
 * @param {*} noteID 
 * @param {*} callback 
 */
exports.deleteNote = (noteID, callback) => {
    console.log("came to delete note service");
    noteModel.deleteNote(noteID, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })

}

/**
 * 
 * @param {*} noteID
 * @param {*} color 
 * @param {*} callback 
 */
// exports.updateColor = (noteID, color, callback) => {
//     console.log("came to updateColor note service");
//     noteModel.updateColor(noteID, color, (err, result) => {
//         if (err) {
//             callback(err);
//         } else {
//             return callback(null, result)
//         }
//     })

// }

exports.updateColor = (noteID, color) => {
    return new Promise(function (resolve, reject) {
        noteModel.updateColor(noteID, color, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })

}

/**
 * 
 * @param {*} noteID 
 * @param {*} noteID
 * @param {*} callback 
 */

exports.editTitle = (noteID, updateTitle,updateDescription, callback) => {
    console.log("came to editTitle note service");
    noteModel.editTitle(noteID, updateTitle,updateDescription, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })

}
/**
 * 
 * @param {*} noteID
 * @param {*} updateDescription
 * @param {*} callback 
 */
exports.editDescription = (noteID, updateDescription, callback) => {
    console.log("came to editTitle note service");
    noteModel.editDescription(noteID, updateDescription, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })

}

/**
 * 
 * @param {*} noteID
 * @param {*} doPinned
 * @param {*} callback 
 */
exports.doPinned = (noteID, doPinned, callback) => {
    console.log("came to pinned note service");
    noteModel.doPinned(noteID, doPinned, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })

}
exports.reminder = (noteID, reminderNote, callback) => {
    // console.log("came in reminder",noteID);
    noteModel.reminder(noteID, reminderNote, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }

    })

}



exports.pushNotification = (req, callBack) => {
    // console.log("came in reminder",noteID);
    notifyModel.pushNotification(req, (err, result) => {
        if (err) {
            callBack(err);
        } else {
            return callBack(null, result)
        }

    })

}


exports.sendNotification = (obj, callback) => {
    // console.log("came in reminder",noteID);
    notifyModel.sendNotification(obj, (err, result) => {
        if (err) {
            callback(err);
        } else {

            notepush.sendNotification(result)
            return callback(null, result)
        }

    })

}


exports.checkForReminder = () => {

    noteModel.getAllUser((err, result) => {

        if (err) {
            console.log(err);

        } else {
            if (Array.isArray(result)) {
                console.log("RESULT IS ", result);
                var userId = result[0].userId
                console.log(userId, "314564354354356464646");
                notifyModel.sendNotification(userId, (err, token) => {
                    if (err) {
                        callBack(err);
                    } else {

                        result.forEach(value => {

                            var payload = {
                                notification: {
                                    title: value.title,
                                    body: value.description
                                }
                            }
                            notepush.sendNotification(token, payload)
                            //return callBack(null, result)
                        });
                    }
                })

            } else {
                console.log("notes in reminder", result);
            }


        }

    })
    // console.log("ngahafagahagagafa",d5);

}



exports.createLabel = (req, callBack) => {


    noteModel.createLabel(req, (err, result) => {
        if (err) {
            callBack(err);
        } else {
            return callBack(null, result)
        }
    })

}




exports.getLabel = (req, callBack) => {


    noteModel.getLabel(req, (err, result) => {
        if (err) {
            callBack(err);
        } else {
            return callBack(null, result)
        }
    })

}




exports.deleteLabel = (labelID, callback) => {
    console.log("came to delete label service");
    noteModel.deleteLabel(labelID, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })

}




exports.editLabel = (labelID, updateLabel, callback) => {
    console.log("came to editTitle note service");
    noteModel.editLabel(labelID, updateLabel, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })

}

exports.saveLabel = (noteID, notelabel, callBack) => {
    noteModel.saveLabel(noteID, notelabel, (err, result) => {
        if (err) {
            callBack(err)
        } else {
            return callBack(null, result)
        }
    })
}


exports.deleteNoteLabel = (noteID, deletelabel, callBack) => {
    noteModel.deleteNoteLabel(noteID, deletelabel, (err, result) => {
        if (err) {
            callBack(err)
        } else {
            return callBack(null, result)
        }
    })
}