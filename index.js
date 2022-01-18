const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const path = require('path');
const port = 5000;

const app = express();
const routes = require("./routes/admin");
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1h expire
        sameSite: true,
        secure: false
    },
    secret: "this is a secret key",
    name: 'sid'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

mongoose.connect('mongodb+srv://user1:User1234@cluster0.cqgou.mongodb.net/Grocery?retryWrites=true&w=majority')
    .then(result => {
        console.log("Db is connected");
        app.listen(port);
        console.log("Listen port:", port);
    }).catch(err => {
        console.log(err);
    })