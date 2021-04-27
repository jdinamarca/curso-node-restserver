const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
    role: {
        type: String,
        requiered: [true, 'El role es obligatorio']
    }
});


module.exports = model('Role', RoleSchema);