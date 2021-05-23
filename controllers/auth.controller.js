const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario y password no son correctos'
            });
        }


        //Si user está activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario y password no son correctos (estado: false)'
            });
        }

        //verificar password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario y password no son correctos (password)'
            });
        }


        //generar jwt
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}