var mongoose = require('mongoose');
var moment = require('moment');
var cfg = require('../config');
var twilio = require('twilio');

var TextSchema = new mongoose.Schema({
  name:String,
  message: String,
  phoneNumber: String,
  notification : Number,
  timeZone : String,
  time : {type : Date, index : true}
});

TextSchema.methods.requiresNotification = function (date) {
  return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};

TextSchema.statics.sendNotifications = function(callback) {
//now
  var searchDate = new Date();
  Text
    .find()
    .then(function (texts) {
      texts = texts.filter(function(text) {
              return text.requiresNotification(searchDate);
        });
        if (texts.length > 0) {
          sendNotifications(texts);
        }
      });

    // Send messages to all appoinment owners via Twilio
    function sendNotifications(docs) {
        var client = new twilio.RestClient(cfg.twilioAccountSid, cfg.twilioAuthToken);
        docs.forEach(function(text) {
            // Create options to send the message
            var options = {
                to: "+1" + text.phoneNumber,
                from: cfg.twilioPhoneNumber,
                body: "" + text.name + " . " + text.message
            };

            // Send the message!
            client.sendMessage(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    var masked = text.phoneNumber.substr(0,
                        text.phoneNumber.length - 5);
                    masked += '*****';
                    console.log('Message sent to ' + masked);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call(this);
        }
    }
};


var Text = mongoose.model('text', TextSchema);
module.exports = Text;
