const express = require('express');
const {fileServices} = require('./services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req,res)=>{
    const users = await fileServices.reader();
    res.json(users)
})

app.get('/users/:userId',async (req,res)=>{

    const users = await fileServices.reader();

    const {userId} = req.params;

    if(userId > users.length - 1){
        res.json('not found');
    } else{
        res.json(users[userId - 1]);
    }

})

app.post('/users', async(req,res)=>{
    const userInfo = req.body;

    const users = await fileServices.reader()

    if(typeof userInfo.name !== "string" || typeof +userInfo.age !== "number"){
        return  res.status(400).json('invalid data');
    }

    const newUser = {
        name: userInfo.name,
        age: userInfo.age,
        id: users[users.length - 1].id +1
    }
    users.push(newUser);

    await fileServices.writer(users);

    res.status(201).json(newUser)

})

app.put('/users/:userId',async (req,res)=>{
    const {userId} = req.params;

    const users = await fileServices.reader();

    const newUserInfo = req.body;

    if(userId > users.length - 1){
        return res.json('not found');
    }
    if(typeof newUserInfo.name !== "string" || typeof +newUserInfo.age !== "number"){
        return res.status(400).json('invalid data');
    }

    const updateUser = users[userId] = newUserInfo;


})

app.delete('/users/:userId', async (req,res)=>{
    const {userId} = req.params;

    const users = await fileServices.reader();

    users.splice(userId, 1);

    await fileServices.writer(users);

    res.json('deleted')
})

app.listen(5000,()=>{
    console.log('server listen 5000');
});




