const { Categoria, SubCategoria } = require('../../db');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const getCategorias = async (req, res) => {
    try {
        const dbCategoria = await readFile('src/json/Categoria.json', 'utf-8');
        const dbCategoriaJson = JSON.parse(dbCategoria);
        const dbCategorias = dbCategoriaJson.categoria; // Aquí tienes categorías con subcategorías

        // Verificar si ya existen categorías
        const existingCategorie = await Categoria.count();
        if (existingCategorie === 0) {
            for (const catData of dbCategorias) {
                // Crear o buscar categoría
                const [categoria] = await Categoria.findOrCreate({
                    where: { nombre: catData.nombre }
                });

                // Crear o buscar y asociar subcategorías
                if (catData.subcategorias && catData.subcategorias.length > 0) {
                    for (const subNombre of catData.subcategorias) {
                        const [subCategoria] = await SubCategoria.findOrCreate({
                            where: { nombre: subNombre }
                        });
                        await categoria.addSubCategoria(subCategoria); // Asociar subcategorías a la categoría
                    }
                }
            }
        }

        // Traer todas las categorías con sus subcategorías relacionadas
        const categorias = await Categoria.findAll({
            include: {
                model: SubCategoria,
                through: { attributes: [] }, // Excluir columnas de la tabla intermedia
            },
        });

        res.json(categorias);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCategorias };
