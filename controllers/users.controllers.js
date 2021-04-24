const { response } = require('express');
const User = require('../models/user');


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

    await user.save();

    res.json({
        msg: 'post API - Controller',
        user
    });
};

const usersPut = (req, res) => {

    const id = req.params.id;
    res.json({
        msg: 'put API - Controller',
        id
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