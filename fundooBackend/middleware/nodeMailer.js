/************************************************************
 * 
 * Purpose      :   To send mail to specified email-id using node mailer.
 * 
 * @description
 * 
 * @file        :   nodemailer.js
 * @overview    :   To validate and control the functionality.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   19-03-2019
 * 
 * **********************************************************/
const nodemailer = require('nodemailer');

exports.sendEMailFunction = (url) => {
    console.log(url);
    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {

                user: process.env.email,
                pass: process.env.password
            },
        });
        const mailOptions = {
            from: process.env.email,

            to: process.env.email,

            subject: 'ResetPassword',

            text: ' verifaction link is:\n\n' + url+""
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.log("error on sent mail" + err)
            else
                console.log("result sent on mail" + info);
        });
    } catch (err) {
        console.log(err.message);
    }
}