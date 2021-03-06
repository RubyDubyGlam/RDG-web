module.exports = {
	appointmentSchema: function(mongoose) {
		var Schema = mongoose.Schema,
	    ObjectId = Schema.ObjectId;

		var Appointment = new Schema({
		    id    : ObjectId,
		    customer_id: {
		    	type: ObjectId,
		    	required: true 
		    },
		    customer_full_name: {
		    	type: String,
		    	required: true
		    },
		    stylist_id: ObjectId,
		    stylist_full_name: {
		    	type: String
		    },
		    address: {
				type: String,
				required: true
			},
		    longitude: {
				type: String,
				required: true
			},
		    latitude: {
				type: String,
				required: true
			},
		    status: {
		    	type: Number,
		    	default : 0
		    },
		    gratuity: {
		    	type: Number,
		    	default : 0
		    },
		    time: {
		    	type: Date,
		    	required: true
		    },
		    phone_number: {
		    	type: String,
		    	required: true
		    },
		    stylist_phone_number: {
		    	type: String,
		    },
		    products: {
		    	type: String,
		    	required: true
		    },
		    payment_token: {
		    	type: String,
		    	required: true
		    },
		    order_id: {
		    	type: String,
		    	required: false
		    },
		    email_address: {
		    	type: String,
		    	required: true
		    },
		});

		var BlogPostModel = mongoose.model('Appointment', Appointment)

	}
}