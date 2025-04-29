const express = require('express')
const router = express.Router();
const {registerUser, loginUser} = require('../controller/auth_controller.js')

router.get('/login', (req, res)=>{
    res.status(200).send({msg: "Welcome to Login Page"})
})

router.post('/register', registerUser)
router.post('/login', loginUser)
module.exports = [router]