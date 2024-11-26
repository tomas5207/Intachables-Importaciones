const { Categoria, SubCategoria } = require('../../db');

const putCategoria = async (req, res) => {
    const { id } = req.params; // ID de la categoría a actualizar
    const { nombre, subcategorias } = req.body; // `subcategorias` es un array de IDs

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Actualizar el nombre de la categoría
        if (nombre) {
            await categoria.update({ nombre });
        }

        // Asociar las subcategorías
        if (subcategorias) {
            const subCategoriasExistentes = await SubCategoria.findAll({
                where: { id: subcategorias },
            });

            if (subCategoriasExistentes.length !== subcategorias.length) {
                return res.status(400).json({ 
                    message: 'Algunas subcategorías no existen en la base de datos' 
                });
            }

            // Actualizar asociaciones
            await categoria.setSubCategorias(subCategoriasExistentes);
        }

        // Retornar la categoría actualizada con las subcategorías asociadas
        const categoriaActualizada = await Categoria.findByPk(id, {
            include: {
                model: SubCategoria,
                through: { attributes: [] },
            },
        });

        res.json(categoriaActualizada);
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { putCategoria };
