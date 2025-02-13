const { Categoria } = require('../../db');

const putCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const updatedCategoria = await Categoria.update(
      { nombre },
      { where: { id } }
    );

    res.json(updatedCategoria);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { putCategoria };
