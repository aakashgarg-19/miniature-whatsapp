const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => {
    console.log("DB connection seccessful");
}).catch((err)=>{
    console.log(err.messageS);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})