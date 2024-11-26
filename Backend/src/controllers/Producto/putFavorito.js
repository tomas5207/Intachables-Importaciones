const { Producto } = require('../../db');

const putFavorito = async (req, res) => {
    const { id } = req.params;
    const { favorito } = req.body;

    try {
        // Buscar el producto por ID
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }

        // Actualizar el estado de favorito del producto
        producto.favorito = favorito;
        await producto.save();

        res.json({
            message: 'Favorito actualizado con éxito',
            producto: { id: producto.id, favorito: producto.favorito },
        });
    } catch (error) {
        console.error('Error al actualizar el favorito:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { putFavorito };
