// se encarga de dar un resultado luego de todas las validaciones
const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    //si consigue un error retornalo y si no sigue su flujo
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({errors: err.array()})
     }
}
 module.exports={validateResult}