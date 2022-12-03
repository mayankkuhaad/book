
const express = require("express");

const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const connect = require("./connection/connect");
var jwt = require('jsonwebtoken');
const secret = "RESTAPI";
var cors = require("cors");
const app = express();
app.use(cors());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

})

// CRUD -- CREATE , READ, UPDATE, DELETE


app.use("/api/v1/posts", (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        console.log("Verify token");
        if (token) {        // verify a token symmetric
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    console.log(err);
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    })
                }
                req.user = decoded.data;
                next();
            });
        } else {
            return res.status(403).json({
                status: "failed",
                message: "Invalid token"
            })
        }
    }else {
        return res.status(403).json({ status: "Failed", 
        message : "Not authenticated user"});
    }
})


app.use("/api/v1", loginRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Ok");
});

app.listen(9000, () => console.log("The server is up at 9000 port"));