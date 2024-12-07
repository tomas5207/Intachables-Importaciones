const { Categoria, SubCategoria } = require('../../db');

const putCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, subcategorias } = req.body;

  try {
    const categoria = await Categoria.findByPk(id);


    if (nombre) {
      categoria.nombre = nombre;
      await categoria.save();
    }

    if (subcategorias && subcategorias.length > 0) {
      const subCategoriasActualizadas = await Promise.all(
        subcategorias.map(async (subcat) => {
          const [subCategoria] = await SubCategoria.findOrCreate({
            where: { nombre: subcat },
          });
          return subCategoria;
        })
      );

      // Actualizar asociaciones
      await categoria.setSubCategoria(subCategoriasActualizadas);
    }

    res.status(200).json({ message: "Categoría actualizada exitosamente", categoria });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { putCategoria };