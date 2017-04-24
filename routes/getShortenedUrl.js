/**
 * Created by SOFTMAN on 24-04-2017.
 */
var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

router.route("/").get(function (req, res) {
    res.end("Works!!")
});
router.get("/:id", function (req, res) {

    var redirectUrl = {};

    var reqUrl = req.params.id;
    mongodb.connect("mongodb://localhost:27017/urlshortner", function (err, db) {
        if(err)
            throw  err
        var collection = db.collection("urlDocument");
        collection.findOne( {
            surl : "http://localhost:3000/s/"+reqUrl
        }, function (err, result) {
            if(err)
                throw  err
            console.log("Found: ",JSON.stringify(result.url))
            res.redirect("https://www.google.co.in/search?q="+JSON.stringify(result.url));
        });
        db.close();
    });


});
module.exports = router;