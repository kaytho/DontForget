var express = require('express');
var router = express.Router();
var momentTimeZone = require('moment-timezone');
var moment = require('moment');
var Text = require('../models/text');


var getTimeZones = function() {
    return momentTimeZone.tz.names();
};

// GET: /appointments
router.get('/', function(req, res, next) {
    console.log('Text: here i am');
    // res.render('appointments/index', { title: "Never"});

    Text.find({}, function(err, texts) {
      console.log('Text: after find');
            if (err) {
                console.log(err);
                res.send("Text find: Not working");
            } else {
                console.log("Text.find success: " + texts);
                res.render('./appointments/benice', { texts: texts, title: 'DontForget', timeZones: getTimeZones() });
            }
        });
});

// GET: /appointments/create
router.get('/create', function(req, res, next) {
    res.render('appointments/create', { timeZones: getTimeZones(), text: new Text({ name: "", phoneNumber: "", notification: '', timeZone: "", time: '' }) });
});

// POST: /texts
router.post('/', function(req, res, next) {
    var name = req.body.name;
    var phoneNumber = req.body.phoneNumber;
    var message = req.body.message;
    var notification = req.body.notification;
    var timeZone = req.body.timeZone;
    // var time = moment(req.body.time, "MM-DD-YYYY hh:mma");
    var listOfTexts= req.body.text;

    var text = new Text({ name: name, phoneNumber: phoneNumber, message: message, notification: notification,  timeZone: timeZone });
    //console.log("TEXT: " + text);
    text.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            //console.log('Text save success');
            res.redirect('/benice');
        }
    });

});

// GET: /appointments/:id/edit
router.get('/:id/edit', function(req, res, next) {
    var id = req.params.id;
    Text.findOne({ _id: id });
    if (function(text) {
            res.render('appointments/edit', { timeZones: getTimeZones(), text: text });
        });
});

// POST: /appointments/:id/edit
router.post('/:id/edit', function(req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var phoneNumber = req.body.phoneNumber;
    var notification = req.body.notification;
    var timeZone = req.body.timeZone;
    var time = moment(req.body.time, "MM-DD-YYYY hh:mma");

    Text.findOne({ _id: id }, function(err, text) {
        if (err) {
            console.log('error');
        } else {
            text.name = name;
            text.phoneNumber = phoneNumber;
            text.notification = notification;
            text.timeZone = timeZone;
            text.time = time;


            text.save(function(err) {
                if (err) {
                    console.log('error');
                } else {
                    console.log('success');
                    res.redirect('/benice');
                }
            });

        }
    });

});


// POST: /appointments/:id/delete
router.post('/:id/delete', function(req, res, next) {
    var id = req.params.id;

    Text.remove({ _id: id }, function(err){
        if(err){
            console.log(err);
        }else{
          res.redirect('/benice');
        }
    });
});

module.exports = router;
