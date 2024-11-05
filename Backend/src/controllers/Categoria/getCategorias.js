const { Categoria } = require('../../db');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const getCategorias = async (req, res) => {
    try {
        const dbCategoria = await readFile('src/json/Categoria.json', 'utf-8');
        const dbCategoriaJson = JSON.parse(dbCategoria);
        const dbCategorias = dbCategoriaJson.categoria; 
        
        const existingCategorie = await Categoria.count();
        if (existingCategorie === 0) {
            await Categoria.bulkCreate(dbCategorias);
        }
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCategorias };