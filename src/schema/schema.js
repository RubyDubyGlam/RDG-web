var appointmentSchema = require('./appointment')
var userSchema = require('./user')

module.exports = {
	initializeModels: function(db) {
		appointmentSchema.appointmentSchema(db)
		userSchema.userSchema(db)
	}
}