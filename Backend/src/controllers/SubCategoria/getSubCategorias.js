const { SubCategoria } = require('../../db');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const getSubCategorias = async (req, res) => {
    try {
        const dbSubCategoria = await readFile('src/json/SubCategoria.json', 'utf-8');
        const dbSubCategoriaJson = JSON.parse(dbSubCategoria);
        const dbSubCategorias = dbSubCategoriaJson.subcategoria; 
        
        const existingSubCategorie = await SubCategoria.count();
        if (existingSubCategorie === 0) {
            await SubCategoria.bulkCreate(dbSubCategorias);
        }
        const subcategorias = await SubCategoria.findAll();
        res.json(subcategorias);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getSubCategorias };