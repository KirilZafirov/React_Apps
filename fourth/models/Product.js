const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name : {
        type: String,
        required: true
    },
    descriptionEn : {
        type: String,
        required: true
    },
    descriptionMk : {
        type: String,
        required: true
    },
    descriptionMeta : {
        type: String,
        required: true
    },
    type : {
        type: String,
        default: 'pecateni'
    },
    category : {
        type: String,
        default: 'pecateni'
    },
    subCategory: {
        type: String,
        default: 'pecateni' 
    },
    date : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('contact' , ContactSchema);