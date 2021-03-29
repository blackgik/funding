const express = require('express');
const router = new express.Router()
const User = require('../model/userModel');

// signing up the user
router.post('/user/sign-up', async (req, res)=> {
    const newUser = new User(req.body)

    try{
        await newUser.save()
        const token = newUser.generateToken()
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            newUser,
            token
        })
    }catch(e) {
        res.status(400).json({
            success: false,
            message: e
        })
    }
} )

// signing in user{}
// we need to get the users email, and ensure that the user exists in the database

router.post('/user/sign-in', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken()

        res.status(200).json({
            success: true,
            message: 'successful login',
            user,
            token
        })
    }catch(e){
        console.log(e)
        res.status(404).json({
            success: false,
            message: e
        })
    }
    

})
module.exports = router;