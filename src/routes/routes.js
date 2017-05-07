var appointmentRoutes = require('./appointment-routes')
var userRoutes = require('./user-routes')

module.exports = {
	registerRoutes: function(app, db) {
		userRoutes.registerRoutes(app, db)
		appointmentRoutes.registerRoutes(app, db)
	}
}