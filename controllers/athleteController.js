const asyncHandler = require('express-async-handler');
const Athlete = require('../models/Athlete');

exports.createAthlete = asyncHandler(async (req,res)=>{
  const a = await Athlete.create(req.body);
  res.status(201).json(a);
});

exports.getAthletes = asyncHandler(async (req,res)=>{
  const athletes = await Athlete.find().sort({ name: 1 });
  res.json(athletes);
});

exports.getAthlete = asyncHandler(async (req,res)=>{
  const athlete = await Athlete.findById(req.params.id);
  if(!athlete) return res.status(404).json({ message:'Not found' });
  res.json(athlete);
});

exports.updateAthlete = asyncHandler(async (req,res)=>{
  const athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(athlete);
});

exports.deleteAthlete = asyncHandler(async (req,res)=>{
  await Athlete.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});