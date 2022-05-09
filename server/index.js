const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userRoutes } = require("./routes/auth");
const messageRoutes = require("./routes/messages");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

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