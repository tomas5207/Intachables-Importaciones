const { SubCategoria } = require('../../db');

const putSubCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const updatedSubCategoria = await SubCategoria.update({ nombre }, { where: { id } }); 
        res.json(updatedSubCategoria);
    } catch (error) {
        console.error('Error al actualizar la subcategoria:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { putSubCategoria };