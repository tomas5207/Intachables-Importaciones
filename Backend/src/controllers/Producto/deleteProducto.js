const { Producto } = require('../../db');


const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Producto.destroy({ where: { id } }); 
        res.json(deletedProduct);
    } catch (error) {
        console.error('Error al eliminar el producto:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = {deleteProducto};