const server = require('./src/server');
const {database} = require('./src/db');
const PORT = 5000;

database.sync({force: true}).then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => console.log(error));