/**
 * Created by SOFTMAN on 24-04-2017.
 */
var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();
var urlizer = require("./routes/urlizer");
var shortened  = require("./routes/getShortenedUrl");

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/add", urlizer);
app.use("/s", shortened);
app.get("/red", function (req, res) {
    res.redirect("http://www.google.com")
});


app.listen(3000);