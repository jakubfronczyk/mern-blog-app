const { application } = require("express");
const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "asdsdvfdkhgjASDvfdDf312CAS2G$$#wqd@";

app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //if use credeintals you have to specifiy more info
app.use(express.json());
app.use(cookieParser());

//connect to db
mongoose.connect(
    "mongodb+srv://admin:sczXHmLHjLlebe80@cluster0.gvdiog7.mongodb.net/?retryWrites=true&w=majority"
);

//this is async function so have to use async and await
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//login authentication
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passwordCheck = bcrypt.compareSync(password, userDoc.password);
    if (passwordCheck) {
        //logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            //every time request send it as cookie
            res.cookie("token", token).json("successful");
        });
    } else {
        //not logged in
        res.status(400).json("wrong credentials");
    }
});

//veryfi user
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

//logut user, reset cookie
app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

app.listen(4000);
//mongodb+srv://admin:sczXHmLHjLlebe80@cluster0.gvdiog7.mongodb.net/?retryWrites=true&w=majority
//