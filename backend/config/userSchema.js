const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

   
    try {
      const db = mongoose.connection.db;
      const collectionNames = await db.listCollections({ name: "users" }).toArray();
      if (collectionNames.length > 0) {
        const usersCol = db.collection("users");
        const indexes = await usersCol.indexes();

        for (const idx of indexes) {
          const key = idx.key || {};
          const hasRollKey = Object.prototype.hasOwnProperty.call(key, "roll_no") || Object.prototype.hasOwnProperty.call(key, "rollNo");
          // idx.name often looks like 'roll_no_1'
          if (hasRollKey && idx.unique && !idx.sparse) {
            console.log(`Dropping non-sparse unique index '${idx.name}' on users collection to avoid duplicate-null errors.`);
            try {
              await usersCol.dropIndex(idx.name);
              console.log(`Dropped index ${idx.name}`);
            } catch (dropErr) {
              console.log(`Failed to drop index ${idx.name}:`, dropErr.message || dropErr);
            }
          }
        }

        // Require User model and create indexes (this will create the sparse unique index defined in the model)
        try {
          // Require model so Mongoose has the schema with the sparse index defined
          require("../models/User");
          // Use model to create indexes
          const User = mongoose.model("User");
          await User.createIndexes();
          console.log("Ensured model indexes (including sparse rollNo index)");
        } catch (idxErr) {
          console.log("Error ensuring model indexes:", idxErr.message || idxErr);
        }
      }
    } catch (indexErr) {
      console.log("Index check/drop failed:", indexErr.message || indexErr);
    }

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;