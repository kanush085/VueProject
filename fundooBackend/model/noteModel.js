const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var noteSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        // ref: 'Note'
    },
    title: {
        type: String,
        required: [true, "Title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    reminder: {
        type: String
    },
    color: {
        type: String,
    },
    image: {
        type: String
    },
    archive: {
        type: Boolean
    },
    pinned: {
        type: Boolean
    },
    trash: {
        type: Boolean
    },
    label: [{
        type: String,
        ref: "labelSchema"
    }],
    index: {
        type: Number
    }

}, {
    timestamps: true
});
noteSchema.plugin(AutoIncrement, {
    inc_field: 'index'
});
var note = mongoose.model('Note', noteSchema);

function noteModel() {}
/**
 * @description:it will add the notes data using note schema and save the data into the database
 * @param {*request from frontend} objectNote 
 * @param {*response to backend} callback 
 */
noteModel.prototype.addNotes = (objectNote, callback) => {
    let obj = objectNote.body;
    obj.userId = objectNote.decoded.payload.user_id
    const noteModel = new note(objectNote.body);
    console.log("data", objectNote.body);
    //To save the data in dbs
    console.log("dfbhythj==================>", objectNote.body);
    noteModel.save((err, result) => {
        if (err) {
            console.log("Model not found");
            callback(err);
        } else {
            console.log("Note added Successfully");
            callback(null, result);
        }
    })
}

/**
 * @description:it will get the notes using userId and find the notes with data
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.getNotes = (body, callback) => {
    // console.log("hjjjjjjjjjjjj",body.userid);

    note.find({
        userId: body.userid

    }, (err, result) => {

        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} noteID 
 * @param {*} archiveNote 
 * @param {*} callback 
 */
noteModel.prototype.isArchived = (noteID, archiveNote, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                archive: archiveNote,
                trash: false,
                pinned: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log(archiveNote);
                return callback(null, archiveNote)
            }
        });
};
/**
 * 
 * @param {*} noteID 
 * @param {*} trashNote 
 * @param {*} callback 
 */

noteModel.prototype.isTrashed = (noteID, trashNote, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                trash: trashNote
            }
        },
        (err, result) => {
            if (err) {

                callback(err)
            } else {
                return callback(null, trashNote)
            }
        });
};
/**
 * @description:
 * @param {*} noteID 
 * @param {*} callback 
 */
noteModel.prototype.deleteNote = (noteID, callback) => {
    console.log("came to model delete note model");
    note.deleteOne({
        _id: noteID
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            const body = {
                status: true,
                msg: "note deleted successfully"

            }
            return callback(null, body)
        }
    })
}
noteModel.prototype.addImage = (data, callBack) => {
    note.findByIdAndUpdate({
        _id: data.id
    }, {
        $set: {
            image: data.image
        }
    }, (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, data.image)

        }
    })
}
/**
 * @description:
 * @param {*} noteID 
 * @param {*} color 
 * @param {*} callback 
 */

noteModel.prototype.updateColor = (noteID, color, callback) => {
    console.log("came to updatecolor model");
    note.findOneAndUpdate({
        _id: noteID
    }, {
        $set: {
            color: color
        }
    }, (err, result) => {
        if (err) {

            callback(err)
        } else {
            return callback(null, color)
        }
    })
}
/**
 * @description:
 * @param {*} noteID 
 * @param {*} updateTitle 
 * @param {*} callback 
 */


noteModel.prototype.editTitle = (noteID, updateTitle, updateDescription, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                title: updateTitle,
                description: updateDescription
            }
        },
        (err, result) => {
            if (err) {

                callback(err)
            } else {
                return callback(null, result)
            }
        });
};
/**
 * @description:
 * @param {*} noteID 
 * @param {*} updateDescription 
 * @param {*} callback 
 */


noteModel.prototype.editDescription = (noteID, updateDescription, callback) => {
    console.log("came to model ");

    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                description: updateDescription
            }
        },
        (err, result) => {
            if (err) {

                callback(err)
            } else {
                return callback(null, updateDescription)
            }
        });
};

/**
 * @description:
 * @param {*} noteID 
 * @param {*} doPinned 
 * @param {*} callback 
 */

noteModel.prototype.doPinned = (noteID, doPinned, callback) => {
    console.log("in model pinned", noteID, doPinned);

    note.findOneAndUpdate({
        _id: noteID
    }, {
        $set: {
            pinned: doPinned
        }
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            return callback(null, doPinned)
        }
    })
}



noteModel.prototype.reminder = (noteID, reminderNote, callback) => {
    console.log("came to reminder model");
    note.findOneAndUpdate({
        _id: noteID
    }, {
        $set: {
            reminder: reminderNote
        }
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            return callback(null, reminderNote)
        }
    })

}

noteModel.prototype.getAllUser = (callBack) => {
    note.find((err, result) => {
        if (err) {
            callBack(err);
        } else {
            const reminder = []
            var d = new Date();
            const date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()).toJSON();

            result.forEach(function (value) {
                if (value.reminder == date) {
                    console.log('correct');
                    reminder.push(value);
                }
            })
            console.log("Reminder length", reminder.length);
            if (reminder.length > 0) {
                callBack(null, reminder)
            } else {
                callBack(null, "No reminders found")
            }
        }
    });
}







var labelSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id  required"]
    },

    label: {
        type: String,
        required: [true, "Label required"]
    }
}, {
    timestamps: true
});

var label = mongoose.model('Label', labelSchema)


noteModel.prototype.createLabel = (objectLabel, callBack) => {
    const lableModel = new label(objectLabel.body)

    lableModel.save((err, result) => {
        if (err) {
            console.log("Model not found");
            callBack(err)

        } else {
            console.log("Label added successfully");
            callBack(null, result)

        }
    })
}

noteModel.prototype.getLabel = (req, callBack) => {
    label.find({
        userId: req.decoded.payload.user_id
    }, (err, result) => {
        if (err) {
            callBack(err)
        } else {
            callBack(null, result)
        }
    })
}


noteModel.prototype.deleteLabel = (labelID, callBack) => {
    console.log("came to delete label model");

    label.deleteOne({
        _id: labelID
    }, (err, result) => {
        if (err) {
            callBack(err)
        } else {
            const body = {
                status: true,
                msg: "label deleted successfully"
            }
            return callBack(null, body)
        }
    })

}



noteModel.prototype.editLabel = (labelID, updateLabel, callBack) => {
    label.findOneAndUpdate({
        _id: labelID
    }, {
        $set: {
            label: updateLabel
        }
    }, (err, result) => {
        if (err) {
            callBack(err)
        } else {
            return callBack(null, updateLabel)
        }
    })
}


noteModel.prototype.saveLabel = (noteID, noteLabel, callBack) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
        $push: {
            label: noteLabel
        }
    }, (err, result) => {
        if (err) {

            callBack(err)
        } else {
            return callBack(null, noteLabel)
        }
    })
}



noteModel.prototype.deleteNoteLabel = (noteID, deletelabel, callBack) => {
    // console.log("jhdkjhdhj",noteID,">>>>>>>>>>>>>>>>>",deletelabel);

    note.findOneAndUpdate({
        _id: noteID
    }, {
        $pull: {
            label: deletelabel
        }
    }, (err, result) => {
        if (err) {

            callBack(err)
        } else {

            let newArray = result.label
            // console.log("new Array",newArray);

            for (i = 0; i <= newArray.length; i++) {
                if (newArray[i] === deletelabel) {
                    newArray.splice(i, 1)
                }
            }
            console.log(newArray);


            return callBack(null, newArray)
        }
    })
}

module.exports = new noteModel();