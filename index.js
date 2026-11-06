const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Variable de entorno del puerto
const PUERTO = process.env.PUERTO

// Configuracion de express
app.use(express.json())
app.use(cors())

// Ruta de prueba temporal
app.get('/api/prueba', (peticion, respuesta) => {
    respuesta.json({
        msg: 'Prueba de traer informacion ejecutada'
    })
})

app.listen(PUERTO, () => {
    try {
        console.log("Conectado al puerto ", PUERTO)
    } catch (erorr) {
        console.log("Error conectandose al servidor", erorr.message)
    }
})