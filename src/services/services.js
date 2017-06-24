var moment = require('moment')
var notify_services = require('./notify-service')
var _ = require('lodash')

module.exports = {
	registerServices: function(app, db, twilio_client) {
		notify_services.pollCritical(app, db, twilio_client)
		notify_services.pollSettle(app, db, twilio_client)
	},
}