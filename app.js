
require("dotenv").config();
const express = require('express');

const app = express();

const product_routers = require('./routes/product')
const connectDb = require('./db/connect')

const PORT = process.env.PORT || 5000 ;

app.get("/",(req ,res)=>{
    res.send("Hi i'm here")
})

//middleware

app.use("/api/products",product_routers)

const start = async () =>{
    try{
        await connectDb(process.env.MONGODB_URL);
        app.listen(PORT , ()=>{
            console.log(`Server is running on port ${PORT}`); 
        });
    }catch(error){
        console.log(error);
    }
}

start();