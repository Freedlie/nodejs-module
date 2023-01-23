const fs = require('fs/promises');
const path = require('path');

const pathTOFile = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    reader: async () =>{
        const buffer = await fs.readFile(pathTOFile);
        return JSON.parse(buffer.toString());
    },
    writer:async (users)=>{
        await fs.writeFile(pathTOFile, JSON.stringify(users));
    }
}