const express = require("express");
const cors = require("cors"); 
const dotenv=require("dotenv");
const routes = require("./Routes/routes.js");
const dbConnector = require("./connection.js");



dotenv.config();

const app = express(); 

const PORT = process.env.PORT || 8080;



app.use(express.json({ limit: "16mb" }));

app.use(express.urlencoded({ extended: true, limit: "16mb" }));

app.use(cors());

dbConnector(); 

app.get('/',(req,res)=>{ 
    res.send("Welcome to  moments API");
})

app.use("/posts", routes);

app.listen(PORT, () => console.log("App Running on", PORT));
