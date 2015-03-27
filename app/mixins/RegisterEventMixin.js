var GlobalState = require('../services/GlobalState');

var RegisterEventMixin = {
  componentWillMount: function() {
    this.eventRegistrations = [];
  },

  onEvent: function(eventName, callback) {
    GlobalState.on(eventName, callback);
    this.eventRegistrations.push({ eventName: eventName, callback: callback });
  },

  componentWillUnmount: function() {
    this.eventRegistrations.forEach(function (registration) {
      GlobalState.removeListener(registration.eventName, registration.callback);
    });
  }
};

module.exports = RegisterEventMixin;
