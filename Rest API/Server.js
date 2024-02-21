require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users'); // Adjust the path as necessary

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// GET: Return all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST: Add a new user to the database
  app.post('/users', async (req, res) => {
    const user = new User({
      id: req.body.id, // Assuming your frontend or client assigns this
      name: req.body.name,
      age: req.body.age,
    });
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT: Edit a user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (user) {
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
  
        const updatedUser = await user.save();
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE: Remove a user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const result = await User.deleteOne({ id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
