const { SubCategoria, Categoria } = require('../../db');

const postSubCategoria = async (req, res) => {
    const { nombre, categorias } = req.body;

    try {
        // Crear la nueva subcategoría
        const nuevaSubCategoria = await SubCategoria.create({ nombre });

        if (categorias && categorias.length > 0) {
            // Buscar o crear cada categoría y obtener sus instancias
            const categoriasCreadas = await Promise.all(
                categorias.map(async (cat) => {
                    const [categoria] = await Categoria.findOrCreate({
                        where: { nombre: cat }, // Busca por nombre
                    });
                    return categoria; // Devuelve la instancia de Categoria
                })
            );

            // Asociar las categorías a la nueva subcategoría
            await nuevaSubCategoria.addCategoria(categoriasCreadas); // Nota el uso del plural
        }

        res.status(201).json({
            message: "SubCategoría creada exitosamente",
            nuevaSubCategoria,
        });
    } catch (error) {
        console.error("Error al crear la subcategoría:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postSubCategoria };
