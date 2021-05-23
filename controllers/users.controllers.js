const { response } = require('express');
const becryptjs = require('bcryptjs');


const User = require('../models/user.model');


const usersGet = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    //Promise.all espera a que se ejecuten ambas queries,si una falla, falla todo
    //Debe ir con await, sino, ejecutará el res.json antes
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .limit(Number(limit))
        .skip(Number(from))
    ]);
    res.json({
        total,
        users
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
    const { _id, password, google, email, ...resto } = req.body;
    //encrypt password
    if (password) {
        const salt = becryptjs.genSaltSync(10);
        resto.password = becryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
};

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;

    //esto permitirá que de cara al usuario aparezca como que el usuario fue eliminado
    //pero en realidad no se ha eliminado, así se evitan problemas de integridad
    //referencial.
    const user = await User.findByIdAndUpdate(id, { status: false });
    res.json(user);
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
};