var appointmentRoutes = require('./appointment-routes')
var userRoutes = require('./user-routes')

module.exports = {
	registerRoutes: function(app, db, twilio_client) {
		userRoutes.registerRoutes(app, db)
		appointmentRoutes.registerRoutes(app, db, twilio_client)
	}
}