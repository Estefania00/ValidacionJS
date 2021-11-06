const router = require('express').Router();
const { validacionCampos } = require('../../validators/Vproduc')

const productoController = require('../../controllers/productoController')



router.get('/', productoController.ListarProductos);
router.post('/id', productoController.ConsultaID);
router.post('/', validacionCampos , productoController.AgregarProducto);
router.put('/', validacionCampos , productoController.EditarProducto); 
router.delete('/:id', productoController.EliminarProducto);


module.exports = router;