import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ChartData from './model/ChartData.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

// Connect to my cluster
mongoose.connect("mongodb+srv://hkyle:WJ4zYtOm9lO43hQ4@cluster0.1dxltnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// POST route
app.post('/api/chart', async (req, res) => {
  try {
    const dataArray = req.body;
    const saved = await ChartData.insertMany(dataArray);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route
app.get('/api/chart', async (req, res) => {
  try {
    const data = await ChartData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Delete data
app.delete('/api/chart', async (req, res) => {
  try {
    await ChartData.deleteMany({});
    res.status(200).send('All data cleared');
  } catch (err) {
    res.status(500).send('Error clearing data');
  }
});

// Find latest value
app.post('/api/chart', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Expected array of chart data' });
  }

  const [firstNonZero] = req.body.filter(d => d.value !== 0);

  if (!firstNonZero) {
    return res.status(400).json({ message: 'No non-zero value found' });
  }

  const { category, value } = firstNonZero;

  const newEntry = new ChartData({ category, value });
  await newEntry.save();

  const latest = await ChartData.findOne({ category }).sort({ _id: -1 });
  res.json(latest);
});



// Past week's data
app.get('/api/chart/week-summary', async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const summary = await ChartData.aggregate([
      { $match: { createdAt: { $gte: oneWeekAgo } } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$value' }
        }
      },
      {
        $project: {
          category: '$_id',
          value: '$total',
          _id: 0
        }
      }
    ]);

    res.json(summary);
  } catch (err) {
    console.error('Error fetching weekly summary:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

