import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'; //to use environment variables


const server = express();
let PORT = process.env.PORT || 3000;


server.use(express.json()) //middleware - for parsing application/json

// connected to mongoDB
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


server.get('/', (req, res) => {

  res.send('Server is running');

});
server.get('/signUp', (req, res) => {

  res.send('sign up Server is running');

});


server.post("/signUp", (req,res)=>{

  let {fullname, email, password} = req.body;


 if( fullname.length < 3){
    return  res.status(403).json({"error":"Fullname must be at least 3 letters long"})
  }
 if(!email.length < 3){
    return  res.status(403).json({"error":"Enter Email."})
  }

  return res.status(200).json({"status":"okay"})
})

server.listen(PORT, () => {
  console.log(`listening port to ${PORT}`);
});
