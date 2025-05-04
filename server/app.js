const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const PORT = 1000;
require('dotenv').config(); // Load .env variables


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL
}))

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}));


app.get('/', (req, res) => {
    res.send('API is working ✅');
});
// GET /user endpoint to fetch the first user
app.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});


// POST /user endpoint to create a new user
app.post('/user', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
        const newUser = new User({ name, email });
        await newUser.save();  // Save the new user to the database
        res.status(200).json(newUser);  // Respond with the created user
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
