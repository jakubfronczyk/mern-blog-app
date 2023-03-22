const { application } = require("express");
const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);
const secret = "asdsdvfdkhgjASDvfdDf312CAS2G$$#wqd@";

app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //if use credeintals you have to specifiy more info
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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
            res.cookie("token", token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        //not logged in
        res.status(400).json("wrong credentials");
    }
});

//veryfi user
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) {
                console.error(err);
                res.sendStatus(401);
            } else {
                res.json(info);
            }
        });
    } else {
        res.json({});
    }
});

//logut user, reset cookie
app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

//create post
app.post("/post", uploadMiddleware.single("img"), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    //to take author id
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, description, content } = req.body;
        const postDoc = await Post.create({
            title,
            description,
            content,
            img: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});

//edit post
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, description, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor =
            JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json("you are not the author");
        }
        await postDoc.updateOne({
            title,
            description,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    });
});

//get request on post
app.get("/post", async (req, res) => {
    const posts = await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
});

//get single post
app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
});

app.listen(4000);
//mongodb+srv://admin:sczXHmLHjLlebe80@cluster0.gvdiog7.mongodb.net/?retryWrites=true&w=majority
//
