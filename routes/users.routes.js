const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate.fields');
const Role = require('../models/role.model');
const { isValidRole, emailExists, userExistsById } = require('../helpers/db.validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, hasRole } = require('../middlewares/validate-roles');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users.controllers');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExists),
    check('role').custom(isValidRole), // custom( (role) => isValidRole(role)) es igual a custom(isvalidRole)
    validateFields //valida si acaso alguna de las validaciones de check encontrron algún error y las muestra
], usersPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], usersPut);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], usersDelete);

module.exports = router;