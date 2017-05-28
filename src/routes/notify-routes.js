function registerRoutes(app, db, twilio_client, cache) {
	app.post('/v1/notify', function(req, res) {
		var from = req.body.From

		cache.get(req.body.From, function (err, number) {
			if (err) {
				return
			}
			
		    var number = number.toString()

			twilio_client.messages.create({
			    body: req.body.Body,
			    to: number,  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
		});

	})
}

module.exports = {
	registerRoutes: registerRoutes
}