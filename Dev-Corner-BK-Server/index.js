import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';


const server = express();

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



server.post("/signUp", (req,res)=>{
  res.json(req.body)
})


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening port to ${PORT}`);
});
