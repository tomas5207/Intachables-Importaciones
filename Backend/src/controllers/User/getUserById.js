const { User } = require('../../db');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const getUserById = async (req, res) => {
    const { id } = req.params;
    try { 
        const dbUser = await readFile('src/json/User.json', 'utf-8');
        const dbUserJson = JSON.parse(dbUser);
        const dbUsers = dbUserJson.user; 
        
        const existingUser = await User.count();
        if (existingUser === 0) {
            await User.bulkCreate(dbUsers);
        }
        const users = await User.findByPk(id);
        res.json(users);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserById };