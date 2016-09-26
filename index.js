"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// 验证用户名和密码
// 为了简便，只要是真值就通过
let authenticate = function (username, password) {
    return !!username && !!password;
};

app.post("/signin", bodyParser.json(), (req, res, next) => {
    if (authenticate(req.body.username, req.body.password)) {
        // 验证通过，返回用户信息
        res.status(200).json({
            username: req.body.username,
            more: "No more information"
        });
    } else {
        // 验证失败
        res.sendStatus(403);
    }
});

app.use(express.static("./public"));
app.get("/*", (req, res, next) => {
    res.sendFile(__dirname + "/public/index.html");
});
const server = app.listen(process.env.PORT || 80, () => {
    let address = server.address();
    console.log(`Port: ${address.port}`);
});