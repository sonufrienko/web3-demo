import mongoose from 'mongoose';

const TransactionsSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
    lowercase: true,
  },
  to: {
    type: String,
    required: true,
    lowercase: true,
  },
  value: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
  blockNumber: Number,
  gasPrice: String,
  gasUsed: String,
});

export const Transactions = mongoose.model('transactions', TransactionsSchema);
