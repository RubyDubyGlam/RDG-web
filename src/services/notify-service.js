var moment = require('moment')
var notify_services = require('./notify-service')
var appointment_controller = require('../controllers/appointment-controller')
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

function pollSettle(app, db, twilio_client){
	setInterval(() => {
		var now = moment()
		var end_of_day = moment().endOf('day')

		if (end_of_day.diff(now, 'minutes') <= 61) {
			settle(app, db)
		}

	}, 3600000)	

	settle(app, db)
}

function settle(app, db, twilio_client){
	var Appointment = db.model('Appointment')

	console.log('poll')

	Appointment.find({status: 5}, function(err, appointments) {

		if (Array.isArray(appointments)) {
			_.forEach(appointments, function(appointment) {
				appointment_controller.initializeController(app, Appointment).settle(appointment._id)
			})
		} else {
			appointment_controller.initializeController(app, Appointment).settle(appointments._id)
		}
	})		
}

module.exports = {
	notifyCritical,
	pollCritical,
	pollSettle,
	settle
}

