const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const port = 5000;

const app = express();
const routes = require("./routes/admin");

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

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