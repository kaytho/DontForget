var Appointment = require('../models/appointment');
var Text = require('../models/text');

var notificationWorkerFactory =  function(){
  return {
    run: function(){
      Appointment.sendNotifications();
      Text.sendNotifications();
    }
  };
};

module.exports = notificationWorkerFactory();
