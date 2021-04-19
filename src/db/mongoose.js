const mongoose = require('mongoose');

const url = process.env.MONGODB_URL

// connecting
mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})