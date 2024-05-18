const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming your user model

const register = async (req, res) => {
  try {
    // Define validation rules
    const validationRules = [
      expressValidator.body('fullname').trim().notEmpty().withMessage('fullname is required'),
      expressValidator.body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
      expressValidator.body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ];

    // Validate user input
    const { errors } = expressValidator.validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation error', errors });
    }

    const { fullname, email, password } = req.body;

    // Check for existing user (optional, can be removed if you prefer unique email constraint on the model)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Respond with success message (optional, can be replaced with other relevant information)
    res.status(201).json({ message: 'Registration successful!',
        user: {
            userId: savedUser._id,
            fullname: savedUser.fullname,
            email: savedUser.email

        }
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
