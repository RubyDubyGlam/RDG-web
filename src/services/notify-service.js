var moment = require('moment')
var notify_services = require('./notify-service')
var _ = require('lodash')

function pollCritical(app, db, twilio_client){
	notifyCritical(app, db, twilio_client)

	setInterval(() => {
		notifyCritical(app, db, twilio_client)
	}, 3600000)	
}

function notifyCritical(app, db, twilio_client){
	var Appointment = db.model('Appointment')

	Appointment.find({status: 0}, function(err, appointments) {
		var now = moment()
		var critical_appointments = 0

		_.forEach(appointments, function(appointment) {
			var appointment_time = moment(appointment.time)
			var time_to_appoinment = moment.duration(appointment_time.diff(now)).asHours()

			if (time_to_appoinment < 4) {
				critical_appointments ++
			}
		})

		if (critical_appointments) {
			twilio_client.messages.create({
			    body: 'You have ' + critical_appointments + ' appointment(s) less than 4 hours away with no assigned stylist',
			    to: process.env.ADMIN_PHONE || '+18059158479', // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
		}
	})		
}

function pollCompleted(app, db, twilio_client){
	notifyCompleted(app, db, twilio_client)

	setInterval(() => {
		notifyCompleted(app, db, twilio_client)
	}, 3600000)	
}

function notifyCompleted(app, db, twilio_client){
	var Appointment = db.model('Appointment')

	Appointment.find({status: { $nin: [5]}}, function(err, appointments) {
		var now = moment()
		var critical_appointments = 0
		var stylists = []

		_.forEach(appointments, function(appointment) {
			var appointment_time = moment(appointment.time)
			var time_to_appoinment = moment.duration(now.diff(appointment_time)).asHours()

			if (time_to_appoinment > 1.5) {
				critical_appointments ++
				stylists.push(appointment.stylist_full_name )
			}
		})

		if (critical_appointments) {
			twilio_client.messages.create({
			    body: 'You have ' + critical_appointments + ' appointment(s) that have starting times over 1.5 hours ago, but have not been marked complete. Please follow up with ' + stylists.join(', ') + ' on their appointments',
			    to: process.env.ADMIN_PHONE || '+18059158479', // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
		}
	})		
}

module.exports = {
	notifyCompleted,
	pollCompleted,
	notifyCritical,
	pollCritical
}

