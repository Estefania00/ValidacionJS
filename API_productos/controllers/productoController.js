const Producto = require('../database/models/producto')

const ListarProductos = async(req, res) => {
    const prod = await Producto.findAll().catch(err=>{
       
        res.json({mensage:"error al Consultar los Productos",err});
   });;
     res.json(prod);
}

const AgregarProducto = async(req, res) => {
     await Producto.create(  {
         nombreProd: req.body.nombre,
         modeloProd: req.body.modelo,
         precioProd: req.body.precio
       
   }).catch(err=>{
       
        res.json({mensage:"error al CREAR el producto",err});
   });;
   
    res.status(201).json({ success:"Producto creado Correctamente" });
}

const EditarProducto = async(req, res) => {
    await Producto.update({
         
         nombreProd: req.body.nombre,
         modeloProd: req.body.modelo,
         precioProd: req.body.precio
       
   },{
        where: { idProducto: req.body.id }
    }).catch(err=>{
       
        res.json({mensage:"error al EDITAR el producto",err});
   });;
   
    res.status(201).json({ success:"Producto editado Correctamente" });
}

const EliminarProducto = async (req, res) => {
         await Producto.destroy({
        where: { idProducto: req.params.id}
    }).catch(err=>{
       
        res.json({mensage:"error al ELIMINAR el producto",err});
    });
    //TODO hola
     res.status(201).json({success: 'Producto eliminado con exito'});
 }

const ConsultaID = async (req, res) => {
    const producto = await Producto.findByPk(
       req.body.id
    )
     res.status(201).json(producto);
 }

module.exports = {
    ListarProductos,
    AgregarProducto,
    EditarProducto,
    EliminarProducto,
    ConsultaID
}