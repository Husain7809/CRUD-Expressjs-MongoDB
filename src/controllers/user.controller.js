const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('./../models/user');

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const emailExits = await User.findOne({ email });

		if (!emailExits || ! await bcrypt.compare(password, emailExits?.password)) {
			return res.status(400).json({
				statusCode: 400,
				message: "Invalid your login credentials",
			})
		}

		const payload = { id: emailExits._id, email: emailExits.email };
		return res.status(200).json({
			statusCode: 200,
			message: "login successfully",
			access_token: await jwt.sign(payload, process.env.JWT_SECRET_KEY)
		})

	} catch (error) {
		console.log("🚀 ~ file: user.controller.js:8 ~ login ~ error:", error)
	}
}

const createUser = async (req, res) => {
	try {
		const { name, email, password, mobile } = req.body;

		const emailExits = await User.findOne({ email });
		if (emailExits) {
			return res.status(400).json({
				statusCode: 400,
				message: "Email id already used",
			})
		}

		const phoneExits = await User.findOne({ mobile });
		if (phoneExits) {
			return res.status(400).json({
				statusCode: 400,
				message: "Mobile number already used",
			})
		}

		const user = new User();
		user.name = name;
		user.email = email;
		user.password = await hashPassword(password);
		user.mobile = mobile;
		user.profile = req.file.filename;

		const userDetail = await User.create(user);
		delete userDetail.password;

		return res.status(201).json({
			statusCode: 201,
			message: "User created successfully",
			data: userDetail
		})
	} catch (error) {
		throw new Error(error.message)
	}
}

const hashPassword = async (password) => {
	return await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));
}

const me = async (req, res) => {
	try {
		const user_email = req.user.email;
		const { name, email, mobile } = await User.findOne({ email: user_email });

		res.status(200).json({
			statusCode: 200,
			message: "success",
			data: { name, email, mobile }
		})

	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = { login, createUser, me }