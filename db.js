const mongoose = require('mongoose');
const mongoDbUrl = process.env.mongoDbUrl

const connection = async () => {
    await mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res => {
            console.log("Db connected")
        })
        .catch(err => {
            console.log("Error while connecting db ", err)
        })
}

module.exports = {
    connection
}