const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = asyncHandler(async (req,res)=>{
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Required fields' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
});

exports.login = asyncHandler(async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({ _id: user._id, name:user.name, email:user.email, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});