const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en esta petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer usuario que corresponde al uid

        const user = await User.findById(uid);


        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existe en DB'
            });
        }
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no válido - usurio con estado en false'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }


}

module.exports = {
    validateJWT
}