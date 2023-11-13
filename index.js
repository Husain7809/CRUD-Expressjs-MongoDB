const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./src/config/mongo.config');

// import routes
const usersRoutes = require('./src/routes/user.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/users', usersRoutes);

app.listen(parseInt(process.env.PORT), () => {
	console.log("🚀 ~ file: app listening on port ~ ", parseInt(process.env.PORT))
});