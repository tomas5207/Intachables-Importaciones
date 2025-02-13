const { SubCategoria, Categoria } = require('../../db');

const putSubCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, categorias } = req.body;

  try {
    const subcategoria = await SubCategoria.findByPk(id);

    
    if (nombre) {
      subcategoria.nombre = nombre;
      await subcategoria.save();
    }

    if (categorias && categorias.length > 0) {
      const categoriasActualizadas = await Promise.all(
        categorias.map(async (cat) => {
          const [categoria] = await Categoria.findOrCreate({
            where: { nombre: cat },
          });
          return categoria;
        })
      );

      // Actualizar asociaciones
      await subcategoria.setCategoria(categoriasActualizadas);
    }

    res.status(200).json({
      message: "SubCategoría actualizada exitosamente",
      subcategoria,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { putSubCategoria };
