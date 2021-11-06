const router = require('express').Router();

const productosRouter = require('./routes/productos');

router.use('/producto', productosRouter);

module.exports = router;