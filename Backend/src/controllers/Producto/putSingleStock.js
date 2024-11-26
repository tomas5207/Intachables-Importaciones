const { Producto } = require('../../db');

const putSingleStock = async (req, res) => {
    const { id } = req.params; // ID del producto desde la URL
    const { cantidadComprada } = req.body; // Cantidad que se desea restar del stock

    try {
        // Buscar el producto por su ID
        const producto = await Producto.findByPk(id);

        // Verificar si el producto existe
        if (!producto) {
            return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }

        // Verificar si hay suficiente stock para realizar la compra
        if (producto.stock < cantidadComprada) {
            return res.status(400).json({
                message: `Stock insuficiente para el producto con ID ${id}. Stock actual: ${producto.stock}.`,
            });
        }

        // Actualizar el stock del producto
        producto.stock -= cantidadComprada;
        await producto.save();

        res.json({
            message: 'Stock actualizado con éxito',
            producto: {
                id: producto.id,
                nombre: producto.nombre,
                stock: producto.stock,
            },
        });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { putSingleStock };
