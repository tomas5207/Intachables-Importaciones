const { User } = require('./db');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const loadAdminUser = async () => {
    try {
        const dbUser = await readFile('src/json/User.json', 'utf-8');
        const dbUserJson = JSON.parse(dbUser);
        const adminUser = dbUserJson.user[0];

        // Verifica si el usuario ya existe
        const existingAdmin = await User.findOne({ where: { email: adminUser.email } });

        if (!existingAdmin) {
            await User.create({
                email: adminUser.email,
                password: adminUser.password,
                rol: adminUser.rol
            });
            console.log('Usuario admin creado exitosamente');
        } else {
            console.log('Usuario admin ya existe');
        }
    } catch (error) {
        console.error('Error al cargar el usuario admin:', error);
    }
};

module.exports = loadAdminUser;
