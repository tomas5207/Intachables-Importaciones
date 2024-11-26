const { Categoria } = require('../../db');

const deleteCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategorie = await Categoria.destroy({ where: { id } });
        res.json(deletedCategorie);
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteCategoria };