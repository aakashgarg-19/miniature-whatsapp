const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const { userRoutes } = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");
require('./passport');


const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => {
    console.log("DB connection seccessful");
}).catch((err)=>{
    console.log(err);
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions",
        stringify: false,
    }),
    cookie: {
        // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
  
global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});