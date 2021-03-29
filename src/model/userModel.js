const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim:true
    },

    lastName: {
        type: String,
        required:true,
        trim:true
    },

    middleName: {
        type: String,
        required:true,
        trim:true
    },

    phone: {
        type: String,
        required:true,
        trim:true,
        unique: true,

        validate(value) {
            if(value.length < 10) {
                throw new Error('Number must be greater than 10 digits')
            }
        }
    },

    email: {
        type: String,
        required:true,
        trim:true,
        unique: true,

        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('This is not an email, please provide a valide email')
            }
        }
    },

    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: true,

        validate(value) {
            if(value.includes('password' || 'PASSWORD' || 123)) {
                throw new Error('password contains simple keys')
            }
        }
    },

    address: {
        type: String,
        required:true,
        trim:true
    },

    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }]
})

userSchema.methods.generateToken = async function(){
    const user = this

    const token = jwt.sign({_id: user._id}, 'drinkingbeer') 
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.statics.findUserByCredentials = async (email, password)=> {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('user with email does not exist')
    }

    console.log(password)
    console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch) {
        return user
    }
    
    throw new Error('user with password does not match')
}


userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User;
