// var mongoose = require('mongoose');
// var moment = require('moment');
// var cfg = require('../config');
// var twilio = require('twilio');
//
// var AppointmentSchema = new mongoose.Schema({
//   name:String,
//   message: String,
//   phoneNumber: String,
//   notification : Number,
//   timeZone : String,
//   time : {type : Date, index : true}
// });
//
// AppointmentSchema.methods.requiresNotification = function (date) {
//   console.log("AppointmentSchema.methods.requiresNotification");
//
//   return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
//                           .diff(moment(date).utc())
//                         ).asMinutes()) === this.notification;
// };
//
// AppointmentSchema.statics.sendNotifications = function(callback) {
//   console.log("AppointmentSchema.statics.sendNotifications");
//
//   // now
//   var searchDate = new Date();
//   Appointment
//     .find()
//     .then(function (appointments) {
//       // if(err){
//       //   console.log(err);
//       // }else{
//         appointments = appointments.filter(function(appointment) {
//               return appointment.requiresNotification(searchDate);
//         });
//         if (appointments.length > 0) {
//           sendNotifications(appointments);
//       }
//     });
//
//     // Send messages to all appoinment owners via Twilio
//     function sendNotifications(docs) {
//       console.log("Appointment.sendNotifications");
//         var client = new twilio.RestClient(cfg.twilioAccountSid, cfg.twilioAuthToken);
//         docs.forEach(function(appointment) {
//             // Create options to send the message
//             var options = {
//                 to: "+1" + appointment.phoneNumber,
//                 from: cfg.twilioPhoneNumber,
//                 body: "Hi " + appointment.name + ". Just a reminder that you have an appointment coming up  " + moment(appointment.time).calendar() +"."
//             };
//
//             // Send the message!
//             client.sendMessage(options, function(err, response) {
//                 if (err) {
//                     // Just log it for now
//                     console.error(err);
//                 } else {
//                     // Log the last few digits of a phone number
//                     var masked = appointment.phoneNumber.substr(0,
//                         appointment.phoneNumber.length - 5);
//                     masked += '*****';
//                     console.log('Message sent to ' + masked);
//                 }
//             });
//         });
//
//         // Don't wait on success/failure, just indicate all messages have been
//         // queued for delivery
//         if (callback) {
//           callback.call(this);
//         }
//     }
// };
//
//
// var Appointment = mongoose.model('appointment', AppointmentSchema);
// module.exports = Appointment;
//
//
// //TextSchema
//
// var mongoose = require('mongoose');
// var moment = require('moment');
// var cfg = require('../config');
// var twilio = require('twilio');
//
// var TextSchema = new mongoose.Schema({
//   name:String,
//   message: String,
//   phoneNumber: String,
//   notification : Number,
//   timeZone : String,
//   time : {type : Date, index : true}
// });
//
//
// TextSchema.methods.requiresNotification = function (date) {
// console.log("TextSchema.methods.requiresNotification");
// // var notificationTime = new Date();
// // console.log("notificationTime: " + notificationTime);
//
//   return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
//                           .diff(moment(date).utc())
//                         ).asMinutes()) === this.notification;
// };
//
// TextSchema.statics.sendNotifications = function(callback) {
// console.log("TextSchema.statics.sendNotifications");
//   // now
//   var searchDate = new Date();
//   Text
//     .find(function (err, texts) {
//       if(err){
//         // console.log("Text: there was an error searching for Text objects in db");
//         // console.log(err);
//       }else{
//         console.log("Text: We should be calling requiresNotification at least once now.")
//         texts = texts.filter(function(text) {
//               return text.requiresNotification(searchDate);
//         });
//         if (texts.length > 0) {
//           sendNotifications(texts);
//         }
//       }
//     });
//
//     // Send messages to all appoinment owners via Twilio
//     function sendNotifications(docs) {
//       console.log('Text.sendNotifications');
//         var client = new twilio.RestClient(cfg.twilioAccountSid, cfg.twilioAuthToken);
//         docs.forEach(function(text) {
//             // Create options to send the message
//             var options = {
//                 to: "+1" + text.phoneNumber,
//                 from: cfg.twilioPhoneNumber,
//                 body: "Hi " + text.name + " . " + text.message
//             };
//
//             // Send the message!
//             client.sendMessage(options, function(err, response) {
//                 if (err) {
//                     // Just log it for now
//                     console.error(err);
//                 } else {
//                     // Log the last few digits of a phone number
//                     var masked = text.phoneNumber.substr(0,
//                         text.phoneNumber.length - 5);
//                     masked += '*****';
//                     console.log('Message sent to ' + masked);
//                 }
//             });
//         });
//
//         // Don't wait on success/failure, just indicate all messages have been
//         // queued for delivery
//         if (callback) {
//           callback.call(this);
//         }
//     }
// };
//
//
// var Text = mongoose.model('text', TextSchema);
// module.exports = Text;
