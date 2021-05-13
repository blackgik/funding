const mongoose = require("mongoose");
const mongooseValidationError = mongoose.Error.ValidationError;


const errorHandler = async (error,req, res, next) => {
    const errorNames = [
        "CastError",
        "JsonWebTokenError",
        "ValidationError",
        "SyntaxError",
        "MongooseError",
        "MongoError",

    ]

    if(error.name == 'crowdFunding' && error.isOperational) {
        next(error);
        return res.status(error.errorCode).send({
            success: false,
            message: error.message,
            data: null
        })
    }

    if (error instanceof mongooseValidationError) {
        const errorMessages = Object.values(error.errors).map((e) => e.message);
        next(error)
        return res.status(400).send({
            success: false,
            message: 'inputs fields might be wrong',
            data: errorMessages
        })
    }

    if (error.hasOwnProperty("name") && error.name === "MongoError") {
        const data = error && error.errmsg ? error.errmsg : null;
        const dataErrorMsg = error.message.split(':').length - 2
        next(error);
        return res.status(400).send({ success: false, message: `Duplicate key ${error.message.split(':')[dataErrorMsg]} } already exist` });
    }

    if (errorNames.includes(error.name)) {
        next(error)
	    return res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
	}

}

module.exports = errorHandler;