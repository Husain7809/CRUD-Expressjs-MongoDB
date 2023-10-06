const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,
	{ dbName: 'node' }
).then(() => {
	console.log('db connected');
}).catch((err) => {
	console.log(err);
})