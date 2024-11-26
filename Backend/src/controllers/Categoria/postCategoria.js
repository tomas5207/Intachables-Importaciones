const { Categoria, SubCategoria } = require('../../db');

const postCategoria = async (req, res) => {
    try {
        const { nombre, subcategorias } = req.body;

        // Verificar si la categoría ya existe
        const [categoria, created] = await Categoria.findOrCreate({
            where: { nombre },
        });

        if (!created) {
            return res.status(400).json({
                message: `La categoría '${nombre}' ya existe.`,
            });
        }

        // Si hay subcategorías en el cuerpo de la solicitud
        if (subcategorias && Array.isArray(subcategorias)) {
            for (const subNombre of subcategorias) {
                // Crear o buscar la subcategoría
                const [subCategoria] = await SubCategoria.findOrCreate({
                    where: { nombre: subNombre },
                });

                // Asociar la subcategoría con la categoría
                await categoria.addSubCategoria(subCategoria);
            }
        }

        // Obtener la categoría con sus subcategorías asociadas actualizadas
        const categoriaConSubcategorias = await Categoria.findOne({
            where: { id: categoria.id },
            include: {
                model: SubCategoria,
                through: { attributes: [] }, // Excluir columnas de la tabla intermedia
            },
        });

        res.status(201).json({
            message: 'Categoría creada con éxito',
            categoria: categoriaConSubcategorias,
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postCategoria };
