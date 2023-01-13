const express = require('express');
const userDB = require('./dataBase/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/users',(req,res)=>{

    res.json(userDB)
})

app.get('/users/:userId',(req,res)=>{

    const {userId} = req.params;

    if(userId > userDB.length - 1){
        res.json('not found');
    } else{
        res.json(userDB[userId]);

    }

})

app.post('/users',(req,res)=>{
    const userInfo = req.body;

    if(typeof userInfo.name === "string" || typeof userInfo.age === "number"){
        userDB.push(userInfo);

        res.status(201).json('created');
    }else{
        res.status(101).json('invalid data');
    }

})

app.put('/users/:userId',(req,res)=>{
    const {userId} = req.params;

    const newUserInfo = req.body;

    if(userId > userDB.length - 1){
        res.json('not found');
    }
    else if(typeof newUserInfo.name === "string" || typeof newUserInfo.age === "number"){
        userDB[userId] = newUserInfo;
        res.json('updated')
    }
    else{
        res.status(101).json('invalid data');
    }


})

app.delete('/users/:userId',(req,res)=>{
    const {userId} = req.params;

    userDB[userId] = null;

    res.json('deleted')
})

app.listen(5000,()=>{
    console.log('server listen 5000');
});


