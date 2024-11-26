const { Producto } = require('../../db');

const putStock = async (req, res) => {
    const { productos } = req.body; // Arreglo de productos: [{ id, cantidadComprada }, ...]

    try {
        if (!productos || !Array.isArray(productos)) {
            return res.status(400).json({ message: 'Debe proporcionar un arreglo de productos con sus cantidades' });
        }

        const resultados = [];
        for (const item of productos) {
            const { id, cantidadComprada } = item;

            // Validar que los datos sean correctos
            if (!id || cantidadComprada == null || cantidadComprada < 0) {
                return res.status(400).json({
                    message: 'Cada producto debe tener un id válido y una cantidad positiva',
                });
            }

            // Buscar el producto por ID
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
            }

            // Verificar que haya suficiente stock
            if (producto.stock < cantidadComprada) {
                return res.status(400).json({
                    message: `Stock insuficiente para el producto con ID ${id}. Stock actual: ${producto.stock}`,
                });
            }

            // Actualizar el stock del producto
            producto.stock -= cantidadComprada;
            await producto.save();

            resultados.push({ id: producto.id, stockActual: producto.stock });
        }

        res.json({
            message: 'Stock actualizado con éxito',
            productos: resultados,
        });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { putStock };
