const { Producto, Categoria, SubCategoria } = require('../../db');

const postProducto = async (req, res) => {
    const { nombre, imagen, descripción, codigo, precio, descuento, porcentaje_descuento, CategoriaId, SubCategoriaId } = req.body;

    try {
        // Validar categoría existente
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

        // Si el producto no tiene descuento, establecer porcentaje_descuento en null
        const porcentajeDescuentoFinal = descuento ? porcentaje_descuento : null;

        // Crear el producto
        const producto = await Producto.create({
            nombre,
            imagen,
            descripción,
            codigo,
            precio,
            descuento,
            porcentaje_descuento: porcentajeDescuentoFinal,
            CategoriaId,
            SubCategoriaId,
        });

        res.status(201).json({
            message: 'Producto creado con éxito',
            producto,
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postProducto };
