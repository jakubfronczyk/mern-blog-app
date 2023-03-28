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
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "/tmp" });
const fs = require("fs");
const dotenv = require("dotenv");

const salt = bcrypt.genSaltSync(10);
const secret = "asdsdvfdkhgjASDvfdDf312CAS2G$$#wqd@";
const bucket = "kordylas-blog-app";

app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //if use credeintals you have to specifiy more info
app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: "../.env" });

// //connect to db
// mongoose.connect(process.env.MONGO_URL);

//update files to aws s3 bucket
async function uploadToS3(path, originalFileName, mimetype) {
    const client = new S3Client({
        region: "eu-north-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const parts = originalFileName.split(".");
    const ext = parts[parts.length - 1];
    const newFileName = Date.now() + "." + ext;
    const data = await client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Body: fs.readFileSync(path),
            Key: newFileName,
            ContentType: mimetype,
            ACL: "public-read",
        })
    );
    return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
}

//this is async function so have to use async and await
app.post("/api/register", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
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
app.post("/api/login", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
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
app.get("/api/profile", (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
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
app.post("/api/logout", (req, res) => {
    res.cookie("token", "").json(true);
});

//create post
app.post("/api/post", uploadMiddleware.single("img"), async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { originalname, path, mimetype } = req.file;
    const url = await uploadToS3(path, originalname, mimetype);
    //to take author id
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, description, content } = req.body;
        const postDoc = await Post.create({
            title,
            description,
            content,
            img: url,
            author: info.id,
        });
        res.json(postDoc);
    });
});

//edit post
app.put("/api/post", uploadMiddleware.single("file"), async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    let newPath = null;
    if (req.file) {
        const { originalname, path, mimetype } = req.file;
        newPath = await uploadToS3(path, originalname, mimetype);
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
            img: newPath ? newPath : postDoc.img,
        });

        res.json(postDoc);
    });
});

//get request on post
app.get("/api/post", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const posts = await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
});

//get single post
app.get("/api/post/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
});

app.listen(4000);
