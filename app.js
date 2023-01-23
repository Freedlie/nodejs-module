require('dotenv').config();
const express = require('express');

const userRouter = require('/router/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users', userRouter);

app.get('/',(req,res)=>{
    res.json('Welcome');
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
})

app.listen(5000,()=>{
    console.log('server listen port 5000');
});