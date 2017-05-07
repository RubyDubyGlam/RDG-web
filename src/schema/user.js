module.exports = {
	userSchema: function(mongoose) {
		var Schema = mongoose.Schema,
	    ObjectId = Schema.ObjectId;

		var User = new Schema({
		    id    : ObjectId,
		    first_name: String,
		    last_name: String,
		    email_address: String,
		    facebook_id: String,
		    google_id: String,
		    permissions: {
		    	type: Number,
		    	default : 0
		    }
		});

		var findOrCreate = require('mongoose-findorcreate')

		User.plugin(findOrCreate)

		var BlogPostModel = mongoose.model('User', User)

	}
}