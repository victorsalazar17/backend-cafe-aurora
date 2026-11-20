const Client = require('./../models/Client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registrar = async (peticion, respuesta) => {
    try{
        const { nombre, email, password, telefono, productoFavorito } = peticion.body

        let user = await Client.findOne({ email: email })

        if(user) return respuesta.status(400).json({
                msg: `El usuario ${ email } ya esta registrado en la base de datos`
            })

        const passwordEncriptado = await bcrypt.hash(password, 10)


        user = new Client({
            nombre,
            email,
            password: passwordEncriptado,
            telefono,
            productoFavorito
        })

        await user.save()

        return respuesta.status(201).json({
            msg: 'El usuario fue creado correctamente'
        })

    } catch(error) {

        return respuesta.status(500).json({
            msg: `Error al registrar usuario ${ error.message } `
        })
    }
}

const login = async(peticion, respuesta) => {
    try{
        
        const { email, password } = peticion.body

        const user = await Client.findOne({ email: email })

        if(!user) return respuesta.status(404).json({
            msg: `El Usuario ${ email } NO existe en la base de datos`
        })

        const passwordCoinciden = await bcrypt.compare(password, user.password)

        // Validacion de contraseña
        if(!passwordCoinciden){
            return respuesta.status(400).json({
                msg:'La contraseña es incorrecta'
        })}

        const token = jwt.sign(
            {  id: user._id },
            process.env.LLAVE_SECRETA,
            { expiresIn: '1h' }
        )

        return respuesta.status(200).json({
            token
        })

    } catch(error) {

        return respuesta.status(500).json({
            msg: `Error al iniciar sesion ${ error.message } `
        })
    }
}

module.exports = {
    registrar,
    login
}