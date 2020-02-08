// var admin = require('firebase-admin')
// var serviceAccount = require('./fundoo-notes-57ac2-firebase-adminsdk-l2nuw-32f60b7a50.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://fundoo-notes-57ac2.firebaseio.com"
// });

// var options = {
//     priority: "normal",
//     timeToLive: 60 * 60
// };

// module.exports = {

//     sendNotification(token,payload) {

//         console.log('send notification ' ,payload);
        
//         var registerationToken = token
//         admin.messaging().sendToDevice(registerationToken, payload, options)
//             .then(function (response) {
//                 console.log("Message sent successfully", response);

//             })
//             .catch(function (error) {
//                 console.log("Error in sending message", error);
//             })

//     }
// }



