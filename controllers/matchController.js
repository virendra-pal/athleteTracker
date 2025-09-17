// controllers/matchController.js
const asyncHandler = require('express-async-handler');
const Match = require('../models/Match');

// @desc   Create a new match
// @route  POST /api/matches
// @access Private
exports.createMatch = asyncHandler(async (req, res) => {
  const match = await Match.create(req.body);
  res.status(201).json(match);
});

// @desc   Get all matches
// @route  GET /api/matches
// @access Private
exports.getMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find().sort({ date: -1 });
  res.json(matches);
});

// @desc   Get single match by ID
// @route  GET /api/matches/:id
// @access Private
exports.getMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

// @desc   Update a match
// @route  PUT /api/matches/:id
// @access Private
exports.updateMatch = asyncHandler(async (req, res) => {
  const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

// @desc   Delete a match
// @route  DELETE /api/matches/:id
// @access Private
exports.deleteMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });

  await match.deleteOne();
  res.json({ message: 'Match deleted' });
});
