const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, () => {
            console.log('Mongodb database connected.')
        })
    } catch (error) {
        console.log(`Somthing happened with mongo server.`)
    }
}

module.exports = connection; 