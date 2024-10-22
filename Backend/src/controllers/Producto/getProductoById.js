const { Producto } = require('../../db');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const dbProducto = await readFile('src/json/Producto.json', 'utf-8');
        const dbProductoJson = JSON.parse(dbProducto);
        const dbProductos = dbProductoJson.producto; 
        
        const existingProduct = await Producto.count();
        if (existingProduct === 0) {
            await Producto.bulkCreate(dbProductos);
        }
        const productos = await Producto.findByPk(id);
        res.json(productos);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProductoById };