const { check } = require('express-validator')
const { validateResult } = require('../helpers/validationHelper')

const validacionCampos = [
    check('nombre')
        .exists()
        .withMessage('El campo Producto no esta definido')
        .not()
        .notEmpty()
        .withMessage('El campo Producto esta vacio')
         .isAlpha('es-ES',{ignore: ' '})
            .withMessage('El campo Producto Solo Puede tener caracteres de la A a la Z (se permiten espacios)'),
    check('modelo')
        .exists()
        .withMessage('El campo Modelo no esta definido')
        .not()
        .notEmpty()
        .withMessage('El campo Modelo esta vacio'),
    check('precio')
        .exists()
        .withMessage('El campo precio no esta definido')
        .isFloat()
        .withMessage('El campo debe ser un precio adecuado')
        .isLength({ min: 3 })
        .withMessage('EL campo precio debe tener minimo 3 numeros'),
    (req, res, next) => validateResult(req, res, next)
    
]
module.exports={validacionCampos}