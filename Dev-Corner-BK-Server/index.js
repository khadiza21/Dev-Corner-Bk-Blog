import express from "express";

const server = express();

let PORT = 4000;

server.listen(PORT, () => {
  console.log("listening port " + PORT);
});
