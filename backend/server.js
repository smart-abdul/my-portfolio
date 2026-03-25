const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Replace the string below with process.env.MONGO_URI if using env variables
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('Backend is running!');
});
// 1. Define the Project Model (How data looks in MongoDB)
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    techStack: [String]
});

const Project = mongoose.model('Project', projectSchema);

// 2. The Route to "GET" your projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects); // This sends your data to the browser/Vercel
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});