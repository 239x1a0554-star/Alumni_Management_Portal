const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    rollNo: {
      type: String,
    },

    department: {
      type: String,
    },

    graduationYear: {
      type: Number,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "alumni",
    },
  },
  {
    timestamps: true,
  }
);

// Create a sparse unique index: uniqueness enforced only when rollNo exists (not null/undefined)
userSchema.index({ rollNo: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("User", userSchema);