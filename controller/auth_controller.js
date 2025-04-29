const { JsonWebTokenError } = require('jsonwebtoken');
const {user} = require('../model/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const existingUser = await user.findOne({username: username});
        if(existingUser) return res.status(409).send({msg: "user already exists"});

        const newUser = new user({username, password});
        await newUser.save();
        return res.status(201).send({msg: "user created successfully", user: {username: newUser.username, password: newUser.password}})
    }catch(err){
        res.status(500).send({msg: "User couldn't created, try again", error: err.message})
    }
}
exports.loginUser = async (req, res)=>{
    try{
        const {body: {username, password}} = req;
        if(!username || !password) return res.status(400).send({msg: "All fields are compulsory"});
        const getUser = await user.findOne({username});
        if(!getUser) return res.status(404).send({msg: "user not found"});
        if(!(await bcrypt.compare(password, getUser.password))) return res.status(401).send({msg: "Password didn't match"});

        const token = await jwt.sign({username}, process.env.SECRET_KEY, {expiresIn: '1h'})
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000*60*60*1
        })
        res.status(200).send({msg: "Login successful"})
    }catch(err){
        return res.status(500).send({msg: "server error, try again after some time"})
    }
}