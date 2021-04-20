const { response } = require('express');


const usersGet = (req, res = response) => {

    const { nombre, apikey, page = 1 } = req.query;

    res.json({
        msg: 'get API -  Controller',
        nombre,
        apikey,
        page
    });
};

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - Controller',
        nombre,
        edad
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