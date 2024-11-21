import express from 'express';
import { Transactions } from '../models/transactions.mjs';
import { EtherscanService } from '../lib/etherscan.mjs';
import { isAddress } from 'web3-validator';

const router = express.Router();

const validateAddress = (req, res, next) => {
  const address = req.params.address || req.query.address;
  if (!address || !isAddress(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }
  next();
};

router.get('/transactions/:address/sync', validateAddress, async (req, res) => {
  try {
    const { address } = req.params;

    const transactions = await EtherscanService.getLastTransactions(address);
    await Promise.all(
      transactions.map(async (tx) => {
        await Transactions.findOneAndUpdate({ hash: tx.hash }, { ...tx, address }, { upsert: true, new: true });
      })
    );

    res.json({
      message: `Successfully synced ${transactions.length} transactions`,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/transactions', validateAddress, async (req, res) => {
  try {
    const { address, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = { address: address.toLowerCase() };

    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) {
        query.timestamp.$gte = new Date(startDate);
      }
      if (endDate) {
        query.timestamp.$lte = new Date(endDate);
      }
    }

    const transactions = await Transactions.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Transactions.countDocuments(query);

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
