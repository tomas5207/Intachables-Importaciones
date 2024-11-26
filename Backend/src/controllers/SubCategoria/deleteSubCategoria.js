const { SubCategoria } = require('../../db');

const deleteSubCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSubCategoria = await SubCategoria.destroy({ where: { id } }); 
        res.json(deletedSubCategoria);
    } catch (error) {
        console.error('Error al eliminar la subcategoria:', error); 
        res.status(500).json({ error: error.message});
    }
};

module.exports = {deleteSubCategoria};