const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String,
	mobile: {
		type: Number,
		unique: true
	},
	profile:{
		type:String,
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('User', userSchema);