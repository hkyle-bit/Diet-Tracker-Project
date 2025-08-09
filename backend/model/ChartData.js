import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const chartDataSchema = new mongoose.Schema({
  category: String,
  value: Number
}, { timestamps: true });

export default mongoose.model('ChartData', chartDataSchema);