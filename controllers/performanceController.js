const asyncHandler = require('express-async-handler');
const Performance = require('../models/Performance');
const Athlete = require('../models/Athlete');
const Match = require('../models/Match');

exports.addPerformance = asyncHandler(async (req,res)=>{
  const { athlete, match, metrics, notes } = req.body;
  if (!athlete) return res.status(400).json({ message:'athlete required' });
  const a = await Athlete.findById(athlete);
  if(!a) return res.status(400).json({ message:'athlete not found' });
  if (match) {
    const m = await Match.findById(match);
    if(!m) return res.status(400).json({ message:'match not found' });
  }
  const perf = await Performance.create({ athlete, match, metrics, notes, recordedBy: req.user._id });
  res.status(201).json(perf);
});

exports.getPerformancesByAthlete = asyncHandler(async (req,res)=>{
  const { athleteId } = req.params;
  const perfs = await Performance.find({ athlete: athleteId }).populate('match').sort({ createdAt: -1 });
  res.json(perfs);
});

exports.getPerformancesByMatch = asyncHandler(async (req,res)=>{
  const { matchId } = req.params;
  const perfs = await Performance.find({ match: matchId }).populate('athlete').sort({ athlete:1 });
  res.json(perfs);
});
