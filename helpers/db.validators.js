const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El role ${role} no está registrado en la base de datos`)
    }
};

const emailExists = async(email = '') => {
    const emailFound = await User.findOne({ email });
    if (emailFound) {
        throw new Error(`El correo ${email} ya está registrado en la base de datos`);
    }
};


module.exports = {
    isValidRole,
    emailExists
};