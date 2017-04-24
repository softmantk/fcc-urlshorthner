/**
 * Created by SOFTMAN on 24-04-2017.
 */
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var murl = "mongodb://localhost:27017/urlshortner"



var router = express.Router();


router.route('/')
    .get(function (req, res) {
        res.sendFile("E:/WORKSPACE/TUT/WEB DEVELOPMENT/MEAN/FREECODECAMP/NODE/fcc-urlshortner/public/index.html");
    });
router.route('/:id*')
    .get(function (req, res) {

        var url = parseInt(req.params.id);


        mongodb.connect(murl, function (err, db) {
            if(err)
                throw err
           var collection =  db.collection("urlDocument");

            var entry = {
                url: url,
                surl : "http://localhost:3000/s/"+Math.floor(Math.random()*(9999 - 1000 + 1) + 1000)
            };

           collection.insertOne(entry, function (err) {
                        if(err)
                            console.log("ERROR ERROR\n"+err);
                        db.close();
                    }
           );

            collection.findOne({url: url}, function (err, result) {
                if (err)
                    throw  err
                var response  = {
                    url : result.url,
                    shortened_url: result.surl
                }
                res.send(response)
                db.close();
            });

        });

    });
module.exports = router;
/*
collection.findOne({
    surl : surl
}, function (err, result) {
    if(err) {
        console.log("ERROR");
        throw err;

    }
    if(result) {
        //already exist
        console.log("already exist: ", result);

        db.close();
        // res.redirect("http://www.google.com")
    } else {
        console.log(surl+" :not exist");*/
