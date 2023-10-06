const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	try {
		const token = req.header('auth-token');
		if (!token) return res.status(401).send({ statusCode: 401, message: "Access Denied!." });

		const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = verified;

		next();
	} catch (error) {
		res.status(401).json({
			statusCode: 401,
			message: "Access Denied!"
		});
	}
	next();
}