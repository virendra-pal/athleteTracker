// data/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Athlete = require('../models/Athlete');
const Match = require('../models/Match');
const Performance = require('../models/Performance');
const User = require('../models/User');

connectDB();

const seed = async () => {
  try {
    await Athlete.deleteMany();
    await Match.deleteMany();
    await Performance.deleteMany();
    await User.deleteMany();

    const user = await User.create({ name: 'Coach', email: 'coach@example.com', password: 'pass1234' });
    const a1 = await Athlete.create({ name: 'Rohit Sharma', team: 'A', position: 'Forward' });
    const a2 = await Athlete.create({ name: 'Virender Singh', team: 'A', position: 'Midfielder' });

    const m1 = await Match.create({ date: new Date(), opponent: 'Team B', location: 'Home' });

    await Performance.create({
      athlete: a1._id,
      match: m1._id,
      metrics: { speedMax: 32.1, speedAvg: 22.5, distanceKm: 10.2, goals: 1, assists: 0, rating: 7.8 },
      recordedBy: user._id
    });

    await Performance.create({
      athlete: a2._id,
      match: m1._id,
      metrics: { speedMax: 30.4, speedAvg: 20.2, distanceKm: 9.1, goals: 0, assists: 1, rating: 7.3 },
      recordedBy: user._id
    });

    console.log('Seed done');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();