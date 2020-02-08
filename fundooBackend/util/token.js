/************************************************************
 * @description
 * 
 * @file        :   token.js
 * @overview    :   To generate a token using jsonwebtoken .
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   19-03-2019
 * 
 * **********************************************************/
const jwt = require('jsonwebtoken')
module.exports = {
    generateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn: 86400000 })
        const obj = {
            success: true,
            message: "Token genearted successfully",
            token: token
        }
        return obj;
    },
    GenerateTokenAuth(payload) {
        const token = jwt.sign({   payload  }, 'secretkey-auth', {
            expiresIn: '1D'
        })
        const obj = {
            status: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}