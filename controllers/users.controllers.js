const { response } = require('express');
const becryptjs = require('bcryptjs');


const User = require('../models/user.model');


const usersGet = (req, res = response) => {

    const { nombre, apikey, page = 1 } = req.query;

    res.json({
        msg: 'get API -  Controller',
        nombre,
        apikey,
        page
    });
};

const usersPost = async(req, res = response) => {

    const { name, password, email, role } = req.body;
    const user = new User({ name, password, email, role });

    //encriptar password
    const salt = becryptjs.genSaltSync(10);
    user.password = becryptjs.hashSync(password, salt);
    //Guarda en la BD
    await user.save();

    res.json({
        user
    });
};

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;

    //encriptar password
    if (password) {
        const salt = becryptjs.genSaltSync(10);
        resto.password = becryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        user
    });
};

const usersDelete = (req, res) => {

    const id = req.params.id;
    res.json({
        msg: 'delete API - Controller',
        id
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
};