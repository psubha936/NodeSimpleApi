
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

const product_routers = require('./routes/product')
const connectDb = require('./db/connect')

const PORT = process.env.PORT || 5000 ;

app.use(cors());


app.get("/",(req ,res)=>{
    res.send("Hi i'm here")
})


// Create a schema for the data
const guestSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true, // Add unique constraint
    },
    guests: Number,
    attendance: String,
    message: String
  });
  
  // Create a model based on the schema
  const Guest = mongoose.model('Guest', guestSchema);

//middleware

app.use("/api/products",product_routers)
app.use(express.json())

app.post('/api/products/guests', async (req, res) => {
    const { name, email, guests, attendance, message } = req.body;
  
    try {
      // Check if the email already exists
      const existingGuest = await Guest.findOne({ email: email });
  
      if (existingGuest) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Create a new guest document
      const newGuest = new Guest({
        name,
        email,
        guests,
        attendance,
        message
      });
  
      // Save the guest to the database
      await newGuest.save();
      res.status(201).json({ message: 'Guest created successfully' });
    } catch (error) {
      console.error('Error saving guest:', error);
      res.status(500).json({ error: 'Failed to save guest' });
    }
  });


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