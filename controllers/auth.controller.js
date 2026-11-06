const Client = require('./../models/Client')

const registrar = async (peticion, respuesta) => {
    try{
        const { nombre, email, password, telefono, productoFavorito } = peticion.body

        let client = new Client({
            nombre,
            email,
            password,
            telefono,
            productoFavorito
        })

        await client.save()

        return respuesta.status(201).json({
            msg: 'El usuario fue creado correctamente'
        })
    } catch(error) {
        return respuesta.status(500).json({
            msg: `Error al registrar usuario ${ error.message } `
        })
    }
}

module.exports = {
    registrar
}