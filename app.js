const fs = require('node:fs');

fs.readdir('./boys',(err, files)=>{
    for (const fileName of files) {
        fs.stat(`./boys/${fileName}`,(err, stats)=>{
            if(stats.isFile()){
                fs.readFile(`./boys/${fileName}`,(err, data)=>{
                    if(JSON.parse(data).gender === 'female'){
                        fs.rename(`./boys/${fileName}`, `./girls/${fileName}`,()=>{})
                    }
                })
            }
        })
    }
});

fs.readdir('./girls',(err, files)=>{
    for (const fileName of files) {
        fs.stat(`./girls/${fileName}`,(err, stats)=>{
            if(stats.isFile()){
                fs.readFile(`./girls/${fileName}`,(err, data)=>{
                    if(JSON.parse(data).gender === 'male'){
                        fs.rename(`./girls/${fileName}`, `./boys/${fileName}`,()=>{})
                    }
                })
            }
        })
    }
});