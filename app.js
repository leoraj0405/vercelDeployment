const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Define a User model
const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}));

// GET /user endpoint to fetch the first user
app.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.render('list.ejs', {user});
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

app.get('/useradd', (req, res) => {
    res.render('addUser.ejs')
})

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
