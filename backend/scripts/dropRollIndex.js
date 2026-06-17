const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;
    const usersCol = db.collection('users');
    const indexes = await usersCol.indexes();
    console.log('Current indexes:', indexes.map(i => i.name));
    for (const idx of indexes) {
      const key = idx.key || {};
      if ((key.roll_no || key.rollNo) && idx.unique && !idx.sparse) {
        console.log('Dropping index', idx.name);
        await usersCol.dropIndex(idx.name);
      }
    }
    console.log('Index cleanup complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
