/**
 * Created by SOFTMAN on 24-04-2017.
 */
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var murl = "mongodb://admin:admin@ds117251.mlab.com:17251/softmandb"



var router = express.Router();


router.route('/')
    .get(function (req, res) {
        res.send("Visit https://s4o.herokuapp.com");
    });
router.route('/:id*')
    .get(function (req, res) {

        var url = req.url.substring(1);

        console.log("url : "+ url);


        mongodb.connect(murl, function (err, db) {
            if(err)
                throw err
           var collection =  db.collection("urlDocument");

            var entry = {
                url: url,
                surl : "https://s4o.herokuapp.com/s/"+Math.floor(Math.random()*(9999 - 1000 + 1) + 1000)
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
