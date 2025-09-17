const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Performance = require('../models/Performance');

exports.athleteKPIs = asyncHandler(async (req,res)=>{
  const athleteId = req.params.athleteId;
  const from = req.query.from ? new Date(req.query.from) : new Date(0);
  const to = req.query.to ? new Date(req.query.to) : new Date();

  const pipeline = [
    { $match: { athlete: new mongoose.Types.ObjectId(athleteId), createdAt: { $gte: from, $lte: to } } },
    { $group: {
        _id: '$athlete',
        avgRating: { $avg: '$metrics.rating' },
        maxSpeed: { $max: '$metrics.speedMax' },
        avgSpeed: { $avg: '$metrics.speedAvg' },
        totalDistance: { $sum: { $ifNull: ['$metrics.distanceKm', 0] } },
        totalGoals: { $sum: { $ifNull: ['$metrics.goals', 0] } },
        matches: { $sum: 1 }
    } }
  ];

  const [resAgg] = await Performance.aggregate(pipeline);
  res.json(resAgg || {
    avgRating: 0, maxSpeed: 0, avgSpeed: 0, totalDistance: 0, totalGoals: 0, matches: 0
  });
});

// trend endpoint: recent N matches' ratings
exports.athleteTrend = asyncHandler(async (req,res)=>{
  const athleteId = req.params.athleteId;
  const limit = parseInt(req.query.limit || '10', 10);

  const pipeline = [
    { $match: { athlete: new mongoose.Types.ObjectId(athleteId) } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    { $project: { rating: '$metrics.rating', date: '$createdAt', match: '$match' } }
  ];

  const docs = await Performance.aggregate(pipeline);
  // reverse to chronological
  res.json(docs.reverse());
});
