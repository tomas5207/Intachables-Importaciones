const { SubCategoria } = require('../../db');

const postSubCategoria = async (req, res) => {
    const { nombre } = req.body;

    try {
        // Verificar si ya existe una subcategoría con el mismo nombre
        const [subCategoria, created] = await SubCategoria.findOrCreate({
            where: { nombre },
        });

        if (!created) {
            return res.status(400).json({
                message: `La subcategoría '${nombre}' ya existe.`
            });
        }

        res.status(201).json({
            message: 'Subcategoría creada con éxito',
            subCategoria,
        });
    } catch (error) {
        console.error('Error al crear la subcategoría:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {postSubCategoria};
