const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true
    },
    productoFavorito: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Client', clientSchema)
