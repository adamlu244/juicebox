const express =require("express");
const server = express();

// function which logs out the incoming requests
const morgan = require("morgan");
server.use(morgan("dev"));

// function which will read incoming JSON from requests
server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);

const { client } = require("./db");
client.connect();

const PORT = 3000;
server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
});

