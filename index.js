const express = require ("express");
const fs = require ("fs");
const mongoose = require("mongoose");


const app = express();
const PORT = 8000;

// connect with mongo 
mongoose.connect('mongodb://127.0.0.1:27017/app1')
.then(()=>{console.log("mongodb connected")})
.catch(err=>{console.log("error while connecting to db: ", err)})

// schema 
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String
    }
}); // now we will make a model of this schema 

const User=mongoose.model("user",userSchema);


// middleware

//p1
app.use(express.urlencoded({extended:false}));
// p2

app.use((req,res,next)=>{
    console.log("hello from middleware 1");

    req.username="varad";

    // ✅ DO NOT send a response here if you want routes to run
    next(); // to send the req further. maybe to next middleware
});

app.use((req,res,next)=>{
    console.log("hello from middleware 2");

    // ✅ don't end the response unless you want to stop the chain
    // ✅ correct usage of res.end or return a proper response
    // return res.end("hey1, ending now");  // optional
    next();
})


// importing the users data
const users = require ('./MOCK_DATA.json');


app.get('/users',(req, res)=>{
    const html=
   `
   <ul>
   ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
   </ul>
   `
   res.send(html);
});

// REST API points
app.get('/api/users',(req, res)=>{
    res.setHeader('X-myname','varad');
    console.log("im in a get route", req.username)
    return res.json(users);
});

// using dynamic path prameter
app.get('/api/users/:id',(req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id );
    return res.json(user);
});

app.post('/api/users',(req,res)=>{
    // POST : create a new user
    const body = req.body;
    users.push({...body,id:users.length +1})

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"sucess",id:users.length});
    })
});

// ✅ FIXED PATCH — you should read fields from req.body, not req.params
app.patch('/api/users/:id',(req,res)=>{
    const body = req.body;
    const id = Number(req.params.id);

    const target_user = users.find((user)=>user.id===id );

    if (!target_user) return res.json({status: "user not found"});

    // ✅ update fields safely
    if (body.gender) target_user.gender = body.gender;
    if (body.last_name) target_user.last_name = body.last_name;

    return res.json({status:"edited the user data",target_user});
})

app.delete('/api/users/:id',(req,res)=>{
    return res.json({status:"pending"});
});

app.put('/api/users/:id',(req,res)=>{
    return res.json({status:"pending"});
});

// hosting the server
app.listen(PORT,()=>{
    console.log(`############################################`)
    console.log(`server started at: http://localhost:8000/`)
    console.log(`############################################`)
});
