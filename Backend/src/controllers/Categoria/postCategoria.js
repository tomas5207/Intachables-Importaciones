const { Categoria } = require('../../db');

const postCategoria = async (req, res) => {
    const { nombre } = req.body;

    try {
        // Verificar si ya existe una categoría con el mismo nombre
        const [categoria, created] = await Categoria.findOrCreate({
            where: { nombre },
        });

        if (!created) {
            return res.status(400).json({
                message: `La categoría '${nombre}' ya existe.`,
            });
        }

        res.status(201).json({
            message: "Categoría creada con éxito",
            categoria,
        });
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postCategoria };
