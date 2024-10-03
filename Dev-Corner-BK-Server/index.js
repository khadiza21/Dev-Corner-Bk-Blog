import express from "express";
import mongoose from "mongoose";
import "dotenv/config"; //to use environment variables
import bcrypt from "bcryptjs";

// user import from Schema
import User from "./Schema/User.js";
import { nanoid } from "nanoid";

const server = express();
let PORT = process.env.PORT || 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json()); //middleware - for parsing application/json

// connected to mongoDB
mongoose
  .connect(process.env.DB_LOCATION, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  // Check if the username already exists
  let isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  // If not unique, append a random 5-character string
  isUsernameNotUnique ? username += nanoid().substring(0,5) : "";

  return username;
};

server.get("/", (req, res) => {
  res.send("Server is running");
});
server.get("/signUp", (req, res) => {
  res.send("sign up Server is running");
});

server.post("/signUp", (req, res) => {
  let { fullname, email, password } = req.body;

  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 letters long" });
  }

  if (email.length < 3) {
    return res.status(403).json({ error: "Enter Email." });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20  characters long with a numeric, 1 lowercase and 1 uppercase letter.",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email);

    // create user object
    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username },
    });
    user
      .save()
      .then((u) => {
        return res.status(200).json({ user: u });
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: "Email already exists. " });
        }

        return res.status(500).json({ error: err.message });
      });

    console.log(hashed_password);
  });
});

server.listen(PORT, () => {
  console.log(`listening port to ${PORT}`);
});
