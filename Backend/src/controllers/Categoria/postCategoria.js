const { Categoria, SubCategoria } = require('../../db');

const postCategoria = async (req, res) => {
  const { nombre, subcategorias } = req.body;

  try {
    // Crear la nueva categoría
    const nuevaCategoria = await Categoria.create({ nombre });

    if (subcategorias && subcategorias.length > 0) {
      // Buscar o crear cada subcategoría y obtener sus instancias
      const subCategoriasCreadas = await Promise.all(
        subcategorias.map(async (subcat) => {
          const [subCategoria] = await SubCategoria.findOrCreate({
            where: { nombre: subcat }, // Busca por nombre
          });
          return subCategoria; // Devuelve la instancia de SubCategoria
        })
      );

      // Asociar las subcategorías a la nueva categoría
      await nuevaCategoria.addSubCategoria(subCategoriasCreadas); // Nota el uso del plural
    }


    res.status(201).json({
      message: "Categoría creada exitosamente",
      nuevaCategoria,
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postCategoria };
