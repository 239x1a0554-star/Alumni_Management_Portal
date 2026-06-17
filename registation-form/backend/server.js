require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs');

const connectDB = require("./config/userSchema");
const authRoutes = require("./routes/authRoutes");
const User = require('./models/User');

const app = express();

connectDB();

// allow CORS from frontend dev server
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// mount auth routes at /api/auth
app.use('/api/auth', authRoutes);

app.get('/api/alumni', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    return res.json(users);
  } catch (err) {
    console.error('Error fetching alumni:', err);
    return res.status(500).json({ message: 'Server error fetching alumni' });
  }
});


app.get('/api/alumni/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password');
    if (!user) return res.status(404).json({ message: 'Alumnus not found' });
    return res.json(user);
  } catch (err) {
    console.error('Error fetching alumnus by id:', err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid alumnus id' });
    }
    return res.status(500).json({ message: 'Server error fetching alumnus' });
  }
});


app.put('/api/alumni/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };


    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updated = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      context: 'query',
      select: '-password',
    });

    if (!updated) return res.status(404).json({ message: 'Alumnus not found' });
    return res.json(updated);
  } catch (err) {
    console.error('Error updating alumnus:', err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid alumnus id' });
    }
    return res.status(500).json({ message: 'Server error updating alumnus' });
  }
});

app.delete('/api/alumni/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Alumnus not found' });
    return res.json({ message: 'Alumnus deleted successfully' });
  } catch (err) {
    console.error('Error deleting alumnus:', err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid alumnus id' });
    }
    return res.status(500).json({ message: 'Server error deleting alumnus' });
  }
});

app.get("/", (req, res) => {
  res.send("Alumni Portal Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});