const { Producto, Categoria, SubCategoria } = require('../../db');

const putProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen, descripción, codigo, precio, descuento, porcentaje_descuento, favorito,CategoriaId, SubCategoriaId } = req.body;

    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Validar la nueva categoría, si se proporciona
        if (CategoriaId) {
            const categoria = await Categoria.findByPk(CategoriaId, {
                include: SubCategoria,
            });

            if (!categoria) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            if (!categoria.SubCategoria || categoria.SubCategoria.length === 0) {
                return res.status(400).json({ 
                    message: 'La categoría seleccionada no tiene subcategorías asociadas' 
                });
            }

            producto.CategoriaId = CategoriaId; // Cambiar la categoría asociada
        }

        // Si el descuento es false, poner porcentaje_descuento en null
        const porcentajeDescuentoFinal = descuento ? porcentaje_descuento : null;

        // Actualizar los campos del producto
        await producto.update({
            nombre,
            imagen,
            descripción,
            codigo,
            precio,
            descuento,
            porcentaje_descuento: porcentajeDescuentoFinal,
            favorito,
            CategoriaId,
            SubCategoriaId,
        });

        // Retornar el producto actualizado con la nueva categoría
        const productoActualizado = await Producto.findByPk(id, {
            include: {
                model: Categoria,
                include: SubCategoria,
            },
        });

        res.json({
            message: 'Producto actualizado con éxito',
            producto: productoActualizado,
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { putProducto };
