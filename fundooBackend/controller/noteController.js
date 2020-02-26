const noteService = require('../services/noteService');
const rediscache = require('../redisCache')
/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.createNote = (req, res) => {
    try {
        console.log("In controller=====>", req.body);

        req.checkBody('title', 'Title should not be empty').not().isEmpty();
        req.checkBody('description', 'Description should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            // var obj = { title: req.body.title, description: req.body.description }
            console.log(req.body, "shdyuhddddddddddddddddddddddd");

            noteService.createNote(req, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    var userNote = {
                        note: result,
                    }
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    response.status = true;
                    response.message = "Note created";
                    response.data = userNote;
                    res.status(200).send(response);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}

/**
 * @description:it handles the getNotes  data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.getNotes = (req, res) => {
    console.log("coming from frontend", req.decoded.payload.user_id);
    try {
        var response = {}
        var body = {
            'userid': req.decoded.payload.user_id
        }

        rediscache.redisgetNotes(body.userid, (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                response.source = 'rediscache API'
                response.message = 'Notes!'
                response.data = resultJSON.resultJSON
                return res.status(200).send(response)

            } else {
                console.log("in redis else>>>>>>>>>>>>>>>>>.");

                noteService.getNotes(body, (error, resultJSON) => {
                    if (resultJSON) {
                        rediscache.setredisNotes(body.userid, resultJSON)
                        response.source = 'API'
                        response.message = 'Here you go, all your notes!'
                        response.data = resultJSON
                        return res.status(200).send(response)

                    } else {

                        response.message = 'unable to get notes, it may be invalid user id',
                            response.result = error
                        return res.status(500).send(response)

                    }
                })
            }
        })
    } catch (error) {
        console.log("catch", error);

    }
}







// exports.getNotes = (req, res) => {
//     console.log("coming from frontend");

//     try {
//         var response = {}
//         noteService.getNotes(req, (err, result) => {


//             if (err) {
//                 response.status = false;
//                 response.error = errors;
//                 response.message = "not able to get notes"
//                 return res.status(500).send(response);
//             }
//             else {
//                 response.status = true;
//                 response.message = "List of notes";
//                 response.data = result;
//                 res.status(200).send(response);
//             }
//         })
//     } catch (error) {

//     }
// }

/**
 * @description:it handles the Archived note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.isArchived = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();

        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            archive = req.body.archive;
            noteService.isArchived(noteID, archive, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}

/**
 * @description:it handles the Trashed note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.isTrashed = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            trash = req.body.trash;

            noteService.isTrashed(noteID, trash, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    console.log("GHEre In CacHE");

                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * @description:it handles the deleteNote note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.deleteNote = (req, res) => {
    try {
        console.log("*****came to ctrl**")
        req.checkBody("noteID", "noteID is required").not().isEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response)
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            noteService.deleteNote(noteID, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult)
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * @description:it handles the updateColor note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.updateColor = (req, res) => {
    try {
        req.checkBody("noteID", "noteID is required").not().isEmpty();
        req.checkBody("color", "color is required").not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response)
        } else {
            var responseResult = {}
            var noteID = req.body.noteID;
            var color = req.body.color;
            noteService.updateColor(noteID, color)
                .then(result => {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult)
                }).catch(err => {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                })
        }
    } catch (error) {
        res.send(error)
    }
}

/**
 * @description:it handles the editTitle note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.editTitle = (req, res) => {
    try {
        req.checkBody("noteID", "noteID is required").not().isEmpty();
        var response = {}
        var errors = req.validationErrors();
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {};
            var noteID = req.body.noteID;
            var updateTitle = req.body.title;
            var updateDescription = req.body.updateDescription;
            noteService.editTitle(noteID, updateTitle, updateDescription, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err
                    return res.status(500).send(responseResult)
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    return res.status(200).send(responseResult)
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * @description:it handles the editDescription note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.editDescription = (req, res) => {
    try {
        req.checkBody("noteID", "noteID is required").not().isEmpty();
        var response = {}
        var errors = req.validationErrors();
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {};
            var noteID = req.body.noteID;
            var updateDescription = req.body.description;
            noteService.editDescription(noteID, updateDescription, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err
                    return res.status(500).send(responseResult)
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    return res.status(200).send(responseResult)
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.addImage = (req, res) => {
    try {
        var response = {}
        var errors = req.validationErrors()
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {};
            var image = {
                id: req.body.id,
                image: req.body.image
            }
            noteService.addImage(image, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    return res.status(500).send(responseResult)
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result
                    return res.status(200).send(responseResult)
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}

/**
 * @description:it handles the Pinned note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.doPinned = (req, res) => {
    try {

        req.checkBody('noteID', 'noteId is required').not().isEmpty();
        var response = {}
        var errors = req.validationErrors();
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {};
            var noteID = req.body.noteID;
            var doPinned = req.body.pinned;
            noteService.doPinned(noteID, doPinned, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    return res.status(500).send(responseResult)
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result
                    return res.status(200).send(responseResult)
                }
            })
        }

    } catch (error) {
        res.send(error)
    }
}



exports.reminder = (req, res) => {
    try {
        // console.log("id=============>", req);
        req.checkBody("noteID", "noteID is required").not().isEmpty();
        var response = {}
        var errors = req.validationErrors();
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var noteID = req.body.noteID;
            var reminderNote = req.body.reminder
            noteService.reminder(noteID, reminderNote, (err, result) => {
                var responseResult = {}
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    return res.status(500).send(responseResult);
                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;
                    return res.status(200).send(responseResult)
                }


            })
        }

    } catch (error) {
        res.send(error)
    }

}
exports.pushNotification = (req, res) => {
    // console.log("REQ IS ++++++++++++++++++",req);

    req.checkBody("userId", "userId is required").not().isEmpty();
    var responseResult = {}
    var errors = req.validationErrors()
    if (errors) {
        responseResult.status = false;
        responseResult.error = errors
        return res.status(422).send(responseResult)
    } else {

        noteService.pushNotification(req, (err, result) => {
            var response = {}
            if (err) {
                response.status = false;
                response.error = err
                return res.status(500).send(response)
            } else {
                response.status = true;
                response.data = result;
                return res.status(200).send(response)
            }
        })
    }
}

exports.sendNotification = (req, res) => {
    // req.checkBody("userId", "userId is required").not().isEmpty();
    var responseResult = {}
    var errors = req.validationErrors()
    if (errors) {
        responseResult.status = false;
        responseResult.error = errors
        return res.status(422).send(responseResult)
    } else {
        var obj = req.params.userId
        console.log("USER IS +++", obj);

        noteService.sendNotification(obj, (err, result) => {
            var response = {}
            if (err) {
                response.status = false;
                response.error = err
                return res.status(500).send(response)
            } else {
                response.status = true;
                response.data = result;
                return res.status(200).send(response)
            }
        })
    }

}



exports.createLabel = (req, res) => {
    req.checkBody("userId", "userId is required").not().isEmpty();

    var responseResult = {}
    var errors = req.validationErrors()
    if (errors) {
        responseResult.status = false;
        responseResult.error = errors
        return res.status(422).send(responseResult)

    } else {
        var response = {}
        // var userID=req.decoded.payload.user_id
        // var label=req.body.label
        noteService.createLabel(req, (err, result) => {
            if (err) {
                response.status = false;
                response.error = err
                return res.status(500).send(response)

            } else {
                response.status = true;
                response.data = result;
                return res.status(200).send(response)
            }
        })
    }
}


exports.getLabel = (req, res) => {
    // req.checkBody("userId", "userId is required").not().isEmpty();
    try {

        var responseResult = {}
        var errors = req.validationErrors()
        if (errors) {
            responseResult.status = false;
            responseResult.error = errors
            return res.status(422).send(responseResult)

        } else {
            var response = {}
            noteService.getLabel(req, (err, result) => {
                if (err) {
                    response.status = false;
                    response.error = err
                    return res.status(500).send(response)

                } else {
                    response.status = true;
                    response.data = result;
                    return res.status(200).send(response)
                }
            })

        }



    } catch (error) {
        res.send(error)
    }
}



exports.deleteLabel = (req, res) => {
    try {

        req.checkBody("labelID", "label ID is required").not().isEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {}
            labelID = req.body.labelID;
            noteService.deleteLabel(labelID, (err, result) => {
                if (err) {
                    responseResult.status = false
                    responseResult.error = err;

                    return res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    return res.status(200).send(responseResult)

                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}


exports.editLabel = (req, res) => {
    try {
        req.checkBody("labelID", "label is required");
        var response = {}
        var errors = req.validationErrors()
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {}
            labelID = req.body.labelID;
            updateLabel = req.body.label;
            noteService.editLabel(labelID, updateLabel, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    return res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    responseResult.data = result
                    return res.status(200).send(responseResult)
                }
            })
        }

    } catch (error) {
        res.send(error)
    }
}


exports.saveLabel = (req, res) => {
    try {
        req.checkBody("noteID", "noteID is required").not().isEmpty()
        var response = {}
        var errors = req.validationErrors()
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {}
            var noteID = req.body.noteID;
            var notelabel = req.body.label
            noteService.saveLabel(noteID, notelabel, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err
                    return res.status(500).send(responseResult)

                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;

                    return res.status(200).send(responseResult)
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.deleteNoteLabel = (req, res) => {
    try {
        console.log("label in deleet >>>>>>>>>>>>.", req.body.label);

        req.checkBody("noteID", "noteID is required").not().isEmpty()
        var response = {}
        var errors = req.validationErrors()
        if (errors) {
            response.status = false;
            response.error = errors
            return res.status(422).send(response)
        } else {
            var responseResult = {}
            var noteID = req.body.noteID;
            var deletelabel = req.body.label
            noteService.deleteNoteLabel(noteID, deletelabel, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err
                    return res.status(500).send(responseResult)

                } else {
                    rediscache.deleteRedisNotes(req.decoded.payload.user_id)
                    responseResult.status = true;
                    responseResult.data = result;

                    return res.status(200).send(responseResult)
                }
            })
        }


    } catch (error) {

    }
}