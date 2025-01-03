const server = require('./src/server');
const { database } = require('./src/db');
const loadAdminUser = require('./src/loadAdminUser');

const PORT = 5000;

database.sync({ alter: true }).then(async () => {
    await loadAdminUser(); 
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log(error));
