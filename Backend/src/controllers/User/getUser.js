const { User } = require('../../db');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const getUser = async (req, res) => {
    try {
        const dbUser = await readFile('src/json/User.json', 'utf-8');
        const dbUserJson = JSON.parse(dbUser);
        const dbUsers = dbUserJson.user; 
        
        const existingUser = await User.count();
        if (existingUser === 0) {
            await User.bulkCreate(dbUsers);
        }
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUser };