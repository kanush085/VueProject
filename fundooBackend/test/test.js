/************************************************************
 * @description
 * 
 * @file        :   test.js
 * @overview    :   To test the restfull API using mocha chai.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   20-03-2019
 * 
 * **********************************************************/
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
var server = require('../server')
var fs = require('fs');

function readFile() {
    /**
     * @description:read file from json
     */
    var data = fs.readFileSync('/home/admin1/Fundoo/FundooNotes/Fundoo-server/test/test.json');
    var data1 = JSON.parse(data);
    return data1;
}
/**``
 * @description:test script for registration 
 */
describe('Status and content', function () {
    describe('Registration page', function () {
        var data1 = readFile();
        it('status ', function (done) {
            chai.request(server).post('/register').send(data1.register).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect ==>", res.body);
                    res.should.have.status(200);
                    /**
                     * @description:test script for login
                     */
                    describe('Login page', function () {
                        it('status ', function (done) {
                            chai.request(server).post('/login').send(data1.login).end((err, res) => {
                                if (err) {
                                    console.log("expect ==>", err);
                                } else {
                                    console.log("expect ==>", res.body);
                                    res.should.have.status(200);
                                    /**
                                     * @description:test script for forgot password
                                     */
                                    describe('Forgot Password page', function () {
                                        it('status ', function (done) {
                                            chai.request(server).post('/forgotPassword').send(data1.forgotPassword).end((err, res) => {
                                                if (err) {
                                                    console.log("expect ==>", err);
                                                } else {
                                                    console.log("expect ==>", res.body);
                                                    res.should.have.status(200);
                                                    /**
                                                     * @description:test script for reset password
                                                     */
                                                    describe('Reset Password page', function () {
                                                        it('status ', function (done) {
                                                            chai.request(server).post('/resetPassword/:token').send(data1.resetPassword).end((err, res) => {
                                                                if (err) {
                                                                    console.log("expect ==>", err);
                                                                } else {
                                                                    console.log("expect ==>", res.body);
                                                                    res.should.have.status(200);
                                                                }
                                                                describe('createNote', function () {
                                                                    it('status ', function (done) {
                                                                        chai.request(server).post('/createNote').send(data1.createNote).end((err, res) => {
                                                                            if (err) {
                                                                                console.log("expect ==>", err);
                                                                            } else {
                                                                                console.log("expect ==>", res.body);
                                                                                res.should.have.status(200);
                                                                            }
                                                                            describe('isArchived', function () {
                                                                                it('status ', function (done) {
                                                                                    chai.request(server).put('/isArchived').send(data1.isArchived).end((err, res) => {
                                                                                        if (err) {
                                                                                            console.log("expect ==>", err);
                                                                                        } else {
                                                                                            console.log("expect ==>", res.body);
                                                                                            res.should.have.status(200);
                                                                                        }
                                                                                        describe('getNotes', function () {
                                                                                            it('status ', function (done) {
                                                                                                chai.request(server).get('/getNotes').send(data1.getNotes).end((err, res) => {
                                                                                                    if (err) {
                                                                                                        console.log("expect ==>", err);
                                                                                                    } else {
                                                                                                        console.log("expect ==>", res.body);
                                                                                                        res.should.have.status(200);
                                                                                                    }
                                                                                                    describe('isTrashed', function () {
                                                                                                        it('status ', function (done) {
                                                                                                            chai.request(server).put('/isTrashed').send(data1.isTrashed).end((err, res) => {
                                                                                                                if (err) {
                                                                                                                    console.log("expect ==>", err);
                                                                                                                } else {
                                                                                                                    console.log("expect ==>", res.body);
                                                                                                                    res.should.have.status(200);
                                                                                                                } describe('deleteNote', function () {
                                                                                                                    it('status ', function (done) {
                                                                                                                        chai.request(server).post('/deleteNote').send(data1.deleteNote).end((err, res) => {
                                                                                                                            if (err) {
                                                                                                                                console.log("expect ==>", err);
                                                                                                                            } else {
                                                                                                                                console.log("expect ==>", res.body);
                                                                                                                                res.should.have.status(200);
                                                                                                                            }
                                                                                                                            describe('updateColor', function () {
                                                                                                                                it('status ', function (done) {
                                                                                                                                    chai.request(server).put('/updateColor').send(data1.updateColor).end((err, res) => {
                                                                                                                                        if (err) {
                                                                                                                                            console.log("expect ==>", err);
                                                                                                                                        } else {
                                                                                                                                            console.log("expect ==>", res.body);
                                                                                                                                            res.should.have.status(200);
                                                                                                                                        }
                                                                                                                                        describe('editTitle', function () {
                                                                                                                                            it('status ', function (done) {
                                                                                                                                                chai.request(server).put('/editTitle').send(data1.editTitle).end((err, res) => {
                                                                                                                                                    if (err) {
                                                                                                                                                        console.log("expect ==>", err);
                                                                                                                                                    } else {
                                                                                                                                                        console.log("expect ==>", res.body);
                                                                                                                                                        res.should.have.status(200);
                                                                                                                                                    }
                                                                                                                                                    describe('editDescription', function () {
                                                                                                                                                        it('status ', function (done) {
                                                                                                                                                            chai.request(server).put('/editDescription').send(data1.editDescription).end((err, res) => {
                                                                                                                                                                if (err) {
                                                                                                                                                                    console.log("expect ==>", err);
                                                                                                                                                                } else {
                                                                                                                                                                    console.log("expect ==>", res.body);
                                                                                                                                                                    res.should.have.status(200);
                                                                                                                                                                }
                                                                                                                                                                describe('doPinned', function () {
                                                                                                                                                                    it('status ', function (done) {
                                                                                                                                                                        chai.request(server).put('/doPinned').send(data1.doPinned).end((err, res) => {
                                                                                                                                                                            if (err) {
                                                                                                                                                                                console.log("expect ==>", err);
                                                                                                                                                                            } else {
                                                                                                                                                                                console.log("expect ==>", res.body);
                                                                                                                                                                                res.should.have.status(200);
                                                                                                                                                                            }

                                                                                                                                                                            done()
                                                                                                                                                                        })
                                                                                                                                                                    })
                                                                                                                                                                })

                                                                                                                                                                done()
                                                                                                                                                            })
                                                                                                                                                        })
                                                                                                                                                    })

                                                                                                                                                    done()
                                                                                                                                                })
                                                                                                                                            })
                                                                                                                                        })

                                                                                                                                        done()
                                                                                                                                    })
                                                                                                                                })
                                                                                                                            })
                                                                                                                            done()
                                                                                                                        })
                                                                                                                    })
                                                                                                                })
                                                                                                                done()
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                    done()
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                        done()
                                                                                    })
                                                                                })
                                                                            })
                                                                            done()
                                                                        })
                                                                    })
                                                                })
                                                                done()
                                                            })
                                                        })
                                                    })
                                                }
                                                done()
                                            })
                                        })
                                    })
                                }
                                done()
                            })
                        })
                    })
                }
                done()
            })
        })
    })
})