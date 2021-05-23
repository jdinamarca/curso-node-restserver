const { response } = require('express');

const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el Role sin validar el token'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador - No puede hacer esto`
        });
    }

    next();
};

const hasRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el Role sin validar el token'
            });
        }

        if (!roles.includes(req.user.role)) {
            res.status(401).json({
                msg: ` el servicio requiere uno de los siguientes roles: ${roles}`
            });
        }

        next();
    };
}

module.exports = {
    isAdminRole,
    hasRole
}