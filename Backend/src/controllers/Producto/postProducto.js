const { Producto, Categoria, SubCategoria } = require('../../db');

const postProducto = async (req, res) => {
    const { nombre, imagen , descripcion , color , codigo ,precio, stock , favorito,CategoriaId, SubCategoriaId } = req.body;

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

        // Crear el producto
        const producto = await Producto.create({
            nombre,
            imagen,
            descripcion,
            color,
            codigo,
            precio,
            stock,
            favorito,
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
