const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./routes/user");
require('dotenv').config()
const app = express();
app.use(cors({
    origin:["*"],
    methods:["POST","GET","PUT"],
    credentials:true
}));
app.use(express.json());
app.get('/',(req,res)=>{
    res.json("Welcome To VargatriaPattika Api! :D");
});
app.use("/users", userRouter)
const URL=process.env.CONNECTION_URL;

mongoose.connect(URL,{ dbName: "Nanna" });

app.listen(3000, () => console.log('Server running on port 3000'));
