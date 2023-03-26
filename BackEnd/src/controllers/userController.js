const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 8;


exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Validate the input data
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPW = await bcrypt.hash(password, saltRounds);

        // create new user with the provided data and save it to the DB
        const newUser = new User({ username, email, password: hashedPW });
        await newUser.save();

        // return a successful response with user data excl. password
        const responseData = { _id: newUser._id, username: newUser.username, email: newUser.email, createdAt: newUser.createdAt };
        res.status(201).json({user: responseData})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
   }
};

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Validate input data
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        // FInd the user with the provided email within the DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify the provided PW with the stored PW of the user
        const isPWCorrect = await bcrypt.compare(password, user.password);
        if (!isPWCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate and return JWT if the password is correct
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
};

exports.getUserInfo = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}