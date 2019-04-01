module.exports = {
	userSchema: function(mongoose) {
		var Schema = mongoose.Schema,
	    ObjectId = Schema.ObjectId;

		var User = new Schema({
		    id    : ObjectId,
		    first_name: String,
		    last_name: String,
			email_address: String,
			password: String,
		    facebook_id: String,
		    google_id: String,
		    instagram_id: String,
		    roles: {
		    	type: Object,
		    	default : {
		    		admin: false,
		    		stylist: false,
		    	},
		    },
		    phone_number: String,
		    subscribed: {
		    	type: Boolean,
		    	default: true
		    },
		    profile_picture: String,
		});

		var findOrCreate = require('mongoose-findorcreate')

		User.plugin(findOrCreate)

		var BlogPostModel = mongoose.model('User', User)

	}
}