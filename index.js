const express = require ("express");
const fs = require ("fs");
const userRouter = require('./routes/user.js')
const {logReqRes} = require('./middlewares/index.js');
const {connectMongoDB} = require('./connection.js')

const app = express();
const PORT = 8000;


//Connection 
connectMongoDB('mongodb://127.0.0.1:27017/app1').then(()=>{console.log("mongo db connected")});

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logReqRes("log.txt"));

// routes 
app.use('/api/user',userRouter); // whenever someone req on /user then express will use userRouter

// importing the users data
//const users = require ('./MOCK_DATA.json');

// hosting the server
app.listen(PORT,()=>{
    console.log(`############################################`)
    console.log(`server started at: http://localhost:8000/`)
});
